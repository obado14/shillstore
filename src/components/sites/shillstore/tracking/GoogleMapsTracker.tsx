'use client';

import React, { useState } from 'react';
import { MapPin, ExternalLink, Navigation, ShieldCheck } from 'lucide-react';
import { Coordinates } from '@/types/order';

interface GoogleMapsTrackerProps {
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  recipientName: string;
  coordinates?: Coordinates;
  courierCoordinates?: Coordinates | null;
  isLiveTracking?: boolean;
  courierName?: string;
  orderNumber?: string;
}

export function GoogleMapsTracker({
  address,
  city,
  province,
  postalCode,
  recipientName,
  coordinates,
  courierCoordinates,
  isLiveTracking = false,
  courierName,
  orderNumber,
}: GoogleMapsTrackerProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Construct query string for Google Maps
  const fullAddressQuery = `${address}, ${city}, ${province}${postalCode ? ` ${postalCode}` : ''}, Indonesia`;
  const locationQuery = coordinates
    ? `${coordinates.lat},${coordinates.lng}`
    : fullAddressQuery;

  // Google Maps external link
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    coordinates ? `${coordinates.lat},${coordinates.lng}` : fullAddressQuery
  )}`;

  // Optional custom Google Maps API Key from environment variable
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Embed URL: Use Google Embed API if key available, or standard Google Maps Place query embed
  const embedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
        coordinates ? `${coordinates.lat},${coordinates.lng}` : fullAddressQuery
      )}&zoom=14`
    : `https://www.google.com/maps?q=${encodeURIComponent(
        coordinates ? `${coordinates.lat},${coordinates.lng}` : fullAddressQuery
      )}&hl=id&z=14&output=embed`;

  return (
    <div className="border border-neutral-200 bg-white rounded-[2px] overflow-hidden shadow-2xs">
      {/* MAP HEADER */}
      <div className="p-4 sm:p-5 border-b border-neutral-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAFAF9]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-900">
                Peta Lokasi Pengiriman
              </h3>
              <span className="px-2 py-0.5 bg-neutral-200 text-neutral-800 text-[9px] font-semibold uppercase tracking-wider rounded-[2px]">
                {isLiveTracking && courierCoordinates ? 'Lokasi Kurir Aktif' : 'Titik Tujuan'}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 truncate max-w-md mt-0.5">
              {city}, {province} • Penerima: {recipientName}
            </p>
          </div>
        </div>

        {/* BUTTON: LIHAT DI GOOGLE MAPS */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 border border-neutral-300 hover:border-black text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors rounded-[2px] shrink-0"
        >
          <span>Lihat di Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* INTERACTIVE MAP CONTAINER */}
      <div className="relative w-full h-[280px] sm:h-[340px] bg-neutral-100">
        {!isMapLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 text-neutral-400 gap-2 z-0">
            <Navigation className="w-6 h-6 animate-spin text-neutral-400" />
            <span className="text-[11px] uppercase tracking-widest font-mono">
              Memuat Google Maps...
            </span>
          </div>
        )}

        <iframe
          title={`Google Maps Lokasi Pengiriman #${orderNumber || ''}`}
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsMapLoaded(true)}
          className={`relative z-10 w-full h-full transition-opacity duration-500 ${
            isMapLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Floating badge for destination address */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm z-20 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-xs p-3 border border-neutral-200 rounded-[2px] shadow-sm text-xs pointer-events-auto">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                  Alamat Tujuan Pengiriman
                </span>
                <p className="font-medium text-neutral-900 text-[11px] leading-snug line-clamp-2 mt-0.5">
                  {address}
                </p>
                <span className="text-[10px] text-neutral-500 block mt-0.5">
                  {city}, {province} {postalCode ? `(${postalCode})` : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSPARENT ACCURACY NOTICE (No fake courier telemetry) */}
      <div className="p-3.5 sm:p-4 bg-[#FAFAF9] border-t border-neutral-150 flex items-start gap-2.5 text-[11px] text-neutral-600 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
        <p>
          <strong className="text-neutral-900 font-medium">Transparansi Lokasi:</strong> Peta di atas menampilkan titik lokasi alamat tujuan pengiriman pesanan Anda ({city}). Posisi kurir real-time (GPS langsung) hanya akan aktif apabila data telemetri kurir disediakan langsung oleh sistem API resmi dari pihak ekspedisi mitra ({courierName || 'Ekspedisi'}).
        </p>
      </div>
    </div>
  );
}
