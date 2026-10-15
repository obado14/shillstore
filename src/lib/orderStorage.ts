import {
  ShillOrder,
  TrackingStepStatus,
  TRACKING_STEPS_ORDER,
  TrackingHistoryItem,
} from '@/types/order';

const ORDERS_STORAGE_KEY = 'shill_customer_orders';
const LATEST_ORDER_KEY = 'shill_latest_order_id';

export const defaultMockOrders: ShillOrder[] = [
  {
    orderNumber: 'SHILL-982310',
    date: '3 Oktober 2026, 14:20 WIB',
    customer: {
      fullName: 'Budi Santoso',
      phone: '0812-3456-7890',
      email: 'budi.santoso@example.com',
      province: 'DKI Jakarta',
      city: 'Jakarta Selatan',
      postalCode: '12150',
      address: 'Jl. Melati No. 12, RT 02 / RW 05, Blok C, Kebayoran Baru',
      notes: 'Titipkan di pos satpam jika tidak ada orang',
    },
    items: [
      {
        id: 'shill-perfume-bloom',
        title: 'Parfume Shillstore Bloom Eau De Parfum 100ml',
        price: 139000,
        image: '/sites/shillstore/root/images/prod-perfume-shillstore-bloom.jpg',
        quantity: 1,
        size: '100ml',
      },
      {
        id: 'shill-chino-navy',
        title: 'Shill Relax Chino Pants Navy',
        price: 249000,
        image: '/sites/shillstore/root/images/prod-chino-sirius-black.jpg',
        quantity: 1,
        size: '32',
      },
    ],
    subtotal: 388000,
    shippingCost: 0,
    discount: 0,
    total: 388000,
    courierId: 'sicepat',
    courierName: 'SiCepat Express',
    trackingNumber: 'SCP-10293817',
    estimatedArrival: '18 - 19 Oktober 2026',
    paymentMethod: 'bca_va',
    paymentMethodName: 'BCA Virtual Account',
    paymentStatus: 'paid',
    currentStep: 'in_transit',
    destinationCoordinates: {
      lat: -6.2425,
      lng: 106.8016,
      label: 'Jl. Melati No. 12, Kebayoran Baru, Jakarta Selatan',
    },
    courierCoordinates: null,
    isLiveTracking: false,
    trackingDataSource: 'Simulasi / Database Lokal SHILLSTORE',
    history: [
      {
        step: 'processing',
        title: 'Pesanan Diproses',
        description: 'Pesanan telah diverifikasi secara otomatis dan masuk antrean fulfillment',
        location: 'SHILLSTORE Online Fulfillment',
        timestamp: '15 Okt 2026, 14:20 WIB',
      },
      {
        step: 'packed',
        title: 'Dikemas',
        description: 'Paket telah selesai diperiksa dan dikemas rapi dengan segel pengaman warehouse',
        location: 'Warehouse SHILLSTORE Jakarta Selatan',
        timestamp: '15 Okt 2026, 17:30 WIB',
      },
      {
        step: 'in_transit',
        title: 'Dalam Pengiriman',
        description: 'Paket telah di-pickup kurir SiCepat dan sedang bergerak menuju Sorting Hub transit Jakarta Selatan',
        location: 'Hub SiCepat Express Jakarta Selatan',
        timestamp: '16 Okt 2026, 09:15 WIB',
      },
    ],
  },
  {
    orderNumber: 'SHILL-892144',
    date: '14 Oktober 2026, 10:15 WIB',
    customer: {
      fullName: 'Rian Pratama',
      phone: '0813-8899-2211',
      email: 'rian.pratama@example.com',
      province: 'DKI Jakarta',
      city: 'Jakarta Pusat',
      postalCode: '10310',
      address: 'Jl. Teuku Umar No. 8, RT 01 / RW 03, Menteng',
    },
    items: [
      {
        id: 'shill-perfume-noir',
        title: 'Parfume Shillstore Noir Eau De Parfum 100ml',
        price: 149000,
        image: '/sites/shillstore/root/images/prod-perfume-shillstore-noir.jpg',
        quantity: 1,
        size: '100ml',
      },
    ],
    subtotal: 149000,
    shippingCost: 0,
    discount: 0,
    total: 149000,
    courierId: 'jnt',
    courierName: 'J&T Express',
    trackingNumber: 'JNT-49210988',
    estimatedArrival: 'Hari Ini (Estimasi 16:00 WIB)',
    paymentMethod: 'qris',
    paymentMethodName: 'QRIS',
    paymentStatus: 'paid',
    currentStep: 'out_for_delivery',
    destinationCoordinates: {
      lat: -6.1963,
      lng: 106.8327,
      label: 'Jl. Teuku Umar No. 8, Menteng, Jakarta Pusat',
    },
    courierCoordinates: null,
    isLiveTracking: false,
    trackingDataSource: 'Simulasi / Database Lokal SHILLSTORE',
    history: [
      {
        step: 'processing',
        title: 'Pesanan Diproses',
        description: 'Pembayaran via QRIS telah diverifikasi sistem',
        location: 'SHILLSTORE Online Fulfillment',
        timestamp: '14 Okt 2026, 10:15 WIB',
      },
      {
        step: 'packed',
        title: 'Dikemas',
        description: 'Paket telah selesai dikemas dan siap di-pickup oleh ekspedisi',
        location: 'Warehouse SHILLSTORE Jakarta Selatan',
        timestamp: '14 Okt 2026, 14:00 WIB',
      },
      {
        step: 'in_transit',
        title: 'Dalam Pengiriman',
        description: 'Paket tiba di DC Jakarta Pusat dan disortir untuk pengantaran akhir',
        location: 'DC J&T Express Jakarta Pusat',
        timestamp: '15 Okt 2026, 08:30 WIB',
      },
      {
        step: 'out_for_delivery',
        title: 'Sedang Diantar',
        description: 'Kurir (Ahmad Fauzi) sedang mengantar paket ke alamat penerima di Menteng',
        location: 'Menuju Alamat Penerima, Menteng',
        timestamp: '15 Okt 2026, 11:20 WIB',
      },
    ],
  },
  {
    orderNumber: 'SHILL-761209',
    date: '10 Oktober 2026, 19:40 WIB',
    customer: {
      fullName: 'Dian Permata',
      phone: '0811-2233-4455',
      email: 'dian.permata@example.com',
      province: 'DKI Jakarta',
      city: 'Jakarta Selatan',
      postalCode: '12920',
      address: 'Jl. Rasuna Said Kav. 5, Gedung Menara 2 Lt. 14, Setiabudi',
    },
    items: [
      {
        id: 'shill-jacket-windbreaker-black',
        title: 'Shill Windbreaker Jacket Black',
        price: 349000,
        image: '/sites/shillstore/root/images/prod-jacket-windbreaker-black.jpg',
        quantity: 1,
        size: 'M',
      },
    ],
    subtotal: 349000,
    shippingCost: 0,
    discount: 0,
    total: 349000,
    courierId: 'jne',
    courierName: 'JNE Reguler',
    trackingNumber: 'JNE-88120349',
    estimatedArrival: '12 Oktober 2026',
    paymentMethod: 'mandiri_va',
    paymentMethodName: 'Mandiri Virtual Account',
    paymentStatus: 'paid',
    currentStep: 'delivered',
    destinationCoordinates: {
      lat: -6.2152,
      lng: 106.8294,
      label: 'Jl. Rasuna Said Kav. 5, Setiabudi, Jakarta Selatan',
    },
    courierCoordinates: null,
    isLiveTracking: false,
    trackingDataSource: 'Simulasi / Database Lokal SHILLSTORE',
    history: [
      {
        step: 'processing',
        title: 'Pesanan Diproses',
        description: 'Pesanan masuk dan pembayaran Mandiri VA berhasil',
        location: 'SHILLSTORE Online Fulfillment',
        timestamp: '10 Okt 2026, 19:40 WIB',
      },
      {
        step: 'packed',
        title: 'Dikemas',
        description: 'Paket selesai dikemas dan diserahterimakan ke agen JNE',
        location: 'Warehouse SHILLSTORE Jakarta Selatan',
        timestamp: '11 Okt 2026, 09:30 WIB',
      },
      {
        step: 'in_transit',
        title: 'Dalam Pengiriman',
        description: 'Paket tiba di Hub Logistik JNE Jakarta Selatan',
        location: 'JNE Hub Jakarta Selatan',
        timestamp: '11 Okt 2026, 16:45 WIB',
      },
      {
        step: 'out_for_delivery',
        title: 'Sedang Diantar',
        description: 'Kurir sedang dalam perjalanan ke Gedung Menara 2',
        location: 'Area Setiabudi, Jakarta Selatan',
        timestamp: '12 Okt 2026, 10:15 WIB',
      },
      {
        step: 'delivered',
        title: 'Terkirim',
        description: 'Paket berhasil diterima oleh Resepsionis Gedung (Dian Permata)',
        location: 'Gedung Menara 2 Lt. 14, Setiabudi',
        timestamp: '12 Okt 2026, 13:40 WIB',
      },
    ],
  },
];

