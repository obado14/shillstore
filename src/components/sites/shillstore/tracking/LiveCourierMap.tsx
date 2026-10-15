'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Compass,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface Waypoint {
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  label?: string;
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
}: LiveCourierMapProps) {
  // Mode: 'live-animation' | 'google-maps'
  const [mapMode, setMapMode] = useState<'live-animation' | 'google-maps'>('live-animation');

  // Animation states
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [progress, setProgress] = useState(0.25); // 0 to 1
  const [isCompleted, setIsCompleted] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Road waypoints from Warehouse (Origin) to Customer (Destination)
  const waypoints: Waypoint[] = useMemo(() => [
    { x: 12, y: 78, label: 'Warehouse SHILLSTORE' },
    { x: 26, y: 70, label: 'Simpang Fatmawati' },
    { x: 38, y: 56, label: 'Hub Transit Blok A' },
    { x: 52, y: 52, label: 'Jl. Panglima Polim' },
    { x: 62, y: 40, label: 'Bundaran Blok M' },
    { x: 74, y: 32, label: 'Jl. Kyai Maja' },
    { x: 86, y: 24, label: 'Alamat Penerima' },
  ], []);

  // Compute total path distance
  const pathLengths = useMemo(() => {
    const lengths: number[] = [];
    let total = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      const dx = waypoints[i + 1].x - waypoints[i].x;
      const dy = waypoints[i + 1].y - waypoints[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      lengths.push(dist);
      total += dist;
    }
    return { lengths, total };
  }, [waypoints]);

  // Current position and heading calculation
  const { currentX, currentY, angleDeg } = useMemo(() => {
    const { lengths, total } = pathLengths;
    if (total === 0) return { currentX: waypoints[0].x, currentY: waypoints[0].y, angleDeg: 0 };

    let targetDistance = progress * total;
    let accumulated = 0;

    for (let i = 0; i < lengths.length; i++) {
      const segLength = lengths[i];
      if (accumulated + segLength >= targetDistance || i === lengths.length - 1) {
        const segProgress = segLength === 0 ? 0 : (targetDistance - accumulated) / segLength;
        const clampedSegProgress = Math.max(0, Math.min(1, segProgress));

        const p1 = waypoints[i];
        const p2 = waypoints[i + 1];

        const x = p1.x + (p2.x - p1.x) * clampedSegProgress;
        const y = p1.y + (p2.y - p1.y) * clampedSegProgress;

        const rad = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const deg = (rad * 180) / Math.PI;

        return { currentX: x, currentY: y, angleDeg: deg };
      }
      accumulated += segLength;
    }

    const last = waypoints[waypoints.length - 1];
    return { currentX: last.x, currentY: last.y, angleDeg: 0 };
  }, [progress, pathLengths, waypoints]);

  // Animation Loop
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || isCompleted) return;

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        // Total duration around 24 seconds at 1x
        const increment = (delta / 24000) * speedMultiplier;

        setProgress((prev) => {
          const next = prev + increment;
          if (next >= 1) {
            setIsCompleted(true);
            setIsPlaying(false);
            return 1;
          }
          return next;
        });
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = null;
    };
  }, [isPlaying, speedMultiplier, isCompleted]);

  // Reset animation
  const handleReplay = () => {
    setProgress(0);
    setIsCompleted(false);
    setIsPlaying(true);
  };

  // Google Maps external link
  const fullAddressQuery = `${address}, ${city}, ${province}${postalCode ? ` ${postalCode}` : ''}, Indonesia`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddressQuery)}`;

  // Google Maps Embed Iframe URL
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const embedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(fullAddressQuery)}&zoom=14`
    : `https://www.google.com/maps?q=${encodeURIComponent(fullAddressQuery)}&hl=id&z=14&output=embed`;

  // Dynamic estimated remaining distance and ETA
  const remainingKm = Math.max(0, (1 - progress) * 3.8).toFixed(1);
  const remainingMinutes = Math.max(1, Math.ceil((1 - progress) * 14));

  return (
    <div className="border border-neutral-200 bg-white rounded-[2px] overflow-hidden shadow-2xs">
      {/* 1. HEADER BAR: Mode Switcher & External Link */}
      <div className="p-4 sm:p-5 border-b border-neutral-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAFAF9]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
            <Navigation className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-900">
                Peta Pelacakan Langsung
              </h3>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase tracking-wider rounded-[2px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Courier Move
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
      <div className="relative w-full h-[360px] sm:h-[440px] bg-[#f2f4f3] overflow-hidden select-none">
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
          /* LIVE ANIMATED COURIER VECTOR MAP */
          <div className="relative w-full h-full">
            {/* SVG MAP BACKGROUND: ROADS, LANDMARKS, AND ROUTE PATH */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* City Grid & Blocks Background */}
              <defs>
                <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e7eae8" strokeWidth="0.4" />
                </pattern>
                <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#111111" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>

              {/* Background Grid */}
              <rect width="100" height="100" fill="#f4f6f5" />
              <rect width="100" height="100" fill="url(#gridPattern)" />

              {/* Green Parks / Open Areas */}
              <rect x="5" y="10" width="22" height="18" rx="2" fill="#e2ede5" />
              <rect x="68" y="65" width="26" height="25" rx="3" fill="#e2ede5" />
              <rect x="35" y="8" width="16" height="12" rx="2" fill="#e2ede5" />

              {/* City Road Arteries (Gray Lines) */}
              <path d="M 0 35 Q 50 40 100 30" fill="none" stroke="#ffffff" strokeWidth="3.5" />
              <path d="M 0 35 Q 50 40 100 30" fill="none" stroke="#d5dad7" strokeWidth="0.6" />

              <path d="M 30 0 L 40 100" fill="none" stroke="#ffffff" strokeWidth="3" />
              <path d="M 30 0 L 40 100" fill="none" stroke="#d5dad7" strokeWidth="0.5" />

              <path d="M 70 0 Q 65 50 80 100" fill="none" stroke="#ffffff" strokeWidth="3" />
              <path d="M 70 0 Q 65 50 80 100" fill="none" stroke="#d5dad7" strokeWidth="0.5" />

              <path d="M 0 75 L 100 65" fill="none" stroke="#ffffff" strokeWidth="2.5" />
              <path d="M 0 75 L 100 65" fill="none" stroke="#d5dad7" strokeWidth="0.5" />

              {/* Street Names on Map */}
              <text x="14" y="24" fontSize="2.2" fill="#7a8781" fontWeight="600" letterSpacing="0.05em">
                TAMAN KEBAYORAN
              </text>
              <text x="4" y="33" fontSize="1.8" fill="#8f9c96" fontWeight="500">
                JL. KYAI MAJA
              </text>
              <text x="32" y="46" fontSize="1.8" fill="#8f9c96" fontWeight="500">
                JL. PANGLIMA POLIM
              </text>
              <text x="6" y="73" fontSize="1.8" fill="#8f9c96" fontWeight="500">
                JL. RS FATMAWATI
              </text>
              <text x="70" y="82" fontSize="2.2" fill="#7a8781" fontWeight="600">
                GUDANG SELATAN
              </text>

              {/* ACTIVE DELIVERY ROUTE PATH */}
              {/* 1. Underlying road track */}
              <polyline
                points={waypoints.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 2. Dotted future route */}
              <polyline
                points={waypoints.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeDasharray="1.5,1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 3. Traveled route highlight (black solid) */}
              <polyline
                points={waypoints.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#111111"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1000"
                strokeDashoffset={1000 * (1 - progress)}
              />
            </svg>

            {/* ORIGIN PIN: WAREHOUSE */}
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
              style={{ left: `${waypoints[0].x}%`, top: `${waypoints[0].y}%` }}
            >
              <div className="bg-neutral-900 text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px] shadow-sm mb-1 whitespace-nowrap">
                Gudang SHILLSTORE
              </div>
              <div className="w-7 h-7 rounded-full bg-neutral-900 border-2 border-white text-white flex items-center justify-center shadow-md">
                <Truck className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* DESTINATION PIN: CUSTOMER HOUSE */}
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none"
              style={{
                left: `${waypoints[waypoints.length - 1].x}%`,
                top: `${waypoints[waypoints.length - 1].y}%`,
              }}
            >
              <div className="bg-emerald-600 text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px] shadow-md mb-1 whitespace-nowrap flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>Tujuan: {recipientName}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white text-white flex items-center justify-center shadow-lg">
                <MapPin className="w-4 h-4 fill-white text-white" />
              </div>
            </div>

            {/* LIVE MOVING COURIER MARKER (MOTORCYCLE / VEHICLE) */}
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-linear pointer-events-none"
              style={{
                left: `${currentX}%`,
                top: `${currentY}%`,
              }}
            >
              {/* Radar pulse concentric waves */}
              <div className="absolute -inset-3 rounded-full bg-blue-500/20 animate-ping pointer-events-none" />
              <div className="absolute -inset-1.5 rounded-full bg-blue-500/30 animate-pulse pointer-events-none" />

              {/* Courier Vehicle Marker */}
              <div className="relative flex flex-col items-center">
                {/* Floating Courier Name Bubble */}
                <div className="bg-neutral-900/95 text-white text-[9px] font-bold px-2 py-0.5 rounded-[2px] shadow-lg mb-1 whitespace-nowrap flex items-center gap-1 border border-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ahmad (Kurir)</span>
                </div>

                {/* Motorcycle Circle with Direction Heading Rotation */}
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black border-2 border-white text-white flex items-center justify-center shadow-xl transition-transform duration-150"
                  style={{
                    transform: `rotate(${angleDeg}deg)`,
                  }}
                  title="Posisi Kurir Mitra"
                >
                  <Navigation className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
            </div>

            {/* FLOATING HUD OVERLAY: COURIER DRIVER & TELEMETRY CARD */}
            <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-sm z-30 pointer-events-auto">
              <div className="bg-white/95 backdrop-blur-md border border-neutral-200 p-3.5 sm:p-4 rounded-[2px] shadow-md text-xs">
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
                  <div className="bg-neutral-50 p-2 rounded-[2px]">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Estimasi Tiba
                    </span>
                    <span className="font-bold text-neutral-900 text-xs sm:text-[13px]">
                      {isCompleted ? 'Telah Tiba' : `${remainingMinutes} Menit Lagi`}
                    </span>
                  </div>

                  <div className="bg-neutral-50 p-2 rounded-[2px]">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Jarak dari Lokasi
                    </span>
                    <span className="font-bold text-neutral-900 text-xs sm:text-[13px]">
                      {isCompleted ? '0.0 km' : `${remainingKm} km`}
                    </span>
                  </div>
                </div>

                {/* Progress bar scrub slider */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                    <span>Progress Perjalanan</span>
                    <span className="font-mono font-semibold text-neutral-800">
                      {Math.round(progress * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={progress}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setProgress(val);
                      if (val >= 1) setIsCompleted(true);
                      else setIsCompleted(false);
                    }}
                    className="w-full accent-black cursor-pointer h-1.5 bg-neutral-200 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* FLOATING BOTTOM CONTROLS: Play / Pause / Replay / Speed */}
            <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 border border-neutral-300 rounded-[2px] shadow-sm text-xs">
              {/* Play / Pause Toggle */}
              <button
                type="button"
                onClick={() => {
                  if (isCompleted) {
                    handleReplay();
                  } else {
                    setIsPlaying(!isPlaying);
                  }
                }}
                className="px-2.5 py-1.5 bg-neutral-900 hover:bg-black text-white text-[11px] font-semibold uppercase tracking-wider rounded-[2px] flex items-center gap-1 transition-colors cursor-pointer"
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
                        ? 'bg-neutral-800 text-white'
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
                title="Reset Kurir ke Awal"
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
                <CheckCircle2 className="w-3.5 h-3.5" /> Paket telah tiba di alamat tujuan pengiriman!
              </strong>
            ) : (
              <span>
                <strong className="text-neutral-900 font-semibold">Simulasi Pergerakan Kurir Aktif:</strong> Armada mitra ({courierName}) sedang bergerak dari Warehouse menuju titik alamat penerima di {city}.
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
          <div className="bg-white max-w-sm w-full p-6 rounded-[2px] shadow-xl border border-neutral-200">
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
