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
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export interface LiveTelemetryData {
  progress: number; // 0.0 - 1.0
  progressPct: number; // 0 - 100
  stageIndex: number; // 0: Diproses, 1: Dikemas, 2: Dalam Pengiriman, 3: Sedang Diantar, 4: Terkirim
  stageKey: 'processing' | 'packed' | 'in_transit' | 'out_for_delivery' | 'delivered';
  stageTitle: string;
  stageDescription: string;
  remainingKm: string;
  remainingMinutes: number;
  isCompleted: boolean;
  courierSpeedKmH: number;
  currentCheckpointTitle: string;
  currentCheckpointLocation: string;
}

export function getTelemetryFromProgress(
  t: number,
  isFinished = false
): LiveTelemetryData {
  const clamped = Math.max(0, Math.min(1, t));
  const remainingPct = 1 - clamped;
  const km = Math.max(0, +(remainingPct * 4.8).toFixed(1));
  const mins = Math.max(0, Math.round(remainingPct * 12));
  const pct = Math.round(clamped * 100);

  let stageIndex = 0;
  let stageKey: LiveTelemetryData['stageKey'] = 'processing';
  let stageTitle = 'Pesanan Diproses';
  let stageDescription = 'Pesanan diverifikasi & disiapkan di fulfillment warehouse';
  let currentCheckpointTitle = 'Pesanan Dikonfirmasi & Diproses';
  let currentCheckpointLocation = 'SHILLSTORE Fulfillment Center, Jakarta Selatan';

  if (isFinished || clamped >= 0.999) {
    stageIndex = 4;
    stageKey = 'delivered';
    stageTitle = 'Terkirim';
    stageDescription = 'Paket telah berhasil diterima oleh penerima di lokasi tujuan';
    currentCheckpointTitle = 'Paket Berhasil Diterima';
    currentCheckpointLocation = 'Alamat Penerima (Tujuan Akhir)';
  } else if (clamped >= 0.70) {
    stageIndex = 3;
    stageKey = 'out_for_delivery';
    stageTitle = 'Sedang Diantar';
    stageDescription = 'Kurir sedang dalam perjalanan menuju alamat pengantaran';
    currentCheckpointTitle = 'Kurir Menuju Alamat Penerima';
    currentCheckpointLocation = 'Jl. Kyai Maja - Mendekati Wilayah Penerima';
  } else if (clamped >= 0.35) {
    stageIndex = 2;
    stageKey = 'in_transit';
    stageTitle = 'Dalam Pengiriman';
    stageDescription = 'Paket sedang transit antarkota menuju hub logistik tujuan';
    currentCheckpointTitle = 'Paket Dalam Transit Menuju Hub Tujuan';
    currentCheckpointLocation = 'Hub Logistik Transit Blok M';
  } else if (clamped >= 0.15) {
    stageIndex = 1;
    stageKey = 'packed';
    stageTitle = 'Dikemas';
    stageDescription = 'Paket telah selesai dibungkus dan diserahkan ke kurir ekspedisi';
    currentCheckpointTitle = 'Paket Telah Dikemas & Diberi Label Resi';
    currentCheckpointLocation = 'Sorting Hub TB Simatupang';
  }

  return {
    progress: clamped,
    progressPct: pct,
    stageIndex,
    stageKey,
    stageTitle,
    stageDescription,
    remainingKm: isFinished || clamped >= 0.999 ? '0.0' : km.toFixed(1),
    remainingMinutes: isFinished || clamped >= 0.999 ? 0 : Math.max(1, mins),
    isCompleted: isFinished || clamped >= 0.999,
    courierSpeedKmH: isFinished || clamped >= 0.999 ? 0 : 38,
    currentCheckpointTitle,
    currentCheckpointLocation,
  };
}

interface LiveCourierMapProps {
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

// Normalize angle difference to avoid 360-degree wrapping glitch
function getShortestAngleDiff(target: number, current: number): number {
  let diff = (target - current) % 360;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff;
}

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
  // Mode: 'live-animation' | 'google-maps'
  const [mapMode, setMapMode] = useState<'live-animation' | 'google-maps'>('live-animation');

  // Animation states
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Throttled telemetry for React state (updates ~4 times per second)
  const [telemetry, setTelemetry] = useState({
    remainingKm: '3.6',
    remainingMinutes: 9,
    progressPct: 15,
  });