export function getOrders(): ShillOrder[] {
  if (typeof window === 'undefined') return defaultMockOrders;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(defaultMockOrders));
      return defaultMockOrders;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(defaultMockOrders));
    return defaultMockOrders;
  } catch {
    return defaultMockOrders;
  }
}

export function getOrderByTrackingOrId(identifier: string): ShillOrder | null {
  if (!identifier) return null;
  const clean = identifier.replace(/^#/, '').trim().toUpperCase();
  const orders = getOrders();
  return (
    orders.find((o) => {
      const orderMatch =
        o.orderNumber.toUpperCase() === clean || o.orderNumber.toUpperCase().includes(clean);
      const trackingMatch =
        o.trackingNumber.toUpperCase() === clean || o.trackingNumber.toUpperCase().includes(clean);
      return orderMatch || trackingMatch;
    }) || null
  );
}

export function getOrderById(orderNumber: string): ShillOrder | null {
  return getOrderByTrackingOrId(orderNumber);
}

export function getLatestOrderId(): string | null {
  if (typeof window === 'undefined') return defaultMockOrders[0].orderNumber;
  try {
    const stored = localStorage.getItem(LATEST_ORDER_KEY);
    if (stored) return stored;
    const orders = getOrders();
    return orders.length > 0 ? orders[0].orderNumber : null;
  } catch {
    return null;
  }
}

export function saveOrder(newOrder: ShillOrder): void {
  if (typeof window === 'undefined') return;
  try {
    const orderWithCoords: ShillOrder = {
      ...newOrder,
      destinationCoordinates: newOrder.destinationCoordinates || {
        lat: -6.2425,
        lng: 106.8016,
        label: `${newOrder.customer.address}, ${newOrder.customer.city}`,
      },
    };

    const orders = getOrders();
    const existingIndex = orders.findIndex((o) => o.orderNumber === orderWithCoords.orderNumber);
    let updated: ShillOrder[];
    if (existingIndex >= 0) {
      updated = [...orders];
      updated[existingIndex] = orderWithCoords;
    } else {
      updated = [orderWithCoords, ...orders];
    }
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(LATEST_ORDER_KEY, orderWithCoords.orderNumber);
    window.dispatchEvent(new Event('shill-orders-updated'));
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }
}

export function updateOrderStep(
  orderNumber: string,
  targetStep: TrackingStepStatus
): ShillOrder | null {
  const order = getOrderByTrackingOrId(orderNumber);
  if (!order) return null;

  const targetIndex = TRACKING_STEPS_ORDER.findIndex((s) => s.key === targetStep);
  if (targetIndex === -1) return null;

  const now = new Date();
  const timeFormatted =
    now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';

  // Build history up to target step
  const updatedHistory: TrackingHistoryItem[] = [];
  for (let i = 0; i <= targetIndex; i++) {
    const stepDef = TRACKING_STEPS_ORDER[i];
    const existing = order.history.find((h) => h.step === stepDef.key);
    if (existing) {
      updatedHistory.push(existing);
    } else {
      updatedHistory.push({
        step: stepDef.key,
        title: stepDef.title,
        description: stepDef.defaultDescription,
        location: stepDef.defaultLocation,
        timestamp: timeFormatted,
      });
    }
  }

  const updatedOrder: ShillOrder = {
    ...order,
    currentStep: targetStep,
    history: updatedHistory,
  };

  saveOrder(updatedOrder);
  return updatedOrder;
}

export function advanceOrderStep(orderNumber: string): ShillOrder | null {
  const order = getOrderByTrackingOrId(orderNumber);
  if (!order) return null;

  const currentIndex = TRACKING_STEPS_ORDER.findIndex((s) => s.key === order.currentStep);
  if (currentIndex < TRACKING_STEPS_ORDER.length - 1) {
    const nextStep = TRACKING_STEPS_ORDER[currentIndex + 1].key;
    return updateOrderStep(orderNumber, nextStep);
  }
  return order;
}

export function resetOrderStep(orderNumber: string): ShillOrder | null {
  const order = getOrderByTrackingOrId(orderNumber);
  if (!order) return null;
  // Reset back to 'processing'
  return updateOrderStep(orderNumber, 'processing');
}
