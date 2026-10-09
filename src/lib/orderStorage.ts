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
    estimatedArrival: '6 - 7 Oktober 2026',
    paymentMethod: 'bca_va',
    paymentMethodName: 'BCA Virtual Account',
    paymentStatus: 'paid',
    currentStep: 'in_transit',
    history: [
      {
        step: 'created',
        title: 'Pesanan Dibuat',
        description: 'Pesanan berhasil dibuat di sistem SHILLSTORE',
        location: 'SHILLSTORE Online Store',
        timestamp: '3 Okt 2026, 14:20 WIB',
      },
      {
        step: 'paid',
        title: 'Pembayaran Berhasil',
        description: 'Pembayaran Rp 388.000 via BCA Virtual Account telah terverifikasi',
        location: 'Payment Gateway SHILLSTORE',
        timestamp: '3 Okt 2026, 14:22 WIB',
      },
      {
        step: 'processing',
        title: 'Pesanan Diproses',
        description: 'Paket telah selesai diperiksa dan dikemas rapi dengan segel pengaman',
        location: 'Warehouse SHILLSTORE Jakarta Selatan',
        timestamp: '4 Okt 2026, 09:15 WIB',
      },
      {
        step: 'handed_over',
        title: 'Diserahkan ke Kurir',
        description: 'Paket telah di-pickup oleh SiCepat Express dan diproses di hub transit',
        location: 'Hub SiCepat Jakarta Selatan',
        timestamp: '4 Okt 2026, 17:30 WIB',
      },
      {
        step: 'in_transit',
        title: 'Dalam Pengiriman',
        description: 'Paket sedang dibawa kurir mitra menuju alamat penerima',
        location: 'Menuju Kebayoran Baru, Jakarta Selatan',
        timestamp: '5 Okt 2026, 08:45 WIB',
      },
    ],
  },
  {
    orderNumber: 'SHILL-892144',
    date: '28 September 2026, 10:15 WIB',
    customer: {
      fullName: 'Budi Santoso',
      phone: '0812-3456-7890',
      email: 'budi.santoso@example.com',
      province: 'DKI Jakarta',
      city: 'Jakarta Selatan',
      postalCode: '12150',
      address: 'Jl. Melati No. 12, RT 02 / RW 05, Blok C, Kebayoran Baru',
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
    courierId: 'sicepat',
    courierName: 'SiCepat Express',
    trackingNumber: 'SCP-99120481',
    estimatedArrival: '30 September 2026',
    paymentMethod: 'qris',
    paymentMethodName: 'QRIS',
    paymentStatus: 'paid',
    currentStep: 'delivered',
    history: [
      {
        step: 'created',
        title: 'Pesanan Dibuat',
        description: 'Pesanan berhasil dibuat di sistem SHILLSTORE',
        location: 'SHILLSTORE Online Store',
        timestamp: '28 Sep 2026, 10:15 WIB',
      },
      {
        step: 'paid',
        title: 'Pembayaran Berhasil',
        description: 'Pembayaran Rp 149.000 via QRIS berhasil diverifikasi',
        location: 'Payment Gateway SHILLSTORE',
        timestamp: '28 Sep 2026, 10:16 WIB',
      },
      {
        step: 'processing',
        title: 'Pesanan Diproses',
        description: 'Paket telah selesai dikemas dan siap untuk penjemputan ekspedisi',
        location: 'Warehouse SHILLSTORE Jakarta Selatan',
        timestamp: '28 Sep 2026, 13:40 WIB',
      },
      {
        step: 'handed_over',
        title: 'Diserahkan ke Kurir',
        description: 'Paket telah diterima kurir SiCepat',
        location: 'Hub SiCepat Jakarta Selatan',
        timestamp: '28 Sep 2026, 16:50 WIB',
      },
      {
        step: 'in_transit',
        title: 'Dalam Pengiriman',
        description: 'Paket sedang diantar ke alamat tujuan',
        location: 'Jakarta Selatan',
        timestamp: '29 Sep 2026, 09:30 WIB',
      },
      {
        step: 'delivered',
        title: 'Pesanan Sampai',
        description: 'Paket telah diterima langsung oleh Budi Santoso',
        location: 'Kebayoran Baru, Jakarta Selatan',
        timestamp: '29 Sep 2026, 13:20 WIB',
      },
    ],
  },
  {
    orderNumber: 'SHILL-741902',
    date: '15 September 2026, 19:40 WIB',
    customer: {
      fullName: 'Budi Santoso',
      phone: '0812-3456-7890',
      email: 'budi.santoso@example.com',
      province: 'DKI Jakarta',
      city: 'Jakarta Selatan',
      postalCode: '12150',
      address: 'Jl. Melati No. 12, RT 02 / RW 05, Blok C, Kebayoran Baru',
    },
    items: [
      {
        id: 'shill-jacket-windbreaker-army-green',
        title: 'Shill Windbreaker Jacket Army Green',
        price: 349000,
        image: '/sites/shillstore/root/images/prod-jacket-windbreaker-army-green.jpg',
        quantity: 1,
        size: 'L',
      },
    ],
    subtotal: 349000,
    shippingCost: 0,
    discount: 0,
    total: 349000,
    courierId: 'jne',
    courierName: 'JNE Reguler',
    trackingNumber: 'JNE-88120349',
    estimatedArrival: '18 September 2026',
    paymentMethod: 'mandiri_va',
    paymentMethodName: 'Mandiri Virtual Account',
    paymentStatus: 'paid',
    currentStep: 'delivered',
    history: [
      {
        step: 'created',
        title: 'Pesanan Dibuat',
        description: 'Pesanan berhasil dibuat di sistem SHILLSTORE',
        location: 'SHILLSTORE Online Store',
        timestamp: '15 Sep 2026, 19:40 WIB',
      },
      {
        step: 'paid',
        title: 'Pembayaran Berhasil',
        description: 'Pembayaran Rp 349.000 via Mandiri Virtual Account terverifikasi',
        location: 'Payment Gateway SHILLSTORE',
        timestamp: '15 Sep 2026, 19:43 WIB',
      },
      {
        step: 'processing',
        title: 'Pesanan Diproses',
        description: 'Paket telah selesai diperiksa dan dikemas rapi',
        location: 'Warehouse SHILLSTORE Jakarta Selatan',
        timestamp: '16 Sep 2026, 10:00 WIB',
      },
      {
        step: 'handed_over',
        title: 'Diserahkan ke Kurir',
        description: 'Paket telah diterima di counter JNE Reguler',
        location: 'JNE Hub Jakarta Selatan',
        timestamp: '16 Sep 2026, 14:15 WIB',
      },
      {
        step: 'in_transit',
        title: 'Dalam Pengiriman',
        description: 'Paket sedang diantar kurir ke alamat tujuan',
        location: 'Jakarta Selatan',
        timestamp: '17 Sep 2026, 11:20 WIB',
      },
      {
        step: 'delivered',
        title: 'Pesanan Sampai',
        description: 'Paket telah diterima dengan baik oleh penerima',
        location: 'Kebayoran Baru, Jakarta Selatan',
        timestamp: '17 Sep 2026, 15:40 WIB',
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

export function getOrderById(orderNumber: string): ShillOrder | null {
  if (!orderNumber) return null;
  const cleanId = orderNumber.replace(/^#/, '').trim().toUpperCase();
  const orders = getOrders();
  const found = orders.find(
    (o) => o.orderNumber.toUpperCase() === cleanId || o.orderNumber.toUpperCase().includes(cleanId)
  );
  return found || null;
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
    const orders = getOrders();
    const existingIndex = orders.findIndex((o) => o.orderNumber === newOrder.orderNumber);
    let updated: ShillOrder[];
    if (existingIndex >= 0) {
      updated = [...orders];
      updated[existingIndex] = newOrder;
    } else {
      updated = [newOrder, ...orders];
    }
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(LATEST_ORDER_KEY, newOrder.orderNumber);
    window.dispatchEvent(new Event('shill-orders-updated'));
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }
}

export function updateOrderStep(
  orderNumber: string,
  targetStep: TrackingStepStatus
): ShillOrder | null {
  const order = getOrderById(orderNumber);
  if (!order) return null;

  const targetIndex = TRACKING_STEPS_ORDER.findIndex((s) => s.key === targetStep);
  if (targetIndex === -1) return null;

  const now = new Date();
  const timeFormatted = now.toLocaleDateString('id-ID', {
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
  const order = getOrderById(orderNumber);
  if (!order) return null;

  const currentIndex = TRACKING_STEPS_ORDER.findIndex((s) => s.key === order.currentStep);
  if (currentIndex < TRACKING_STEPS_ORDER.length - 1) {
    const nextStep = TRACKING_STEPS_ORDER[currentIndex + 1].key;
    return updateOrderStep(orderNumber, nextStep);
  }
  return order;
}

export function resetOrderStep(orderNumber: string): ShillOrder | null {
  const order = getOrderById(orderNumber);
  if (!order) return null;
  // Reset back to 'processing' (standard status right after payment)
  return updateOrderStep(orderNumber, 'processing');
}