  // DOM Refs for direct 60 FPS GPU updates (no React re-render lag)
  const pathRef = useRef<SVGPathElement | null>(null);
  const traveledPathRef = useRef<SVGPathElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);
  const iconRotateRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLInputElement | null>(null);

  // Animation internal mutable variables
  const progressRef = useRef<number>(0.06); // Start near beginning in Stage 0
  const speedRef = useRef<number>(1);
  const isPlayingRef = useRef<boolean>(true);
  const isCompletedRef = useRef<boolean>(false);
  const smoothedAngleRef = useRef<number>(20);
  const lastTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastTelemetryUpdateRef = useRef<number>(0);
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep callback ref updated to prevent unnecessary re-render triggers
  const onProgressUpdateRef = useRef(onProgressUpdate);
  useEffect(() => {
    onProgressUpdateRef.current = onProgressUpdate;
  }, [onProgressUpdate]);

  // Keep refs in sync with states
  useEffect(() => {
    speedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Smooth SVG Path definition (ViewBox: 0 0 1000 560)
  // Continuous cubic Bezier curves without sharp corners:
  // Warehouse (110, 440) -> Simatupang -> Fatmawati -> Blok A -> Panglima Polim -> Blok M -> Kyai Maja -> Alamat Penerima (880, 130)
  const routePathD =
    'M 110,440 C 170,440 215,415 260,390 C 310,360 345,330 380,295 C 420,255 460,245 510,245 C 570,245 625,230 675,200 C 725,170 765,155 805,145 C 840,135 860,132 880,130';

  // Apply position to DOM elements directly for 60 FPS smoothness
  const updateVisualPosition = useCallback((t: number) => {
    const path = pathRef.current;
    if (!path) return;

    try {
      const totalLen = path.getTotalLength();
      if (totalLen <= 0) return;

      const currentDist = Math.max(0, Math.min(1, t)) * totalLen;
      const pt = path.getPointAtLength(currentDist);

      // Tangent for smooth heading angle
      const lookAheadDist = Math.min(totalLen, currentDist + 3);
      const ptAhead = path.getPointAtLength(lookAheadDist);
      const dx = ptAhead.x - pt.x;
      const dy = ptAhead.y - pt.y;

      let targetAngle = 0;
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
      }

      // Smooth angle interpolation (vehicle leaning into turn)
      const angleDiff = getShortestAngleDiff(targetAngle, smoothedAngleRef.current);
      smoothedAngleRef.current += angleDiff * 0.18;

      // Convert viewBox (1000 x 560) to percentage
      const leftPct = (pt.x / 1000) * 100;
      const topPct = (pt.y / 560) * 100;

      // Direct DOM updates (no CSS transition delay to prevent stutter)
      if (markerRef.current) {
        markerRef.current.style.left = `${leftPct}%`;
        markerRef.current.style.top = `${topPct}%`;
      }

      if (iconRotateRef.current) {
        iconRotateRef.current.style.transform = `rotate(${smoothedAngleRef.current}deg)`;
      }

      if (traveledPathRef.current) {
        traveledPathRef.current.style.strokeDashoffset = `${totalLen * (1 - t)}`;
      }

      if (sliderRef.current) {
        sliderRef.current.value = String(t);
      }
    } catch {
      // SVG geometry might not be available before first paint
    }
  }, []);

  // Main 60 FPS Animation Loop
  useEffect(() => {
    // Total duration of route at 1x speed: 14 seconds (lively, realistic, smooth)
    const BASE_DURATION_MS = 14000;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }

      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (isPlayingRef.current && !isCompletedRef.current) {
        const increment = (delta / BASE_DURATION_MS) * speedRef.current;
        let newProgress = progressRef.current + increment;

        if (newProgress >= 1) {
          newProgress = 1;
          isCompletedRef.current = true;
          setIsCompleted(true);
          updateVisualPosition(1);

          const completedData = getTelemetryFromProgress(1, true);
          setTelemetry({
            remainingKm: '0.0',
            remainingMinutes: 0,
            progressPct: 100,
          });
          onProgressUpdateRef.current?.(completedData);

          // Auto-replay after 2.8 seconds pause so the user sees "Terkirim" clearly, then loops smoothly
          if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
          loopTimeoutRef.current = setTimeout(() => {
            progressRef.current = 0;
            isCompletedRef.current = false;
            setIsCompleted(false);
            updateVisualPosition(0);

            const resetData = getTelemetryFromProgress(0, false);
            setTelemetry({
              remainingKm: resetData.remainingKm,
              remainingMinutes: resetData.remainingMinutes,
              progressPct: 0,
            });
            onProgressUpdateRef.current?.(resetData);
          }, 2800);
        } else {
          progressRef.current = newProgress;
          updateVisualPosition(newProgress);
        }

        // Throttled Telemetry Update (every 180ms) for synchronized UI progression
        if (now - lastTelemetryUpdateRef.current > 180) {
          lastTelemetryUpdateRef.current = now;
          const liveData = getTelemetryFromProgress(newProgress, false);

          setTelemetry({
            remainingKm: liveData.remainingKm,
            remainingMinutes: liveData.remainingMinutes,
            progressPct: liveData.progressPct,
          });

          onProgressUpdateRef.current?.(liveData);
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    // Auto-start immediately on mount without needing any user click!
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      lastTimeRef.current = null;
    };
  }, [updateVisualPosition]);

  // Initial draw once SVG path is rendered and broadcast initial stage
  useEffect(() => {
    const timer = setTimeout(() => {
      updateVisualPosition(progressRef.current);
      const initialData = getTelemetryFromProgress(progressRef.current, false);
      setTelemetry({
        remainingKm: initialData.remainingKm,
        remainingMinutes: initialData.remainingMinutes,
        progressPct: initialData.progressPct,
      });
      onProgressUpdateRef.current?.(initialData);
    }, 60);
    return () => clearTimeout(timer);
  }, [updateVisualPosition]);

  // Controls: Play / Pause toggle
  const togglePlayPause = () => {
    if (isCompletedRef.current) {
      handleReplay();
      return;
    }
    const next = !isPlaying;
    setIsPlaying(next);
    isPlayingRef.current = next;
    lastTimeRef.current = null; // Prevent delta leap
  };

  // Controls: Replay from beginning
  const handleReplay = () => {
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    progressRef.current = 0;
    isCompletedRef.current = false;
    setIsCompleted(false);
    setIsPlaying(true);
    isPlayingRef.current = true;
    lastTimeRef.current = null;
    updateVisualPosition(0);

    const resetData = getTelemetryFromProgress(0, false);
    setTelemetry({
      remainingKm: resetData.remainingKm,
      remainingMinutes: resetData.remainingMinutes,
      progressPct: 0,
    });
    onProgressUpdateRef.current?.(resetData);
  };

  // Controls: Scrub slider manually
  const handleScrub = (val: number) => {
    progressRef.current = val;
    const done = val >= 1;
    isCompletedRef.current = done;
    setIsCompleted(done);
    updateVisualPosition(val);

    const scrubData = getTelemetryFromProgress(val, done);
    setTelemetry({
      remainingKm: scrubData.remainingKm,
      remainingMinutes: scrubData.remainingMinutes,
      progressPct: scrubData.progressPct,
    });
    onProgressUpdateRef.current?.(scrubData);
  };

  // Google Maps external link
  const fullAddressQuery = `${address}, ${city}, ${province}${postalCode ? ` ${postalCode}` : ''}, Indonesia`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddressQuery)}`;

  // Google Maps Embed URL
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const embedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(fullAddressQuery)}`
    : `https://maps.google.com/maps?q=${encodeURIComponent(fullAddressQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-[2px] overflow-hidden mb-8 shadow-xs">
      {/* 1. HEADER SECTION: TITLE, BADGE & TAB TOGGLE */}
      <div className="p-4 sm:p-5 border-b border-neutral-150 flex flex-wrap items-center justify-between gap-3 bg-[#FAFAF9]/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-neutral-900">
                Peta Pelacakan Pengiriman
              </h3>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase tracking-wider rounded-[2px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Otomatis 🛵
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 truncate max-w-md mt-0.5">
              Tujuan: {address}, {city} • Penerima: {recipientName}
            </p>
          </div>
        </div>

        {/* Tab Mode & Google Maps External Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex p-0.5 bg-neutral-200 rounded-[2px] text-[10px] font-semibold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setMapMode('live-animation')}
              className={`px-3 py-1.5 rounded-[2px] transition-colors cursor-pointer ${
                mapMode === 'live-animation'
                  ? 'bg-black text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Peta Bergerak 🛵
            </button>
            <button
              type="button"
              onClick={() => setMapMode('google-maps')}
              className={`px-3 py-1.5 rounded-[2px] transition-colors cursor-pointer ${
                mapMode === 'google-maps'
                  ? 'bg-black text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Google Maps
            </button>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-neutral-300 hover:border-black hover:bg-neutral-900 hover:text-white text-neutral-800 rounded-[2px] transition-colors flex items-center justify-center"
            title="Buka Langsung di Google Maps"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 2. MAP DISPLAY CANVAS */}
      <div className="relative w-full h-[380px] sm:h-[460px] bg-[#EEF2EF] overflow-hidden select-none">
        {mapMode === 'google-maps' ? (
          /* GOOGLE MAPS EMBED IFRAME */
          <iframe
            title={`Google Maps Lokasi Pengiriman #${orderNumber}`}
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        ) : (
          /* LIVE ANIMATED VECTOR MAP */
          <div className="relative w-full h-full">
            {/* SVG MAP: ROADS, LANDMARKS, AND ROUTE PATH (ViewBox: 0 0 1000 560) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 560"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Subtle City Grid Texture */}
                <pattern id="subtleGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E7E4" strokeWidth="0.8" />
                </pattern>
                {/* Road Glow Filter */}
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Base */}
              <rect width="1000" height="560" fill="#F0F4F1" />
              <rect width="1000" height="560" fill="url(#subtleGrid)" opacity="0.65" />

              {/* Green Parks / Open Areas */}
              <rect x="40" y="50" width="180" height="120" rx="12" fill="#D7E8DC" opacity="0.8" />
              <rect x="680" y="320" width="260" height="170" rx="16" fill="#D7E8DC" opacity="0.8" />
              <rect x="360" y="40" width="160" height="90" rx="10" fill="#D7E8DC" opacity="0.75" />

              {/* Water Canal / River Accent */}
              <path
                d="M 0,220 Q 250,260 500,200 T 1000,240"
                fill="none"
                stroke="#CDE0E7"
                strokeWidth="14"
                opacity="0.6"
              />

              {/* Main City Arterial Roads (Soft White with Outline) */}
              <g strokeLinecap="round" strokeLinejoin="round">
                {/* Horizontal Artery 1 */}
                <path d="M 0,160 Q 500,190 1000,140" fill="none" stroke="#FFFFFF" strokeWidth="22" />
                <path d="M 0,160 Q 500,190 1000,140" fill="none" stroke="#CCD5D0" strokeWidth="1.2" />

                {/* Horizontal Artery 2 (Simatupang) */}
                <path d="M 0,440 L 1000,440" fill="none" stroke="#FFFFFF" strokeWidth="24" />
                <path d="M 0,440 L 1000,440" fill="none" stroke="#CCD5D0" strokeWidth="1.2" />

                {/* Diagonal Arteries */}
                <path d="M 180,560 L 320,0" fill="none" stroke="#FFFFFF" strokeWidth="18" />
                <path d="M 180,560 L 320,0" fill="none" stroke="#CCD5D0" strokeWidth="1" />

                <path d="M 520,560 L 640,0" fill="none" stroke="#FFFFFF" strokeWidth="18" />
                <path d="M 520,560 L 640,0" fill="none" stroke="#CCD5D0" strokeWidth="1" />

                <path d="M 760,560 L 920,0" fill="none" stroke="#FFFFFF" strokeWidth="18" />
                <path d="M 760,560 L 920,0" fill="none" stroke="#CCD5D0" strokeWidth="1" />

                {/* Secondary Cross Streets */}
                <path d="M 260,390 L 500,245" fill="none" stroke="#FFFFFF" strokeWidth="14" />
                <path d="M 380,295 L 680,440" fill="none" stroke="#FFFFFF" strokeWidth="12" />
                <path d="M 500,245 L 800,140" fill="none" stroke="#FFFFFF" strokeWidth="14" />
              </g>

              {/* Street Names */}
              <g fill="#7E8E85" fontSize="13" fontWeight="600" letterSpacing="0.08em">
                <text x="60" y="110" fill="#5F7568" fontSize="14">
                  TAMAN AYODHYA
                </text>
                <text x="730" y="410" fill="#5F7568" fontSize="14">
                  TAMAN KEBAYORAN
                </text>
                <text x="40" y="430">
                  JL. TB SIMATUPANG
                </text>
                <text x="210" y="370">
                  JL. RS FATMAWATI
                </text>
                <text x="400" y="275">
                  JL. PANGLIMA POLIM
                </text>
                <text x="630" y="180">
                  BUNDARAN BLOK M
                </text>
                <text x="760" y="125">
                  JL. KYAI MAJA
                </text>
              </g>

              {/* ACTIVE DELIVERY ROUTE PATH */}
              {/* 1. Route Road Base (Wide White) */}
              <path
                d={routePathD}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
              />

              {/* 2. Dotted Planned Route (Slate Dash) */}
              <path
                ref={pathRef}
                d={routePathD}
                fill="none"
                stroke="#94A3B8"
                strokeWidth="5"
                strokeDasharray="9 9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 3. Traveled Route Dynamic Highlight (Pure Black Solid) */}
              <path
                ref={traveledPathRef}
                d={routePathD}
                fill="none"
                stroke="#111111"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1400"
                strokeDashoffset="1400"
              />
            </svg>

            {/* ORIGIN PIN: WAREHOUSE SHILLSTORE */}
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
              style={{ left: '11%', top: '78.5%' }}
            >
              <div className="bg-neutral-900 text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px] shadow-sm mb-1 whitespace-nowrap">
                Gudang SHILLSTORE
              </div>
              <div className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-white text-white flex items-center justify-center shadow-lg">
                <Truck className="w-4 h-4" />
              </div>
            </div>

            {/* DESTINATION PIN: CUSTOMER HOUSE */}
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none"
              style={{ left: '88%', top: '23.2%' }}
            >
              <div className="bg-emerald-600 text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-[2px] shadow-md mb-1 whitespace-nowrap flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>Tujuan: {recipientName}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white text-white flex items-center justify-center shadow-xl ring-4 ring-emerald-200">
                <MapPin className="w-4 h-4 fill-white text-white" />
              </div>
            </div>

            {/* LIVE MOVING COURIER MARKER (MOTORCYCLE SCOOTER) */}
            {/* Note: NO CSS transition delays here to maintain true 60 FPS GPU fluidity */}
            <div
              ref={markerRef}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-[left,top]"
              style={{ left: '15%', top: '75%' }}
            >
              {/* Radar pulse concentric waves */}
              <div className="absolute -inset-3.5 rounded-full bg-blue-500/25 animate-ping pointer-events-none" />
              <div className="absolute -inset-2 rounded-full bg-emerald-500/35 animate-pulse pointer-events-none" />

              {/* Courier Vehicle Marker */}
              <div className="relative flex flex-col items-center">
                {/* Floating Courier Name Bubble */}
                <div className="bg-neutral-950 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-[2px] shadow-xl mb-1.5 whitespace-nowrap flex items-center gap-1.5 border border-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ahmad (Kurir)</span>
                  <span className="text-neutral-400 font-mono text-[8px]">{courierName}</span>
                </div>

                {/* Motorcycle Circle with Direction Heading Rotation */}
                <div
                  ref={iconRotateRef}
                  className="w-10 h-10 rounded-full bg-neutral-950 border-2 border-white text-white flex items-center justify-center shadow-2xl will-change-transform"
                  title="Posisi Kurir Mitra"
                >
                  {/* High-contrast forward navigation arrow / bike direction */}
                  <Navigation className="w-5 h-5 text-white fill-white translate-x-[1px]" />
                </div>
              </div>
            </div>

            {/* FLOATING HUD OVERLAY: COURIER DRIVER & TELEMETRY CARD */}
            <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-sm z-30 pointer-events-auto">
              <div className="bg-white/95 backdrop-blur-md border border-neutral-200 p-3.5 sm:p-4 rounded-[2px] shadow-lg text-xs">
                {/* Courier Profile */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-150">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      AF
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-neutral-900 text-[13px]">
                          Ahmad Fauzi
                        </span>
                        <span className="text-[10px] text-amber-600 font-semibold">★ 4.9</span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono block">
                        Honda Vario 160 • B 4821 SDE
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setContactModalOpen(true)}
                    className="p-2 border border-neutral-300 hover:border-black rounded-[2px] text-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
                    title="Hubungi Kurir"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Realtime Telemetry Stats */}
                <div className="grid grid-cols-2 gap-2 text-center py-1">
                  <div className="bg-neutral-50 p-2 rounded-[2px] border border-neutral-150">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Estimasi Tiba
                    </span>
                    <span className="font-bold text-neutral-900 text-xs sm:text-[13px] flex items-center justify-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {isCompleted ? 'Telah Sampai' : `${telemetry.remainingMinutes} Menit Lagi`}
                    </span>
                  </div>

                  <div className="bg-neutral-50 p-2 rounded-[2px] border border-neutral-150">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Sisa Jarak
                    </span>
                    <span className="font-bold text-neutral-900 text-xs sm:text-[13px] block mt-0.5">
                      {isCompleted ? '0.0 km' : `${telemetry.remainingKm} km`}
                    </span>
                  </div>
                </div>

                {/* Interactive Progress Scrubbing Slider */}
                <div className="mt-2.5 pt-2 border-t border-neutral-100">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                    <span className="flex items-center gap-1 font-medium text-neutral-600">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Status Perjalanan
                    </span>
                    <span className="font-mono font-bold text-neutral-900">
                      {isCompleted ? '100%' : `${telemetry.progressPct}%`}
                    </span>
                  </div>
                  <input
                    ref={sliderRef}
                    type="range"
                    min="0"
                    max="1"
                    step="0.001"
                    defaultValue="0.15"
                    onChange={(e) => handleScrub(parseFloat(e.target.value))}
                    className="w-full accent-black cursor-pointer h-1.5 bg-neutral-200 rounded-lg"
                    title="Geser posisi rute kurir"
                  />
                </div>
              </div>
            </div>

            {/* FLOATING BOTTOM CONTROLS: Play / Pause / Replay / Speed Multiplier */}
            <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 border border-neutral-300 rounded-[2px] shadow-md text-xs">
              {/* Play / Pause Toggle */}
              <button
                type="button"
                onClick={togglePlayPause}
                className="px-2.5 py-1.5 bg-neutral-950 hover:bg-black text-white text-[11px] font-semibold uppercase tracking-wider rounded-[2px] flex items-center gap-1 transition-colors cursor-pointer"
              >
                {isCompleted ? (
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

              {/* Speed Buttons */}
              <div className="flex items-center border border-neutral-200 rounded-[2px] overflow-hidden">
                {[1, 2, 4].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setSpeedMultiplier(spd)}
                    className={`px-2 py-1 text-[10px] font-mono font-semibold cursor-pointer transition-colors ${
                      speedMultiplier === spd
                        ? 'bg-neutral-900 text-white'
                        : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Reset Replay */}
              <button
                type="button"
                onClick={handleReplay}
                className="p-1.5 hover:bg-neutral-100 text-neutral-700 rounded-[2px] cursor-pointer"
                title="Reset Kurir ke Titik Awal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. TRANSPARENCY NOTICE & COURIER STATUS */}
      <div className="p-3.5 sm:p-4 bg-[#FAFAF9] border-t border-neutral-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-neutral-600">
        <div className="flex items-start sm:items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            {isCompleted ? (
              <strong className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Paket telah tiba di alamat penerima! Memulai kembali simulasi...
              </strong>
            ) : (
              <span>
                <strong className="text-neutral-900 font-semibold">Simulasi Pergerakan Kurir Aktif:</strong> Kurir mitra ({courierName}) otomatis bergerak di sepanjang rute pengantaran menuju {city}.
              </span>
            )}
          </p>
        </div>

        <span className="text-neutral-400 font-mono text-[10px] shrink-0">
          Resi: {trackingNumber}
        </span>
      </div>

      {/* MODAL: HUBUNGI KURIR */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white max-w-sm w-full p-6 rounded-[2px] shadow-xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-1">
              Hubungi Kurir Pengantar
            </h4>
            <p className="text-xs text-neutral-500 mb-4">
              Kurir mitra ditugaskan untuk mengantar paket pesanan Anda.
            </p>

            <div className="p-3 bg-neutral-50 rounded-[2px] border border-neutral-200 mb-5 text-xs space-y-1">
              <p className="font-bold text-neutral-900">Ahmad Fauzi</p>
              <p className="text-neutral-500 font-mono">0812-9844-1234</p>
              <p className="text-neutral-400 text-[11px]">Honda Vario 160 • B 4821 SDE</p>
            </div>

            <div className="space-y-2">
              <a
                href={`https://wa.me/6281298441234?text=Halo%20Mas%20Ahmad,%20saya%20penerima%20paket%20SHILLSTORE%20%23${orderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Kirim Pesan WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setContactModalOpen(false)}
                className="w-full py-2.5 border border-neutral-300 hover:border-black text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
