import { PackageData, ShipSchedule, OngkirRate } from '../types';

export const WAREHOUSE_ADDRESS = {
  name: 'Gudang NKExpress Ternate',
  adminPhone: '0821-5046-568',
  rawPhone: '628215046568',
  street: 'Depan Panti Jompo Himo Himo Ubo Ubo, Jalan Lapangan, Bengkel Mobil, Pagar Seng, Samping Citra Wijaya Meubel Somel',
  subdistrict: 'RT 013 / RW 004',
  district: 'Ternate Selatan',
  city: 'Kota Ternate',
  province: 'Maluku Utara',
  postalCode: '',
};

export const INITIAL_RATES: OngkirRate[] = [
  { destination: 'Sofifi', region: 'Ibu Kota Prov. Maluku Utara', pricePerKg: 20000, minKg: 1, estimatedDays: '1 - 2 Hari', deliveryType: 'Express' },
  { destination: 'Ternate', region: 'Kota Ternate', pricePerKg: 20000, minKg: 1, estimatedDays: '1 - 2 Hari', deliveryType: 'Express' },
  { destination: 'Tidore', region: 'Kota Tidore Kepulauan', pricePerKg: 20000, minKg: 1, estimatedDays: '1 - 2 Hari', deliveryType: 'Express' },
];

export const INITIAL_PACKAGES: PackageData[] = [
  {
    resi: 'NK-889102',
    senderName: 'Shopee Official Store',
    receiverName: 'Budi Santoso',
    receiverPhone: '0812-3456-7890',
    destination: 'Sofifi',
    weightKg: 12.5,
    totalCost: 81250,
    status: 'Dalam Pelayaran',
    shipName: 'KM Nggapulu',
    currentLocation: 'Laut Halmahera (Menuju Pelabuhan Sofifi)',
    createdAt: '2026-08-02 10:30',
    estimatedArrival: '2026-08-08',
    history: [
      { timestamp: '2026-08-02 10:30', status: 'Di Gudang Ternate', location: 'Gudang Ternate', description: 'Paket diterima dari ekspedisi lokal dan ditimbang' },
      { timestamp: '2026-08-03 14:00', status: 'Proses Muat Kapal', location: 'Pelabuhan Ternate', description: 'Paket dimasukkan ke karung manifest kargo laut' },
      { timestamp: '2026-08-04 09:15', status: 'Dalam Pelayaran', location: 'KM Nggapulu', description: 'Kapal bertolak via Ternate menuju Sofifi' },
    ]
  },
  {
    resi: 'NK-993821',
    senderName: 'TikTok Shop / Fashion Indo',
    receiverName: 'Siti Rahma',
    receiverPhone: '0852-9876-5432',
    destination: 'Sofifi',
    weightKg: 8,
    totalCost: 60000,
    status: 'Siap Diambil',
    shipName: 'KM Speedboat Express',
    currentLocation: 'Agen Cabang Sofifi',
    createdAt: '2026-07-28 16:20',
    estimatedArrival: '2026-08-05',
    history: [
      { timestamp: '2026-07-28 16:20', status: 'Di Gudang Ternate', location: 'Gudang Ternate', description: 'Paket masuk sistem NKExpress' },
      { timestamp: '2026-07-30 08:00', status: 'Dalam Pelayaran', location: 'KM Dorolonda', description: 'Kapal berlayar ke destinasi tujuan' },
      { timestamp: '2026-08-04 11:30', status: 'Tiba di Port Tujuan', location: 'Pelabuhan Ternate / Sofifi', description: 'Bongkar muat kargo ke truk agen' },
      { timestamp: '2026-08-05 09:00', status: 'Siap Diambil', location: 'Agen Cabang Sofifi', description: 'Paket siap diambil, notifikasi WA telah dikirim' },
    ]
  },
  {
    resi: 'NK-100482',
    senderName: 'Toko Elektronik Online',
    receiverName: 'Ahmad Fauzi',
    receiverPhone: '0821-1122-3344',
    destination: 'Sofifi',
    weightKg: 15,
    totalCost: 85000,
    status: 'Di Gudang Ternate',
    currentLocation: 'Gudang Ternate',
    createdAt: '2026-08-05 15:45',
    estimatedArrival: '2026-08-13',
    history: [
      { timestamp: '2026-08-05 15:45', status: 'Di Gudang Ternate', location: 'Gudang Ternate', description: 'Paket diserahterimakan & verifikasi alamat NKExpress' }
    ]
  }
];

export const INITIAL_SCHEDULES: ShipSchedule[] = [];
