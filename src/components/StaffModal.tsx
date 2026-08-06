import React, { useState } from 'react';
import { X, Lock, Plus, Ship, Package, Save, CheckCircle, RefreshCw, Trash2, KeyRound } from 'lucide-react';
import { PackageData, ShipSchedule, OngkirRate } from '../types';

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  packages: PackageData[];
  onAddPackage: (pkg: PackageData) => void;
  onUpdatePackageStatus: (resi: string, newStatus: PackageData['status'], newLoc: string) => void;
  schedules: ShipSchedule[];
  onAddSchedule: (sched: ShipSchedule) => void;
  onDeleteSchedule: (id: string) => void;
}

export const StaffModal: React.FC<StaffModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  onLoginSuccess,
  onLogout,
  packages,
  onAddPackage,
  onUpdatePackageStatus,
  schedules,
  onAddSchedule,
  onDeleteSchedule,
}) => {
  if (!isOpen) return null;

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'packages' | 'schedules' | 'newPackage'>('packages');

  // Form New Package
  const [newResi, setNewResi] = useState(`NK-${Math.floor(100000 + Math.random() * 900000)}`);
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [destination, setDestination] = useState('Sofifi');
  const [weightKg, setWeightKg] = useState('5');
  const [shipName, setShipName] = useState('KM Speedboat Express');

  // Form New Schedule
  const [schedShipName, setSchedShipName] = useState('KM Speedboat Express');
  const [schedOrigin, setSchedOrigin] = useState('Pelabuhan Ternate');
  const [schedDest, setSchedDest] = useState('Pelabuhan Sofifi / Tidore');
  const [schedDeptDate, setSchedDeptDate] = useState('12 Agustus 2026');
  const [schedClosingDate, setSchedClosingDate] = useState('10 Agustus 2026 (18:00 WIB)');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'nusakirim.123' || password === '123456' || password === 'admin' || password === 'andri') {
      onLoginSuccess();
      setLoginError('');
      setPassword('');
    } else {
      setLoginError('Password salah. Gunakan password: nusakirim.123');
    }
  };

  const handleCreatePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiverName || !destination) return;

    const w = parseFloat(weightKg) || 5;
    const priceMap: Record<string, number> = {
      Ternate: 6500,
      Tidore: 7500,
      Tobelo: 8500,
      Sofifi: 7500,
      Sanana: 9500,
      Labuha: 9000,
      Morotai: 10000,
    };
    const rate = priceMap[destination] || 8000;
    const totalCost = w * rate;

    const newPkg: PackageData = {
      resi: newResi,
      senderName: senderName || 'Shopee / Jastip Admin',
      receiverName,
      receiverPhone: receiverPhone || '0812-xxxx-xxxx',
      destination,
      weightKg: w,
      totalCost,
      status: 'Di Gudang Ternate',
      shipName,
      currentLocation: 'Gudang Ternate',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      estimatedArrival: '7 Hari Kerja',
      history: [
        {
          timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
          status: 'Di Gudang Ternate',
          location: 'Gudang Ternate',
          description: 'Resi baru dibuat & ditempel pada kargo',
        },
      ],
    };

    onAddPackage(newPkg);
    setActiveTab('packages');
    setNewResi(`NK-${Math.floor(100000 + Math.random() * 900000)}`);
    setReceiverName('');
    setReceiverPhone('');
  };

  const handlePublishSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const newSched: ShipSchedule = {
      id: Date.now().toString(),
      shipName: schedShipName,
      origin: schedOrigin,
      destination: schedDest,
      departureDate: schedDeptDate,
      arrivalEstimate: '1-2 Hari',
      closingCargoDate: schedClosingDate,
      status: 'Buka Cargo',
    };
    onAddSchedule(newSched);
    setSchedShipName('KM Speedboat Express');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 text-left text-slate-800 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isLoggedIn ? (
          /* Login Form */
          <div className="py-4 space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Login Staff NKExpress</h3>
              <p className="text-xs text-slate-500 mt-1">
                Akses khusus admin gudang untuk input resi & publikasi jadwal kapal.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5 max-w-sm mx-auto">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Password Admin / Staff
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password (Password: nusakirim.123)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {loginError && (
                <p className="text-xs text-red-600 font-medium bg-red-50 p-2 rounded-lg border border-red-200">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Masuk Dashboard Staff
              </button>
            </form>
          </div>
        ) : (
          /* Staff Dashboard */
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Dashboard Staff Logistik</span>
                </h3>
                <p className="text-[10px] text-red-600 font-medium">Logged in as Admin NKExpress</p>
              </div>
              <button
                onClick={onLogout}
                className="text-[11px] text-red-600 hover:text-red-700 font-semibold px-2.5 py-1 bg-red-50 rounded-lg border border-red-200 cursor-pointer"
              >
                Logout
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-100 pb-3 mb-4 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'packages'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Daftar Resi ({packages.length})
              </button>
              <button
                onClick={() => setActiveTab('newPackage')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'newPackage'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                + Buat Resi Baru
              </button>
              <button
                onClick={() => setActiveTab('schedules')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'schedules'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Publikasi Jadwal Kapal
              </button>
            </div>

            {/* Tab 1: Packages List */}
            {activeTab === 'packages' && (
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <div key={pkg.resi} className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-red-600 text-sm">{pkg.resi}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{pkg.status}</span>
                    </div>
                    <div className="text-slate-700 text-[11px] grid grid-cols-2 gap-1">
                      <p>Penerima: <strong>{pkg.receiverName}</strong></p>
                      <p>Tujuan: <strong>{pkg.destination}</strong></p>
                      <p>Berat: {pkg.weightKg} kg</p>
                      <p>Kapal: {pkg.shipName || 'Pelni'}</p>
                    </div>

                    {/* Quick Update Status */}
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-500 font-medium">Ubah Status:</span>
                      <select
                        value={pkg.status}
                        onChange={(e) =>
                          onUpdatePackageStatus(
                            pkg.resi,
                            e.target.value as PackageData['status'],
                            e.target.value === 'Dalam Pelayaran' ? `Kapal ${pkg.shipName}` : 'Tiba Agen Cabang'
                          )
                        }
                        className="bg-white border border-slate-300 text-slate-800 text-[10px] px-2 py-1 rounded focus:outline-none focus:border-red-500"
                      >
                        <option value="Di Gudang Ternate">Di Gudang Ternate</option>
                        <option value="Proses Muat Kapal">Proses Muat Kapal</option>
                        <option value="Dalam Pelayaran">Dalam Pelayaran</option>
                        <option value="Tiba di Port Tujuan">Tiba di Port Tujuan</option>
                        <option value="Siap Diambil">Siap Diambil</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: New Package Form */}
            {activeTab === 'newPackage' && (
              <form onSubmit={handleCreatePackageSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Nomor Resi Auto-generated</label>
                  <input
                    type="text"
                    value={newResi}
                    readOnly
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-red-600 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Nama Penerima & HP</label>
                  <input
                    type="text"
                    required
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="Contoh: Siti Rahma"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 mb-2 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="text"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    placeholder="No. HP Penerima (0812...)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Kota Tujuan</label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                    >
                      <option value="Ternate">Ternate</option>
                      <option value="Tidore">Tidore</option>
                      <option value="Sofifi">Sofifi</option>
                      <option value="Tobelo">Tobelo</option>
                      <option value="Sanana">Sanana</option>
                      <option value="Labuha">Labuha</option>
                      <option value="Morotai">Morotai</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Berat (kg)</label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 rounded-xl shadow-md mt-2 cursor-pointer transition-all"
                >
                  Simpan & Terbitkan Resi
                </button>
              </form>
            )}

            {/* Tab 3: Publish Ship Schedule */}
            {activeTab === 'schedules' && (
              <div className="space-y-4 text-xs">
                <form onSubmit={handlePublishSchedule} className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1">
                    <Ship className="w-4 h-4 text-red-600" /> Form Tambah Jadwal Kapal
                  </h4>
                  <div>
                    <label className="block text-slate-600 mb-1">Nama Kapal</label>
                    <input
                      type="text"
                      value={schedShipName}
                      onChange={(e) => setSchedShipName(e.target.value)}
                      placeholder="KM Speedboat Express / KM Nggapulu"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 mb-1">Tgl Berangkat</label>
                      <input
                        type="text"
                        value={schedDeptDate}
                        onChange={(e) => setSchedDeptDate(e.target.value)}
                        placeholder="12 Agustus 2026"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Closing Cargo</label>
                      <input
                        type="text"
                        value={schedClosingDate}
                        onChange={(e) => setSchedClosingDate(e.target.value)}
                        placeholder="10 Agustus 2026"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded-lg cursor-pointer transition-all shadow-md"
                  >
                    Publikasikan Jadwal Kapal Live
                  </button>
                </form>

                {/* Schedule list */}
                <div className="space-y-2">
                  <p className="font-bold text-slate-800">Jadwal yang Sedang Aktif ({schedules.length}):</p>
                  {schedules.map((sc) => (
                    <div key={sc.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">{sc.shipName} ({sc.departureDate})</p>
                        <p className="text-[10px] text-slate-500">Closing: {sc.closingCargoDate}</p>
                      </div>
                      <button
                        onClick={() => onDeleteSchedule(sc.id)}
                        className="p-1.5 text-red-600 hover:text-red-700 bg-red-50 rounded border border-red-200 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
