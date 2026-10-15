import { NextRequest, NextResponse } from 'next/server';
import { defaultMockOrders } from '@/lib/orderStorage';
import { ShillOrder, TrackingStepStatus } from '@/types/order';

interface BinderbyteHistoryItem {
  date: string;
  desc: string;
  location: string;
}

interface BinderbyteTrackResponse {
  status: number;
  message: string;
  data?: {
    summary: {
      courier: string;
      waybill_number: string;
      service: string;
      status: string;
      date: string;
      desc: string;
      amount: string;
      weight: string;
    };
    detail: {
      origin: string;
      destination: string;
      shipper: string;
      receiver: string;
    };
    history: BinderbyteHistoryItem[];
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || searchParams.get('waybill') || searchParams.get('orderId');
  const courier = searchParams.get('courier') || 'sicepat';

  if (!query) {
    return NextResponse.json(
      {
        success: false,
        message: 'Nomor pesanan atau nomor resi wajib diisi.',
      },
      { status: 400 }
    );
  }

  const cleanQuery = query.replace(/^#/, '').trim().toUpperCase();

  // 1. Check for official Courier API configuration (e.g. Binderbyte / Biteship)
  const binderbyteKey = process.env.BINDERBYTE_API_KEY;
  const biteshipKey = process.env.BITESHIP_API_KEY;

  if (binderbyteKey) {
    try {
      const apiCourier = courier.toLowerCase();
      const apiUrl = `https://api.binderbyte.com/v1/track?api_key=${binderbyteKey}&courier=${apiCourier}&awb=${encodeURIComponent(
        cleanQuery
      )}`;

      const response = await fetch(apiUrl, {
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 300 }, // cache for 5 minutes
      });

      if (response.ok) {
        const result: BinderbyteTrackResponse = await response.json();

        if (result.status === 200 && result.data) {
          const rawStatus = (result.data.summary.status || '').toUpperCase();
          let currentStep: TrackingStepStatus = 'in_transit';

          if (rawStatus.includes('DELIVERED') || rawStatus.includes('TERKIRIM') || rawStatus.includes('SUKSES')) {
            currentStep = 'delivered';
          } else if (rawStatus.includes('OUT FOR DELIVERY') || rawStatus.includes('MENGANTAR')) {
            currentStep = 'out_for_delivery';
          } else if (rawStatus.includes('PACK') || rawStatus.includes('PICKUP')) {
            currentStep = 'packed';
          }

          const liveOrderData: Partial<ShillOrder> = {
            orderNumber: `ORDER-${cleanQuery.slice(0, 8)}`,
            courierName: result.data.summary.courier.toUpperCase(),
            trackingNumber: result.data.summary.waybill_number,
            currentStep,
            isLiveTracking: true,
            trackingDataSource: `API Resmi Binderbyte (${result.data.summary.courier.toUpperCase()})`,
            history: result.data.history.map((h, i) => {
              let step: TrackingStepStatus = 'in_transit';
              if (i === 0 && currentStep === 'delivered') step = 'delivered';
              else if (i === 0 && currentStep === 'out_for_delivery') step = 'out_for_delivery';
              else if (i === result.data!.history.length - 1) step = 'processing';

              return {
                step,
                title: h.desc.split('-')[0]?.trim() || 'Pembaruan Logistik',
                description: h.desc,
                location: h.location || result.data!.detail.destination || 'Hub Ekspedisi',
                timestamp: h.date,
              };
            }),
          };

          return NextResponse.json({
            success: true,
            isLive: true,
            dataSource: 'API Resmi Kurir (Live Telemetri)',
            data: liveOrderData,
          });
        }
      }
    } catch (err) {
      console.warn('Gagal memanggil API kurir eksternal, beralih ke data lokal:', err);
    }
  }

  // 2. Fallback to Local / Demo Orders Database (Zero Fake Claims)
  const foundOrder = defaultMockOrders.find(
    (o) =>
      o.orderNumber.toUpperCase() === cleanQuery ||
      o.orderNumber.toUpperCase().includes(cleanQuery) ||
      o.trackingNumber.toUpperCase() === cleanQuery ||
      o.trackingNumber.toUpperCase().includes(cleanQuery)
  );

  if (foundOrder) {
    return NextResponse.json({
      success: true,
      isLive: false,
      dataSource: 'Database Logistik SHILLSTORE (Demo Mode)',
      note: 'Status disajikan berdasarkan pencatatan lokal. Sambungkan BINDERBYTE_API_KEY atau BITESHIP_API_KEY pada .env.local untuk pelacakan resi kurir real-time.',
      data: foundOrder,
    });
  }

  // 3. Not found anywhere
  return NextResponse.json(
    {
      success: false,
      isLive: false,
      message: `Nomor pesanan atau resi "${cleanQuery}" tidak ditemukan di sistem logistik. Pastikan format nomor pesanan (contoh: SHILL-982310) atau nomor resi (contoh: SCP-10293817) sudah tepat.`,
    },
    { status: 404 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = body.query || body.waybill || body.orderId;
    const courier = body.courier || 'sicepat';

    const url = new URL(request.url);
    url.searchParams.set('query', query || '');
    url.searchParams.set('courier', courier);

    return GET(new NextRequest(url));
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }
}
