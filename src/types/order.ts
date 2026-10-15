export type TrackingStepStatus =
  | 'created'            // Pesanan Dibuat
  | 'paid'               // Pembayaran Berhasil
  | 'processing'         // 1. Pesanan Diproses
  | 'packed'             // 2. Dikemas
  | 'handed_over'        // Diserahkan ke Kurir
  | 'in_transit'         // 3. Dalam Pengiriman
  | 'out_for_delivery'   // 4. Sedang Diantar
  | 'delivered';         // 5. Terkirim

export type MainTrackingStageKey =
  | 'processing'
  | 'packed'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered';

export interface MainTrackingStage {
  key: MainTrackingStageKey;
  title: string;
  description: string;
}

export const MAIN_TRACKING_STAGES: MainTrackingStage[] = [
  { key: 'processing', title: 'Pesanan Diproses', description: 'Pesanan terverifikasi sistem' },
  { key: 'packed', title: 'Dikemas', description: 'Quality check & packaging' },
  { key: 'in_transit', title: 'Dalam Pengiriman', description: 'Menuju kota tujuan' },
  { key: 'out_for_delivery', title: 'Sedang Diantar', description: 'Kurir menuju alamat Anda' },
  { key: 'delivered', title: 'Terkirim', description: 'Paket berhasil diterima' },
];

export function mapStepToMainStage(step: TrackingStepStatus): MainTrackingStageKey {
  switch (step) {
    case 'created':
    case 'paid':
    case 'processing':
      return 'processing';
    case 'packed':
      return 'packed';
    case 'handed_over':
    case 'in_transit':
      return 'in_transit';
    case 'out_for_delivery':
      return 'out_for_delivery';
    case 'delivered':
      return 'delivered';
    default:
      return 'processing';
  }
}

export interface TrackingStepDefinition {
  key: TrackingStepStatus;
  title: string;
  defaultDescription: string;
  defaultLocation: string;
}

export const TRACKING_STEPS_ORDER: TrackingStepDefinition[] = [
  {
    key: 'processing',
    title: 'Pesanan Diproses',
    defaultDescription: 'Pesanan berhasil diverifikasi dan masuk antrean sistem fulfillment SHILLSTORE',
    defaultLocation: 'SHILLSTORE Online Fulfillment',
  },
  {
    key: 'packed',
    title: 'Dikemas',
    defaultDescription: 'Paket telah selesai diperiksa dan dikemas rapi dengan segel pengaman warehouse',
    defaultLocation: 'Warehouse SHILLSTORE Jakarta Selatan',
  },
  {
    key: 'in_transit',
    title: 'Dalam Pengiriman',
    defaultDescription: 'Paket telah diproses di Sorting Hub ekspedisi dan dalam perjalanan logistik',
    defaultLocation: 'Hub Ekspedisi & Transit Kota Tujuan',
  },
  {
    key: 'out_for_delivery',
    title: 'Sedang Diantar',
    defaultDescription: 'Paket dibawa oleh kurir mitra dan sedang dalam perjalanan menuju alamat penerima',
    defaultLocation: 'Area Pengantaran Menuju Alamat Penerima',
  },
  {
    key: 'delivered',
    title: 'Terkirim',
    defaultDescription: 'Paket telah sampai di alamat tujuan dan diterima dengan baik oleh penerima',
    defaultLocation: 'Alamat Tujuan Penerima',
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

export interface Coordinates {
  lat: number;
  lng: number;
  label?: string;
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
  destinationCoordinates?: Coordinates;
  courierCoordinates?: Coordinates | null;
  isLiveTracking?: boolean;
  trackingDataSource?: string;
}
