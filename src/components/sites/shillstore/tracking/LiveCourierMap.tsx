'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MapPin,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  Navigation,
  Phone,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Compass,
  Package,
  Activity,
  Zap,
} from 'lucide-react';
import type * as LeafletType from 'leaflet';

export interface LiveTelemetryData {
  progress: number; // 0.0 - 1.0
  progressPct: number; // 0 - 100
  stageIndex: number; // 0: Diproses, 1: Dikemas, 2: Dalam Pengiriman, 3: Sedang Diantar, 4: Terkirim
  stageKey: 'processing' | 'packed' | 'in_transit' | 'out_for_delivery' | 'delivered';
  stageTitle: string;
  stageDescription: string;
  phaseId: 'ORDER_CONFIRMED' | 'PACKING' | 'HANDOVER' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  phaseTitle: string;
  phaseBadge: string;
  phaseActionNote: string;
  remainingKm: string;
  remainingMinutes: number;
  isCompleted: boolean;
  courierSpeedKmH: number;
  currentStreetName: string;
  currentCheckpointTitle: string;
  currentCheckpointLocation: string;
  isVehicleMoving: boolean;
}

export interface LiveCourierMapProps {
  orderNumber: string;
  recipientName: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  courierName?: string;
  trackingNumber?: string;
  onProgressUpdate?: (data: LiveTelemetryData) => void;
}

// Real Jakarta Selatan Road Waypoints (OpenStreetMap Geographic Coordinates)
// From: SHILLSTORE Central Warehouse (Jl. TB Simatupang) -> Fatmawati -> Panglima Polim -> Blok M -> Recipient (Kebayoran Baru)
export const JAKARTA_DELIVERY_WAYPOINTS = [
  { lat: -6.2941, lng: 106.8042, street: 'Fulfillment Center SHILLSTORE, Jl. TB Simatupang', speed: 0 },
  { lat: -6.2934, lng: 106.8010, street: 'Gerbang Logistik Jl. TB Simatupang', speed: 24 },
  { lat: -6.2925, lng: 106.7975, street: 'Simpang Susun Fatmawati Raya', speed: 36 },
  { lat: -6.2860, lng: 106.7971, street: 'Jl. RS Fatmawati Raya (Cilandak)', speed: 44 },
  { lat: -6.2785, lng: 106.7970, street: 'Stasiun MRT Cipete Raya', speed: 46 },
  { lat: -6.2690, lng: 106.7968, street: 'Stasiun MRT Haji Nawi', speed: 45 },
  { lat: -6.2580, lng: 106.7975, street: 'Blok A MRT • Jl. Panglima Polim', speed: 40 },
  { lat: -6.2495, lng: 106.7988, street: 'Jl. Panglima Polim Raya (Kebayoran Baru)', speed: 38 },
  { lat: -6.2440, lng: 106.8005, street: 'Kawasan Melawai • Blok M Plaza', speed: 32 },
  { lat: -6.2425, lng: 106.8014, street: 'Masuk Jl. Melati (Kompleks Perumahan)', speed: 20 },
  { lat: -6.2415, lng: 106.8020, street: 'Jl. Melati No. 12 (Rumah Penerima)', speed: 0 },
];

// Helper to compute bearing angle between two lat/lng points
function calculateBearing(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;

  const y = Math.sin(dLng) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLng);

  let bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return (bearing + 360) % 360;
}

// Normalize angle difference to avoid 360-degree wrapping glitch
function getShortestAngleDiff(target: number, current: number): number {
  let diff = (target - current) % 360;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff;
}

// Distance between two points in meters
function getDistanceMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3;
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Process Timeline Definitions (Realistic Pauses & Milestones)
// Total 1x Cycle: 30 seconds
const PHASE_DURATIONS = {
  ORDER_CONFIRMED: 3000, // 3.0s: Pesanan Diproses (verifikasi & persiapan rak gudang)
  PACKING: 3500,         // 3.5s: Sedang Dikemas (QC, bubble wrap, kardus resmi)
  HANDOVER: 2500,        // 2.5s: Jeda: Kurir terima paket & muat ke bagasi motor
  IN_TRANSIT: 12000,     // 12.0s: Aktif melaju di rute jalan raya OpenStreetMap
  OUT_FOR_DELIVERY: 4000,// 4.0s: Memasuki perumahan penerima (< 300m)
  DELIVERED: 5000,       // 5.0s: Paket diterima & perayaan serah terima
};

const TOTAL_CYCLE_MS =
  PHASE_DURATIONS.ORDER_CONFIRMED +
  PHASE_DURATIONS.PACKING +
  PHASE_DURATIONS.HANDOVER +
  PHASE_DURATIONS.IN_TRANSIT +
  PHASE_DURATIONS.OUT_FOR_DELIVERY +
  PHASE_DURATIONS.DELIVERED;

