import React, { useState } from 'react';
import { Wrench, Calculator, Copy, Check, Send, AlertCircle, FileText, ChevronDown, ChevronUp, PackageCheck, Box } from 'lucide-react';
import { OngkirRate } from '../types';
import { WAREHOUSE_ADDRESS } from '../data/initialData';

interface AlatBantuPengirimanProps {
  rates: OngkirRate[];
}

export const AlatBantuPengiriman: React.FC<AlatBantuPengirimanProps> = ({ rates }) => {
  // Cek Ongkir State
  const [selectedDestination, setSelectedDestination] = useState('Sofifi');
  const [packageType, setPackageType] = useState<'kg' | 'karung' | 'besar'>('kg');
  const [weightInput, setWeightInput] = useState('');
  const [karungCount, setKarungCount] = useState('1');
  const [showPriceList, setShowPriceList] = useState(false);

  const [calculatedResult, setCalculatedResult] = useState<{
    destination: string;
    type: 'kg' | 'karung' | 'besar';
    inputVal: number;
    chargedKg?: number;
    totalCost: number;
    note: string;
  } | null>(null);

  // Label Alamat State
  const [labelName, setLabelName] = useState('');
  const [labelDestination, setLabelDestination] = useState('');
  const [labelPhone, setLabelPhone] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Tier calculation helper for weight in kg
  const calculateTierOngkir = (weightInKg: number) => {
    if (weightInKg <= 0) return { chargedKg: 0, totalCost: 0, note: '' };

    const chargedKg = Math.max(1, Math.ceil(weightInKg));
    let totalCost = 0;
    let note = '';

    if (chargedKg <= 1) {
      totalCost = 20000;
      note = 'Tarif paket ≤ 1 kg';
    } else if (chargedKg === 2) {
      totalCost = 23000;
      note = 'Tarif paket 2 kg';
    } else if (chargedKg === 3) {
      totalCost = 26000;
      note = 'Tarif paket 3 kg';
    } else if (chargedKg === 4) {
      totalCost = 29000;
      note = 'Tarif paket 4 kg';
    } else if (chargedKg === 5) {
      totalCost = 30000;
      note = 'Tarif paket 5 kg';
    } else if (chargedKg === 6) {
      totalCost = 35000;
      note = 'Tarif paket 6 kg';
    } else if (chargedKg === 7) {
      totalCost = 40000;
      note = 'Tarif paket 7 kg';
    } else if (chargedKg === 8) {
      totalCost = 45000;
      note = 'Tarif paket 8 kg';
    } else if (chargedKg === 9) {
      totalCost = 48000;
      note = 'Tarif paket 9 kg';
    } else if (chargedKg === 10) {
      totalCost = 50000;
      note = 'Tarif paket 10 kg';
    } else if (chargedKg === 11) {
      totalCost = 57000;
      note = 'Tarif paket 11 kg';
    } else if (chargedKg === 12) {
      totalCost = 64000;
      note = 'Tarif paket 12 kg';
    } else if (chargedKg === 13) {
      totalCost = 71000;
      note = 'Tarif paket 13 kg';
    } else if (chargedKg === 14) {
      totalCost = 78000;
      note = 'Tarif paket 14 kg';
    } else if (chargedKg === 15) {
      totalCost = 85000;
      note = 'Tarif paket 15 kg';
    } else if (chargedKg === 16) {
      totalCost = 92000;
      note = 'Tarif paket 16 kg';
    } else if (chargedKg === 17) {
      totalCost = 99000;
      note = 'Tarif paket 17 kg';
    } else if (chargedKg >= 18 && chargedKg <= 25) {
      totalCost = 100000;
      note = 'Tarif flat paket 18 - 25 kg';
    } else {
      const extraKg = chargedKg - 25;
      totalCost = 100000 + extraKg * 10000;
      note = `Base 25 kg (Rp 100.000) + ${extraKg} kg ekstra (@Rp 10.000/kg)`;
    }

    return { chargedKg, totalCost, note };
  };

  const handleCalculateOngkir = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = selectedDestination || 'Sofifi';

    if (packageType === 'kg') {
      const w = parseFloat(weightInput) || 1;
      const res = calculateTierOngkir(w);
      setCalculatedResult({
        destination: dest,
        type: 'kg',
        inputVal: w,
        chargedKg: res.chargedKg,
        totalCost: res.totalCost,
        note: res.note,
      });
    } else if (packageType === 'karung') {
      const k = Math.max(1, parseInt(karungCount) || 1);
      const totalCost = k * 100000;
      setCalculatedResult({
        destination: dest,
        type: 'karung',
        inputVal: k,
        totalCost,
        note: `${k} Karung @ Rp 100.000 / karung`,
      });
    } else {
      setCalculatedResult({
        destination: dest,
        type: 'besar',
        inputVal: 1,
        totalCost: 0,
        note: 'Barang berukuran besar / kargo khusus (Biaya terpisah)',
      });
    }
  };

  // Generate label text
  const formattedLabelText = `📌Nama: SUN ZILONG (${labelName ? labelName.toUpperCase() : '...'} / ${labelDestination ? labelDestination.toUpperCase() : '...'})TERNATE/SOFIFI
📌Tlp: ${WAREHOUSE_ADDRESS.adminPhone}
📌Alamat: ${WAREHOUSE_ADDRESS.street} (${labelPhone || '...'})
${WAREHOUSE_ADDRESS.subdistrict}
${WAREHOUSE_ADDRESS.district}
Kota: ${WAREHOUSE_ADDRESS.city}
Prov: ${WAREHOUSE_ADDRESS.province}
POS${WAREHOUSE_ADDRESS.postalCode ? ' ' + WAREHOUSE_ADDRESS.postalCode : ''}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(formattedLabelText);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleSendWAQuote = () => {
    if (!calculatedResult) return;
    let detailText = '';
    if (calculatedResult.type === 'kg') {
      detailText = `- Jenis: Timbangan (${calculatedResult.inputVal} kg)\n- Tarif: Rp ${calculatedResult.totalCost.toLocaleString('id-ID')}`;
    } else if (calculatedResult.type === 'karung') {
      detailText = `- Jenis: Karungan (${calculatedResult.inputVal} Karung)\n- Total: Rp ${calculatedResult.totalCost.toLocaleString('id-ID')}`;
    } else {
      detailText = `- Jenis: Barang Berukuran Besar / Dimensi Khusus\n- Keterangan: Konsultasi Biaya Terpisah`;
    }

    const text = `Halo Admin NKExpress, saya mau tanya pengiriman:
