export type TrackingStepStatus =
  | 'created'        // 1. Pesanan Dibuat
  | 'paid'           // 2. Pembayaran Berhasil
  | 'processing'     // 3. Pesanan Diproses
  | 'handed_over'    // 4. Diserahkan ke Kurir
  | 'in_transit'     // 5. Dalam Pengiriman
  | 'delivered';     // 6. Pesanan Sampai

export interface TrackingStepDefinition {
  key: TrackingStepStatus;
  title: string;
  defaultDescription: string;
  defaultLocation: string;
}

export const TRACKING_STEPS_ORDER: TrackingStepDefinition[] = [
  {
    key: 'created',
    title: 'Pesanan Dibuat',
    defaultDescription: 'Pesanan berhasil dibuat di sistem SHILLSTORE',
    defaultLocation: 'SHILLSTORE Online Store',
  },
  {
    key: 'paid',
    title: 'Pembayaran Berhasil',
    defaultDescription: 'Pembayaran telah diverifikasi secara otomatis',
    defaultLocation: 'Payment Gateway SHILLSTORE',
  },
  {
    key: 'processing',
    title: 'Pesanan Diproses',
    defaultDescription: 'Paket sedang dikemas & quality check oleh tim warehouse',
    defaultLocation: 'Warehouse SHILLSTORE Jakarta Selatan',
  },
  {
    key: 'handed_over',
    title: 'Diserahkan ke Kurir',
    defaultDescription: 'Paket telah di-pickup dan diserahkan ke pihak ekspedisi',
    defaultLocation: 'Sorting Hub Ekspedisi Jakarta',
  },
  {
    key: 'in_transit',
    title: 'Dalam Pengiriman',
    defaultDescription: 'Paket sedang dalam perjalanan menuju alamat tujuan pengiriman',
    defaultLocation: 'Menuju Hub Tujuan & Alamat Penerima',
  },
  {
    key: 'delivered',
    title: 'Pesanan Sampai',
    defaultDescription: 'Paket telah sampai dan diterima dengan baik oleh penerima',
    defaultLocation: 'Alamat Tujuan Pengiriman',
  },
];

export interface TrackingHistoryItem {
  step: TrackingStepStatus;
  title: string;
  description: string;
  location: string;
  timestamp: string;
}

export interface OrderItemDetail {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface OrderCustomerDetail {
  fullName: string;
  phone: string;
  email?: string;
  province: string;
  city: string;
  postalCode?: string;
  address: string;
  notes?: string;
}

export interface ShillOrder {
  orderNumber: string;
  date: string;
  customer: OrderCustomerDetail;
  items: OrderItemDetail[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  voucherCode?: string;
  total: number;
  courierId: 'sicepat' | 'jne' | 'jnt' | 'instant';
  courierName: string;
  trackingNumber: string;
  estimatedArrival: string;
  paymentMethod: 'qris' | 'bca_va' | 'mandiri_va' | 'cod';
  paymentMethodName: string;
  paymentStatus: 'paid' | 'unpaid' | 'failed';
  currentStep: TrackingStepStatus;
  history: TrackingHistoryItem[];
}