export type FreeTileProviderKey = 'osm' | 'humanitarian' | 'esri';

export const FREE_TILE_PROVIDERS: Record<
  FreeTileProviderKey,
  {
    name: string;
    label: string;
    url: string;
    maxZoom: number;
    subdomains: string[];
    attribution: string;
  }
> = {
  osm: {
    name: 'OpenStreetMap Standar (100% Gratis)',
    label: 'OSM Standar',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 19,
    subdomains: ['a', 'b', 'c'],
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  humanitarian: {
    name: 'OSM Detail Humanitarian (100% Gratis)',
    label: 'OSM Detail',
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    maxZoom: 19,
    subdomains: ['a', 'b'],
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  esri: {
    name: 'Esri World Street Map (100% Gratis)',
    label: 'Esri HD',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 18,
    subdomains: [],
    attribution: 'Tiles &copy; Esri',
  },
};

export function LiveCourierMap({
  orderNumber,
  recipientName,
  address,
  city,
  province,
  postalCode,
  courierName = 'SiCepat Express',
  trackingNumber = 'SCP-10293817',
  onProgressUpdate,
}: LiveCourierMapProps) {
  // Map Container & Leaflet References
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<LeafletType.Map | null>(null);
  const currentTileLayerRef = useRef<LeafletType.TileLayer | null>(null);
  const courierMarkerRef = useRef<LeafletType.Marker | null>(null);
  const plannedPolylineRef = useRef<LeafletType.Polyline | null>(null);
  const traveledPolylineRef = useRef<LeafletType.Polyline | null>(null);

  // Map Modes & Options (Default to 100% Free OpenStreetMap Standar)
  const [tileProvider, setTileProvider] = useState<FreeTileProviderKey>('osm');
  const [autoPan, setAutoPan] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Playback Control States
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  // Live Telemetry State for Header & HUD
  const [telemetry, setTelemetry] = useState<LiveTelemetryData>({
    progress: 0.05,
    progressPct: 5,
    stageIndex: 0,
    stageKey: 'processing',
    stageTitle: 'Pesanan Diproses',
    stageDescription: 'Pesanan diverifikasi & masuk antrean fulfillment center',
    phaseId: 'ORDER_CONFIRMED',
    phaseTitle: 'Pesanan Dikonfirmasi & Diproses',
    phaseBadge: 'Memverifikasi Pembayaran',
    phaseActionNote: 'Staf gudang sedang mengambil produk dari rak persediaan (Fulfillment Center)',
    remainingKm: '4.8',
    remainingMinutes: 14,
    isCompleted: false,
    courierSpeedKmH: 0,
    currentStreetName: 'Gudang SHILLSTORE (TB Simatupang)',
    currentCheckpointTitle: 'Pesanan Dikonfirmasi & Diproses',
    currentCheckpointLocation: 'SHILLSTORE Fulfillment Center, Jakarta Selatan',
    isVehicleMoving: false,
  });

  // Animation Mutable Refs for 60 FPS Fluidity
  const elapsedCycleMsRef = useRef<number>(200); // Start slightly into phase 1
  const speedRef = useRef<number>(1);
  const isPlayingRef = useRef<boolean>(true);
  const lastRafTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const smoothedAngleRef = useRef<number>(0);
  const lastTelemetryUpdateRef = useRef<number>(0);

  // Keep callback ref fresh
  const onProgressUpdateRef = useRef(onProgressUpdate);
  useEffect(() => {
    onProgressUpdateRef.current = onProgressUpdate;
  }, [onProgressUpdate]);

  useEffect(() => {
    speedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Precompute cumulative road distances for accurate waypoint interpolation
  const roadDistancesRef = useRef<{ total: number; segments: number[]; cumulative: number[] }>({
    total: 0,
    segments: [],
    cumulative: [0],
  });

  useEffect(() => {
    let sum = 0;
    const segs: number[] = [];
    const cum: number[] = [0];

    for (let i = 0; i < JAKARTA_DELIVERY_WAYPOINTS.length - 1; i++) {
      const p1 = JAKARTA_DELIVERY_WAYPOINTS[i];
      const p2 = JAKARTA_DELIVERY_WAYPOINTS[i + 1];
      const d = getDistanceMeters(p1.lat, p1.lng, p2.lat, p2.lng);
      segs.push(d);
      sum += d;
      cum.push(sum);
    }

    roadDistancesRef.current = { total: sum, segments: segs, cumulative: cum };
  }, []);

  // Compute position and telemetry given cycle timestamp in ms (0 to TOTAL_CYCLE_MS)
  const computeTelemetryAtTime = useCallback((timeMs: number): {
    telemetry: LiveTelemetryData;
    lat: number;
    lng: number;
    targetBearing: number;
    traveledPoints: [number, number][];
  } => {
    const tClamped = Math.max(0, Math.min(TOTAL_CYCLE_MS, timeMs));
    const { total, cumulative } = roadDistancesRef.current;

    const tPhase1 = PHASE_DURATIONS.ORDER_CONFIRMED;
    const tPhase2 = tPhase1 + PHASE_DURATIONS.PACKING;
    const tPhase3 = tPhase2 + PHASE_DURATIONS.HANDOVER;
    const tPhase4 = tPhase3 + PHASE_DURATIONS.IN_TRANSIT;
    const tPhase5 = tPhase4 + PHASE_DURATIONS.OUT_FOR_DELIVERY;

    let phaseId: LiveTelemetryData['phaseId'] = 'ORDER_CONFIRMED';
    let stageIndex = 0;
    let stageKey: LiveTelemetryData['stageKey'] = 'processing';
    let stageTitle = 'Pesanan Diproses';
    let stageDescription = 'Pesanan diverifikasi & masuk antrean fulfillment center';
    let phaseTitle = 'Pesanan Dikonfirmasi & Diproses';
    let phaseBadge = 'Verifikasi Pembayaran';
    let phaseActionNote = 'Staf gudang sedang memverifikasi nota pesanan & mengambil item dari rak';
    let courierSpeedKmH = 0;
    let isVehicleMoving = false;
    let progressRatio = 0.05;
    let driveFraction = 0; // 0 to 1 along the road
    let isCompleted = false;

    if (tClamped < tPhase1) {
      // 1. ORDER_CONFIRMED (Warehouse Idle)
      phaseId = 'ORDER_CONFIRMED';
      stageIndex = 0;
      stageKey = 'processing';
      stageTitle = 'Pesanan Diproses';
      stageDescription = 'Pesanan diverifikasi & disiapkan staf gudang';
      phaseTitle = 'Pesanan Dikonfirmasi & Diproses';
      phaseBadge = 'Tahap 1: Verifikasi';
      phaseActionNote = 'Sistem memverifikasi bukti pembayaran. Staf gudang menyiapkan paket di rak persediaan.';
      courierSpeedKmH = 0;
      isVehicleMoving = false;
      driveFraction = 0;
      progressRatio = (tClamped / tPhase1) * 0.15;
    } else if (tClamped < tPhase2) {
      // 2. PACKING (Warehouse Packing & QC)
      phaseId = 'PACKING';
      stageIndex = 1;
      stageKey = 'packed';
      stageTitle = 'Dikemas';
      stageDescription = 'Quality check produk & pembungkusan rapi';
      phaseTitle = 'Sedang Dikemas (Quality Check)';
      phaseBadge = 'Tahap 2: Sedang Dikemas';
      phaseActionNote = 'Pemeriksaan jahitan & kualitas, pelapisan bubble wrap tebal, dan penyegelan kotak SHILLSTORE.';
      courierSpeedKmH = 0;
      isVehicleMoving = false;
      driveFraction = 0;
      progressRatio = 0.15 + ((tClamped - tPhase1) / PHASE_DURATIONS.PACKING) * 0.12;
    } else if (tClamped < tPhase3) {
      // 3. HANDOVER (Pause: Courier Pickup & Engine Start)
      phaseId = 'HANDOVER';
      stageIndex = 1;
      stageKey = 'packed';
      stageTitle = 'Dikemas & Siap Berangkat';
      stageDescription = 'Paket diserahterimakan ke kurir armada';
      phaseTitle = 'Penyerahan Paket ke Kurir Ekspedisi';
      phaseBadge = 'Jeda: Muat ke Motor';
      phaseActionNote = `Kurir (${courierName} • Ahmad Fauzi) menempel label resi #${trackingNumber} & memuat paket ke box pengaman motor.`;
      courierSpeedKmH = 0;
      isVehicleMoving = false;
      driveFraction = 0;
      progressRatio = 0.27 + ((tClamped - tPhase2) / PHASE_DURATIONS.HANDOVER) * 0.08;
    } else if (tClamped < tPhase4) {
      // 4. IN_TRANSIT (Driving along OpenStreetMap route from 0% to 80%)
      phaseId = 'IN_TRANSIT';
      stageIndex = 2;
      stageKey = 'in_transit';
      stageTitle = 'Dalam Pengiriman';
      stageDescription = 'Paket melaju di jalur arteri kota Jakarta Selatan';
      phaseTitle = 'Dalam Perjalanan Antar-Hub / Jalan Raya';
      phaseBadge = 'Melaju di Jalan Raya';
      phaseActionNote = 'Kurir bergerak melintasi rute utama Jl. TB Simatupang & Jl. RS Fatmawati Raya.';
      isVehicleMoving = true;
      const tInPhase = tClamped - tPhase3;
      driveFraction = (tInPhase / PHASE_DURATIONS.IN_TRANSIT) * 0.8;
      progressRatio = 0.35 + (tInPhase / PHASE_DURATIONS.IN_TRANSIT) * 0.45;
    } else if (tClamped < tPhase5) {
      // 5. OUT_FOR_DELIVERY (Driving in neighborhood from 80% to 100%)
      phaseId = 'OUT_FOR_DELIVERY';
      stageIndex = 3;
      stageKey = 'out_for_delivery';
      stageTitle = 'Sedang Diantar';
      stageDescription = 'Kurir memasuki kawasan perumahan penerima';
      phaseTitle = 'Sedang Diantar ke Alamat Tujuan';
      phaseBadge = 'Mendekati Rumah Penerima';
      phaseActionNote = 'Kurir memperlambat kecepatan dan mencari nomor rumah tujuan (radius < 300 meter).';
      isVehicleMoving = true;
      const tInPhase = tClamped - tPhase4;
      driveFraction = 0.8 + (tInPhase / PHASE_DURATIONS.OUT_FOR_DELIVERY) * 0.2;
      progressRatio = 0.8 + (tInPhase / PHASE_DURATIONS.OUT_FOR_DELIVERY) * 0.19;
    } else {
      // 6. DELIVERED (Arrived at Destination House)
      phaseId = 'DELIVERED';
      stageIndex = 4;
      stageKey = 'delivered';
      stageTitle = 'Terkirim';
      stageDescription = 'Paket berhasil diterima oleh penerima';
      phaseTitle = 'Paket Berhasil Diterima (Terkirim)';
      phaseBadge = '✓ Paket Telah Sampai';
      phaseActionNote = `Paket telah diterima dengan baik oleh ${recipientName} di alamat tujuan. Pengiriman selesai!`;
      courierSpeedKmH = 0;
      isVehicleMoving = false;
      driveFraction = 1.0;
      progressRatio = 1.0;
      isCompleted = true;
    }

    // Determine exact lat, lng, bearing, and street along waypoints using driveFraction
    let lat = JAKARTA_DELIVERY_WAYPOINTS[0].lat;
    let lng = JAKARTA_DELIVERY_WAYPOINTS[0].lng;
    let targetBearing = 0;
    let currentStreetName = JAKARTA_DELIVERY_WAYPOINTS[0].street;
    const traveledPoints: [number, number][] = [[lat, lng]];

    if (driveFraction > 0 && total > 0) {
      const targetDist = Math.min(total, driveFraction * total);

      let segIdx = 0;
      while (segIdx < cumulative.length - 1 && cumulative[segIdx + 1] < targetDist) {
        traveledPoints.push([JAKARTA_DELIVERY_WAYPOINTS[segIdx + 1].lat, JAKARTA_DELIVERY_WAYPOINTS[segIdx + 1].lng]);
        segIdx++;
      }

      if (segIdx < JAKARTA_DELIVERY_WAYPOINTS.length - 1) {
        const segStartDist = cumulative[segIdx];
        const segLen = roadDistancesRef.current.segments[segIdx];
        const localDist = targetDist - segStartDist;
        const localFrac = segLen > 0 ? localDist / segLen : 0;

        const pA = JAKARTA_DELIVERY_WAYPOINTS[segIdx];
        const pB = JAKARTA_DELIVERY_WAYPOINTS[segIdx + 1];

        lat = pA.lat + (pB.lat - pA.lat) * localFrac;
        lng = pA.lng + (pB.lng - pA.lng) * localFrac;
        targetBearing = calculateBearing(pA.lat, pA.lng, pB.lat, pB.lng);
        currentStreetName = localFrac > 0.5 ? pB.street : pA.street;

        if (isVehicleMoving) {
          courierSpeedKmH = Math.round(pA.speed + (pB.speed - pA.speed) * localFrac);
        }

        traveledPoints.push([lat, lng]);
      } else {
        const last = JAKARTA_DELIVERY_WAYPOINTS[JAKARTA_DELIVERY_WAYPOINTS.length - 1];
        lat = last.lat;
        lng = last.lng;
        currentStreetName = last.street;
        traveledPoints.push([lat, lng]);
      }
    } else {
      const pA = JAKARTA_DELIVERY_WAYPOINTS[0];
      const pB = JAKARTA_DELIVERY_WAYPOINTS[1];
      targetBearing = calculateBearing(pA.lat, pA.lng, pB.lat, pB.lng);
    }

    const remainingFraction = Math.max(0, 1 - driveFraction);
    const remKm = isCompleted ? '0.0' : Math.max(0.1, +(remainingFraction * 4.8).toFixed(1)).toFixed(1);
    const remMins = isCompleted ? 0 : Math.max(1, Math.round(remainingFraction * 14));

    const finalTelemetry: LiveTelemetryData = {
      progress: Math.min(1, Math.max(0, progressRatio)),
      progressPct: Math.round(progressRatio * 100),
      stageIndex,
      stageKey,
      stageTitle,
      stageDescription,
      phaseId,
      phaseTitle,
      phaseBadge,
      phaseActionNote,
      remainingKm: remKm,
      remainingMinutes: remMins,
      isCompleted,
      courierSpeedKmH,
      currentStreetName,
      currentCheckpointTitle: phaseTitle,
      currentCheckpointLocation: currentStreetName,
      isVehicleMoving,
    };

    return {
      telemetry: finalTelemetry,
      lat,
      lng,
      targetBearing,
      traveledPoints,
    };
  }, [recipientName, courierName, trackingNumber]);

  // Initialize Leaflet Map (Client-Side Only via dynamic import)
  useEffect(() => {
    let isCancelled = false;

    async function initLeaflet() {
      if (!mapContainerRef.current) return;
      // Prevent multiple initializations on hot reload
      if ((mapContainerRef.current as any)._leaflet_id) return;

      const L = (await import('leaflet')).default;
      if (isCancelled || !mapContainerRef.current) return;

      // Base Map Centered in South Jakarta
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false, // Prevent interfering with page scroll
      }).setView([-6.2678, 106.8005], 13);

      // 1. Initial Tile Layer: 100% Free OpenStreetMap (No API Key Required)
      const providerConfig = FREE_TILE_PROVIDERS[tileProvider];
      const tileLayer = L.tileLayer(providerConfig.url, {
        maxZoom: providerConfig.maxZoom,
        subdomains: providerConfig.subdomains,
        attribution: providerConfig.attribution,
      }).addTo(map);

      currentTileLayerRef.current = tileLayer;

      // 2. Full Planned Route Polyline (dashed gray)
      const latLngPoints = JAKARTA_DELIVERY_WAYPOINTS.map((w) => [w.lat, w.lng] as [number, number]);
      const plannedLine = L.polyline(latLngPoints, {
        color: '#71717A',
        weight: 5,
        opacity: 0.5,
        dashArray: '8, 8',
        lineCap: 'round',
      }).addTo(map);
      plannedPolylineRef.current = plannedLine;

      // 3. Traveled Route Polyline (high-contrast solid dark/emerald line)
      const traveledLine = L.polyline([[JAKARTA_DELIVERY_WAYPOINTS[0].lat, JAKARTA_DELIVERY_WAYPOINTS[0].lng]], {
        color: '#10B981',
        weight: 6,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);
      traveledPolylineRef.current = traveledLine;

      // 4. Warehouse Origin Pin (Custom HTML divIcon)
      const warehouseIcon = L.divIcon({
        className: 'custom-warehouse-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-9 h-9 rounded-full bg-black border-2 border-white shadow-xl flex items-center justify-center text-white ring-4 ring-neutral-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 8 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
              </svg>
            </div>
            <div class="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
              Gudang SHILLSTORE
            </div>
          </div>
        `,
      });

      L.marker([JAKARTA_DELIVERY_WAYPOINTS[0].lat, JAKARTA_DELIVERY_WAYPOINTS[0].lng], {
        icon: warehouseIcon,
        zIndexOffset: 10,
      }).addTo(map);

      // 5. Recipient Destination Pin (Custom HTML divIcon)
      const lastWp = JAKARTA_DELIVERY_WAYPOINTS[JAKARTA_DELIVERY_WAYPOINTS.length - 1];
      const destinationIcon = L.divIcon({
        className: 'custom-destination-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-9 h-9 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white ring-4 ring-emerald-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
              Tujuan: ${recipientName.split(' ')[0]}
            </div>
          </div>
        `,
      });

      L.marker([lastWp.lat, lastWp.lng], {
        icon: destinationIcon,
        zIndexOffset: 10,
      }).addTo(map);

      // 6. Live Moving Courier Marker (Custom HTML divIcon with heading rotation)
      const courierIcon = L.divIcon({
        className: 'custom-courier-marker',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        html: `
          <div id="courier-vehicle-wrapper" class="relative flex flex-col items-center">
            <!-- Pulsing Concentric Radar Rings -->
            <div class="absolute -inset-2.5 rounded-full bg-emerald-400/35 animate-ping pointer-events-none"></div>
            <div class="absolute -inset-1 rounded-full bg-blue-500/30 animate-pulse pointer-events-none"></div>

            <!-- Floating Courier Label -->
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-950 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-[2px] shadow-xl border border-neutral-700 flex items-center gap-1.5 z-20">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Ahmad (Kurir)</span>
              <span class="text-neutral-400 font-mono text-[8px]">${courierName}</span>
            </div>

            <!-- Motorcycle Icon with Heading Heading Angle -->
            <div id="courier-heading-rotator" class="w-11 h-11 rounded-full bg-neutral-950 border-2 border-white text-white flex items-center justify-center shadow-2xl z-10 transition-transform duration-100 ease-linear">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" class="translate-x-[0.5px]">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
            </div>
          </div>
        `,
      });

      const courierMarker = L.marker([JAKARTA_DELIVERY_WAYPOINTS[0].lat, JAKARTA_DELIVERY_WAYPOINTS[0].lng], {
        icon: courierIcon,
        zIndexOffset: 100,
      }).addTo(map);

      courierMarkerRef.current = courierMarker;

      // Fit map bounds to encompass the entire delivery route nicely with padding
      map.fitBounds(plannedLine.getBounds(), {
        padding: [45, 45],
        maxZoom: 14,
      });

      // Invalidate map size so Leaflet loads tiles for full dimensions immediately
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      setTimeout(() => {
        map.invalidateSize();
      }, 500);

      setMapLoaded(true);
    }

    initLeaflet();

    return () => {
      isCancelled = true;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [recipientName, courierName]);

  // Handle 100% Free Tile Switching without reloading the entire map
  useEffect(() => {
    if (!leafletMapRef.current || !mapLoaded) return;
    const map = leafletMapRef.current;
    const providerConfig = FREE_TILE_PROVIDERS[tileProvider];

    import('leaflet').then((LModule) => {
      const L = LModule.default;
      if (currentTileLayerRef.current) {
        map.removeLayer(currentTileLayerRef.current);
      }
      const newLayer = L.tileLayer(providerConfig.url, {
        maxZoom: providerConfig.maxZoom,
        subdomains: providerConfig.subdomains,
        attribution: providerConfig.attribution,
      }).addTo(map);

      currentTileLayerRef.current = newLayer;
      map.invalidateSize();
    });
  }, [tileProvider, mapLoaded]);

  // Main 60 FPS RequestAnimationFrame Animation Loop
  useEffect(() => {
    const tick = (now: number) => {
      if (lastRafTimeRef.current === null) {
        lastRafTimeRef.current = now;
      }

      const delta = now - lastRafTimeRef.current;
      lastRafTimeRef.current = now;

      if (isPlayingRef.current) {
        // Advance cycle clock by delta * speed
        elapsedCycleMsRef.current += delta * speedRef.current;

        // Auto-loop seamlessly when full cycle is completed
        if (elapsedCycleMsRef.current >= TOTAL_CYCLE_MS) {
          elapsedCycleMsRef.current = 0;
        }

        const result = computeTelemetryAtTime(elapsedCycleMsRef.current);

        // Update Leaflet map marker & traveled polyline directly (no React re-render lag)
        if (courierMarkerRef.current) {
          courierMarkerRef.current.setLatLng([result.lat, result.lng]);

          // Smooth heading interpolation
          const angleDiff = getShortestAngleDiff(result.targetBearing, smoothedAngleRef.current);
          smoothedAngleRef.current += angleDiff * 0.15;

          const rotator = document.getElementById('courier-heading-rotator');
          if (rotator) {
            rotator.style.transform = `rotate(${smoothedAngleRef.current}deg)`;
          }
        }

        if (traveledPolylineRef.current) {
          traveledPolylineRef.current.setLatLngs(result.traveledPoints);
        }

        // Auto-Pan camera if enabled
        if (autoPan && leafletMapRef.current && result.telemetry.isVehicleMoving) {
          leafletMapRef.current.panTo([result.lat, result.lng], { animate: false });
        }

        // Throttle React State updates to ~5 times per second (every 180ms) for snappy UI without lag
        if (now - lastTelemetryUpdateRef.current > 180) {
          lastTelemetryUpdateRef.current = now;
          setTelemetry(result.telemetry);
          onProgressUpdateRef.current?.(result.telemetry);
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      lastRafTimeRef.current = null;
    };
  }, [computeTelemetryAtTime, autoPan]);

  // Handle Manual Scrubber Slider
  const handleScrub = (val: number) => {
    const targetMs = val * TOTAL_CYCLE_MS;
    elapsedCycleMsRef.current = targetMs;

    const result = computeTelemetryAtTime(targetMs);

    if (courierMarkerRef.current) {
      courierMarkerRef.current.setLatLng([result.lat, result.lng]);
    }
    if (traveledPolylineRef.current) {
      traveledPolylineRef.current.setLatLngs(result.traveledPoints);
    }

    setTelemetry(result.telemetry);
    onProgressUpdateRef.current?.(result.telemetry);
  };

  // Play / Pause Toggle
  const togglePlayPause = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    isPlayingRef.current = next;
    lastRafTimeRef.current = null;
  };

  // Replay from Beginning
  const handleReplay = () => {
    elapsedCycleMsRef.current = 0;
    setIsPlaying(true);
    isPlayingRef.current = true;
    lastRafTimeRef.current = null;

    const result = computeTelemetryAtTime(0);
    if (courierMarkerRef.current) {
      courierMarkerRef.current.setLatLng([result.lat, result.lng]);
    }
    if (traveledPolylineRef.current) {
      traveledPolylineRef.current.setLatLngs(result.traveledPoints);
    }
    if (leafletMapRef.current && plannedPolylineRef.current) {
      leafletMapRef.current.fitBounds(plannedPolylineRef.current.getBounds(), { padding: [45, 45] });
    }

    setTelemetry(result.telemetry);
    onProgressUpdateRef.current?.(result.telemetry);
  };

  // Recenter Map to Entire Route
  const handleFitRouteBounds = () => {
    setAutoPan(false);
    if (leafletMapRef.current && plannedPolylineRef.current) {
      leafletMapRef.current.fitBounds(plannedPolylineRef.current.getBounds(), { padding: [45, 45] });
    }
  };

  // Google Maps External URL
  const fullAddressQuery = `${address}, ${city}, ${province}${postalCode ? ` ${postalCode}` : ''}, Indonesia`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddressQuery)}`;

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-[2px] overflow-hidden mb-8 shadow-xs">
      {/* 1. MAP HEADER & REAL-TIME LOGISTICS BANNER */}
      <div className="p-4 sm:p-5 border-b border-neutral-150 bg-[#FAFAF9]/90">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-neutral-900">
                  Simulasi Pengiriman OpenStreetMap
                </h3>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase tracking-wider rounded-[2px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live GPS Akurat 🛵
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 truncate max-w-lg mt-0.5">
                Rute Asli Jakarta Selatan: TB Simatupang → Fatmawati → Panglima Polim → Kebayoran Baru
              </p>
            </div>
          </div>

          {/* Map Layer Mode & External Google Maps Button */}
          <div className="flex items-center gap-2">
            {/* 100% Free Tile Layer Selector */}
            <div className="inline-flex p-0.5 bg-neutral-200 rounded-[2px] text-[10px] font-semibold uppercase tracking-wider">
              {(['osm', 'humanitarian', 'esri'] as FreeTileProviderKey[]).map((key) => {
                const conf = FREE_TILE_PROVIDERS[key];
                const isActive = tileProvider === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTileProvider(key)}
                    className={`px-2.5 py-1 rounded-[2px] transition-colors cursor-pointer ${
                      isActive ? 'bg-black text-white shadow-2xs font-bold' : 'text-neutral-600 hover:text-black'
                    }`}
                    title={conf.name}
                  >
                    {conf.label}
                  </button>
                );
              })}
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-neutral-300 hover:border-black hover:bg-neutral-900 hover:text-white text-neutral-800 rounded-[2px] transition-colors flex items-center justify-center cursor-pointer"
              title="Buka Koordinat di Google Maps"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2. REAL-TIME MILESTONE & JEDA PROCESS BANNER */}
        <div className="bg-white border border-neutral-200 p-3 sm:p-3.5 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-900 truncate">
                  {telemetry.phaseTitle}
                </span>
                <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-700 text-[9px] font-mono font-semibold uppercase tracking-wider rounded">
                  {telemetry.phaseBadge}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-0.5 truncate">
                {telemetry.phaseActionNote}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto text-xs font-mono">
            <div className="flex items-center gap-1.5 text-neutral-600">
              <Activity className="w-3.5 h-3.5 text-neutral-400" />
              <span>{telemetry.isVehicleMoving ? `${telemetry.courierSpeedKmH} km/jam` : 'Standby (0 km/jam)'}</span>
            </div>
            <span className="text-neutral-300">•</span>
            <div className="flex items-center gap-1.5 text-neutral-900 font-bold">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              <span>{telemetry.isCompleted ? 'Tiba di Lokasi' : `${telemetry.remainingMinutes} mnt (${telemetry.remainingKm} km)`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. OPENSTREETMAP DISPLAY CANVAS */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-[#EEF2EF] overflow-hidden select-none">
        {/* Leaflet Mount Container */}
        <div
          ref={mapContainerRef}
          className="w-full h-full min-h-[380px] sm:min-h-[460px] z-0"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Loading Indicator */}
        {!mapLoaded && (
          <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center text-xs text-neutral-500 font-mono">
            Memuat Peta OpenStreetMap Jakarta Selatan...
          </div>
        )}

        {/* FLOATING HUD (Top Left): Telemetri Kurir & Profil Driver */}
        <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-sm z-[400] pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md border border-neutral-200 p-3.5 rounded-[2px] shadow-lg text-xs">
            {/* Driver Profile */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-150">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  AF
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-neutral-900 text-xs">
                      Ahmad Fauzi
                    </span>
                    <span className="text-[10px] text-amber-600 font-semibold">★ 4.9</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono block">
                    {courierName} • Honda Vario 160 (B 4821 SDE)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="p-1.5 border border-neutral-300 hover:border-black rounded-[2px] text-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
                title="Hubungi Kurir"
              >
                <Phone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Current Street & Telemetry Stats */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-700 bg-neutral-50 px-2 py-1 rounded border border-neutral-150 truncate">
                <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate font-medium">{telemetry.currentStreetName}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="bg-neutral-50 p-1.5 rounded-[2px] border border-neutral-150">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                    Kecepatan
                  </span>
                  <span className="font-bold text-neutral-900 text-xs sm:text-[13px] block mt-0.5">
                    {telemetry.courierSpeedKmH} km/jam
                  </span>
                </div>

                <div className="bg-neutral-50 p-1.5 rounded-[2px] border border-neutral-150">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                    Sisa Jarak
                  </span>
                  <span className="font-bold text-neutral-900 text-xs sm:text-[13px] block mt-0.5">
                    {telemetry.isCompleted ? '0.0 km' : `${telemetry.remainingKm} km`}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Progress Scrubbing Slider */}
            <div className="mt-2.5 pt-2 border-t border-neutral-100">
              <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                <span className="flex items-center gap-1 font-medium text-neutral-600">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Progress Pengiriman
                </span>
                <span className="font-mono font-bold text-neutral-900">
                  {telemetry.progressPct}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={telemetry.progress}
                onChange={(e) => handleScrub(parseFloat(e.target.value))}
                className="w-full accent-black cursor-pointer h-1.5 bg-neutral-200 rounded-lg"
                title="Geser timeline perjalanan kurir"
              />
            </div>
          </div>
        </div>

        {/* FLOATING CONTROLS (Bottom Right): Play/Pause, Speed, Camera, Replay */}
        <div className="absolute bottom-3 right-3 z-[400] flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 border border-neutral-300 rounded-[2px] shadow-md text-xs">
          {/* Play / Pause Toggle */}
          <button
            type="button"
            onClick={togglePlayPause}
            className="px-2.5 py-1.5 bg-neutral-950 hover:bg-black text-white text-[11px] font-semibold uppercase tracking-wider rounded-[2px] flex items-center gap-1 transition-colors cursor-pointer"
          >
            {telemetry.isCompleted ? (
              <>
                <RotateCcw className="w-3 h-3" />
                <span>Ulangi</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Lanjut</span>
              </>
            )}
          </button>

          {/* Speed Multiplier Buttons */}
          <div className="flex items-center border border-neutral-200 rounded-[2px] overflow-hidden">
            {[1, 2, 4].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2 py-1 text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                  speedMultiplier === spd
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white hover:bg-neutral-100 text-neutral-600'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Camera View Mode: Auto-Pan vs Fit Route */}
          <button
            type="button"
            onClick={() => {
              if (autoPan) {
                handleFitRouteBounds();
              } else {
                setAutoPan(true);
              }
            }}
            className={`px-2 py-1.5 border text-[10px] uppercase font-semibold rounded-[2px] transition-colors cursor-pointer flex items-center gap-1 ${
              autoPan
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-300'
            }`}
            title={autoPan ? 'Kamera mengikuti kurir (Klik untuk melihat seluruh rute)' : 'Klik agar kamera mengikuti kurir'}
          >
            <Navigation className="w-3 h-3" />
            <span>{autoPan ? 'Ikuti Kurir' : 'Rute Penuh'}</span>
          </button>

          {/* Reset / Replay Button */}
          <button
            type="button"
            onClick={handleReplay}
            className="p-1.5 border border-neutral-300 hover:border-black text-neutral-700 hover:text-black rounded-[2px] transition-colors cursor-pointer"
            title="Reset simulasi ke awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. FOOTER NOTE */}
      <div className="px-4 py-2.5 bg-[#FAFAF9] border-t border-neutral-150 flex flex-wrap items-center justify-between text-[11px] text-neutral-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Rute logistik diverifikasi berdasarkan data OpenStreetMap &amp; GPS telemetri armada.</span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">
          OpenStreetMap Standar (100% Gratis) • Lat: {JAKARTA_DELIVERY_WAYPOINTS[0].lat.toFixed(4)}, Lng: {JAKARTA_DELIVERY_WAYPOINTS[0].lng.toFixed(4)}
        </span>
      </div>

      {/* 5. CONTACT DRIVER MODAL */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-[2px] max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-150">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Hubungi Kurir Pengantar
              </h4>
              <button
                type="button"
                onClick={() => setContactModalOpen(false)}
                className="text-neutral-400 hover:text-black text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                AF
              </div>
              <div>
                <p className="font-bold text-neutral-900 text-sm">Ahmad Fauzi</p>
                <p className="text-xs text-neutral-500 font-mono">0812-9844-3120</p>
                <p className="text-[10px] text-neutral-400">Kurir Mitra {courierName}</p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed mb-5">
              Kurir sedang berkendara mengantarkan paket Anda. Demi keselamatan di jalan, utamakan panggilan singkat atau pesan WhatsApp.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:081298443120"
                className="h-10 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Telepon</span>
              </a>
              <a
                href="https://wa.me/6281298443120"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
