import React, { useState } from 'react';
import { Search, MapPin, Package, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onSearchResi: (resi: string) => void;
  sampleResis: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchResi, sampleResis }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchResi(searchInput.trim());
    }
  };

  const handleQuickSample = (resi: string) => {
    setSearchInput(resi);
    onSearchResi(resi);
  };

  return (
    <section className="px-4 pt-6 pb-8 text-center max-w-xl mx-auto">
      {/* Badge Pill */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-[11px] font-bold tracking-wider uppercase mb-5 shadow-xs">
        <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
        <span>EKSPEDISI NKEXPRESS TERNATE - SOFIFI</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
        Kirim Paket Cepat <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-700">
          Ternate ke Sofifi
        </span>
      </h2>

      {/* Paragraph Subtitle */}
      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-6 font-normal">
        Solusi Jastip Shopee & TikTok tanpa pusing ongkir mahal. Layanan pengiriman resmi, cepat, aman, dan transparan.
      </p>

      {/* Tracking Card Box */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xl shadow-slate-200/80 relative overflow-hidden">
        {/* Soft color accent decoration */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Masukkan Nomor Resi / Nama Penerima..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-red-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span>Lacak Paket</span>
          </button>
        </form>

        {/* Quick Sample Resis */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 text-left">
          <p className="text-[11px] text-slate-500 mb-1.5 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Contoh Resi Aktif (Klik untuk coba):</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sampleResis.map((resi) => (
              <button
                key={resi}
                type="button"
                onClick={() => handleQuickSample(resi)}
                className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all flex items-center gap-1"
              >
                <span>{resi}</span>
                <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