- Tujuan: ${calculatedResult.destination}
${detailText}
Mohon info penyerahan paket dan jadwal pengiriman. Terima kasih!`;
    const url = `https://wa.me/628215046568?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="px-4 py-6 max-w-xl mx-auto space-y-6">
      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center justify-center gap-2">
        <Wrench className="w-5 h-5 text-red-600" />
        <span>Alat Bantu Pengiriman</span>
      </h3>

      {/* Sub-Card 1: Cek Ongkir Cepat */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-md">
        <div className="flex items-center justify-between mb-3.5 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
            <Calculator className="w-4.5 h-4.5 text-red-600" />
            <span>Cek Ongkir Cepat</span>
          </div>
          <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full border border-red-200">
            Sofifi • Ternate • Tidore
          </span>
        </div>

        <form onSubmit={handleCalculateOngkir} className="space-y-3.5 text-left">
          {/* Destination dropdown */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Tujuan Pengiriman
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => {
                setSelectedDestination(e.target.value);
                setCalculatedResult(null);
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-red-500 transition-all cursor-pointer font-medium"
            >
              <option value="Sofifi">Sofifi (Ibu Kota Prov. Maluku Utara)</option>
              <option value="Ternate">Ternate (Kota Ternate)</option>
              <option value="Tidore">Tidore (Kota Tidore Kepulauan)</option>
            </select>
          </div>

          {/* Type Selector Tabs */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Jenis Pengiriman
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => {
                  setPackageType('kg');
                  setCalculatedResult(null);
                }}
                className={`py-2 px-1 rounded-lg transition-all cursor-pointer text-center ${
                  packageType === 'kg'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Timbangan (kg)
              </button>
              <button
                type="button"
                onClick={() => {
                  setPackageType('karung');
                  setCalculatedResult(null);
                }}
                className={`py-2 px-1 rounded-lg transition-all cursor-pointer text-center ${
                  packageType === 'karung'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Per Karung
              </button>
              <button
                type="button"
                onClick={() => {
                  setPackageType('besar');
                  setCalculatedResult(null);
                }}
                className={`py-2 px-1 rounded-lg transition-all cursor-pointer text-center ${
                  packageType === 'besar'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ukuran Besar
              </button>
            </div>
          </div>

          {/* Conditional Inputs */}
          {packageType === 'kg' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Berat Paket (kg)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={weightInput}
                onChange={(e) => {
                  setWeightInput(e.target.value);
                  setCalculatedResult(null);
                }}
                placeholder="Masukkan berat, contoh: 5.5"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500 transition-all"
              />
            </div>
          )}

          {packageType === 'karung' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Jumlah Karung (Rp 100.000 / karung)
              </label>
              <input
                type="number"
                min="1"
                value={karungCount}
                onChange={(e) => {
                  setKarungCount(e.target.value);
                  setCalculatedResult(null);
                }}
                placeholder="Jumlah karung (Cth: 1)"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500 transition-all"
              />
            </div>
          )}

          {packageType === 'besar' && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Barang Berukuran Besar / Volume Khusus</p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Untuk kargo berukuran besar (misal: kasur, lemari, sepeda, mesin), biaya dihitung secara terpisah. Klik tombol di bawah untuk konsultasi langsung ke CS.
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-red-500/20 active:scale-[0.99] transition-all cursor-pointer"
          >
            Hitung Ongkir
          </button>
        </form>

        {/* Ongkir Calculation Result */}
        {calculatedResult && (
          <div className="mt-4 pt-3.5 border-t border-slate-200 text-left bg-slate-50 p-3.5 rounded-xl space-y-2 text-xs animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-600 font-medium">Tujuan:</span>
              <span className="font-bold text-slate-900">{calculatedResult.destination}</span>
            </div>

            {calculatedResult.type === 'kg' && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Input Berat:</span>
                  <span className="font-semibold text-slate-800">{calculatedResult.inputVal} kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Kategori Timbangan:</span>
                  <span className="font-semibold text-red-600">{calculatedResult.note}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-slate-900">Total Estimasi Ongkir:</span>
                  <span className="text-base font-extrabold text-red-600">
                    Rp {calculatedResult.totalCost.toLocaleString('id-ID')}
                  </span>
                </div>
              </>
            )}

            {calculatedResult.type === 'karung' && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Jumlah Karung:</span>
                  <span className="font-semibold text-slate-800">{calculatedResult.inputVal} Karung</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Skema Tarif:</span>
                  <span className="font-semibold text-red-600">Rp 100.000 / Karung</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-bold text-slate-900">Total Estimasi Ongkir:</span>
                  <span className="text-base font-extrabold text-red-600">
                    Rp {calculatedResult.totalCost.toLocaleString('id-ID')}
                  </span>
                </div>
              </>
            )}

            {calculatedResult.type === 'besar' && (
              <div className="py-1 text-center">
                <p className="text-amber-800 font-semibold mb-1">Biaya Terpisah Sesuai Ukuran</p>
                <p className="text-[11px] text-slate-600">Silakan hubungi CS untuk pengukuran dan biaya pasti.</p>
              </div>
            )}

            <button
              onClick={handleSendWAQuote}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Tanyakan / Pesan via WhatsApp</span>
            </button>
          </div>
        )}

        {/* Toggleable Official Rate Table */}
        <div className="mt-4 pt-3 border-t border-slate-200 text-left">
          <button
            type="button"
            onClick={() => setShowPriceList(!showPriceList)}
            className="w-full flex items-center justify-between text-xs font-bold text-red-600 hover:text-red-700 p-2 bg-red-50 rounded-xl border border-red-200 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4" />
              <span>Tabel Daftar Tarif Resmi (Sofifi, Ternate, Tidore)</span>
            </span>
            {showPriceList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showPriceList && (
            <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-3 animate-in fade-in duration-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-300 bg-slate-200/60 text-slate-800">
                      <th className="py-1.5 px-2 font-bold">Berat / Kategori</th>
                      <th className="py-1.5 px-2 font-bold text-right">Tarif Ongkir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                    <tr><td className="py-1 px-2">≤ 1 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 20.000</td></tr>
                    <tr><td className="py-1 px-2">2 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 23.000</td></tr>
                    <tr><td className="py-1 px-2">3 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 26.000</td></tr>
                    <tr><td className="py-1 px-2">4 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 29.000</td></tr>
                    <tr><td className="py-1 px-2">5 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 30.000</td></tr>
                    <tr><td className="py-1 px-2">6 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 35.000</td></tr>
                    <tr><td className="py-1 px-2">7 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 40.000</td></tr>
                    <tr><td className="py-1 px-2">8 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 45.000</td></tr>
                    <tr><td className="py-1 px-2">9 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 48.000</td></tr>
                    <tr><td className="py-1 px-2">10 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 50.000</td></tr>
                    <tr><td className="py-1 px-2">11 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 57.000</td></tr>
                    <tr><td className="py-1 px-2">12 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 64.000</td></tr>
                    <tr><td className="py-1 px-2">13 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 71.000</td></tr>
                    <tr><td className="py-1 px-2">14 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 78.000</td></tr>
                    <tr><td className="py-1 px-2">15 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 85.000</td></tr>
                    <tr><td className="py-1 px-2">16 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 92.000</td></tr>
                    <tr><td className="py-1 px-2">17 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">Rp 99.000</td></tr>
                    <tr className="bg-red-50/50"><td className="py-1.5 px-2 font-bold text-red-700">18 - 25 kg</td><td className="py-1.5 px-2 text-right font-bold text-red-700">Rp 100.000</td></tr>
                    <tr><td className="py-1 px-2">&gt; 25 kg</td><td className="py-1 px-2 text-right font-bold text-slate-900">+ Rp 10.000 / kg</td></tr>
                    <tr className="bg-emerald-50/50"><td className="py-1.5 px-2 font-bold text-emerald-800">Per Karung</td><td className="py-1.5 px-2 text-right font-bold text-emerald-800">Rp 100.000 / karung</td></tr>
                    <tr className="bg-amber-50/50"><td className="py-1.5 px-2 font-bold text-amber-800">Barang Ukuran Besar</td><td className="py-1.5 px-2 text-right font-bold text-amber-800">Biaya Terpisah</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sub-Card 2: Buat Label Alamat Jastip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-md">
        <div className="flex items-center gap-2 mb-1 text-slate-900 font-bold text-sm sm:text-base">
          <FileText className="w-4.5 h-4.5 text-red-600" />
          <span>Buat Label Alamat Jastip</span>
        </div>
        <p className="text-[11px] text-slate-500 text-left mb-3.5">
          Isi data diri Anda di bawah, lalu klik Salin Alamat.
        </p>

        <div className="space-y-3 text-left">
          {/* Input Nama */}
          <div>
            <input
              type="text"
              value={labelName}
              onChange={(e) => setLabelName(e.target.value)}
              placeholder="Nama (Cth: Budi)"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          {/* Input Tujuan */}
          <div>
            <input
              type="text"
              value={labelDestination}
              onChange={(e) => setLabelDestination(e.target.value)}
              placeholder="Tujuan (Cth: SOFIFI / TERNATE)"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          {/* Input HP */}
          <div>
            <input
              type="text"
              value={labelPhone}
              onChange={(e) => setLabelPhone(e.target.value)}
              placeholder="HP (Cth: 0812...)"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500 transition-all"
            />
          </div>

          {/* Monospace Address Box */}
          <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 font-mono text-[11px] leading-relaxed text-slate-800 select-all whitespace-pre-line relative overflow-hidden">
            {formattedLabelText}
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyAddress}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Alamat Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Alamat</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
