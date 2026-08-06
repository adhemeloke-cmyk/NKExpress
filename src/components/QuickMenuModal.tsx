import React from 'react';
import { X, MapPin, Phone, ShieldCheck, HelpCircle, FileText } from 'lucide-react';
import { WAREHOUSE_ADDRESS } from '../data/initialData';

interface QuickMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickMenuModal: React.FC<QuickMenuModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-5 text-left text-slate-800 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-red-600" />
          <span>Lokasi Gudang & Agen</span>
        </h3>

        <div className="space-y-3 text-xs">
          {/* Gudang Ternate Box */}
          <div className="bg-slate-50 border border-red-200 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Gudang & Pos Utama Ternate</span>
            <h4 className="font-bold text-slate-900 text-sm mt-0.5">{WAREHOUSE_ADDRESS.name}</h4>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Depan Panti Jompo Himo Himo Ubo Ubo, Jalan Lapangan, Bengkel Mobil, Pagar Seng, Samping Citra Wijaya Meubel Somel, RT 013 / RW 004, Ternate Selatan, Kota Ternate
            </p>
            <p className="text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
              <Phone className="w-3 h-3" />
              CS WhatsApp: 08215046568
            </p>
          </div>

          {/* Lokasi Layanan */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lokasi Layanan Rute Utama</span>
            <ul className="space-y-1 text-slate-700">
              <li className="flex items-center justify-between">
                <span>📍 Ternate</span>
                <span className="text-emerald-700 text-[10px] font-semibold">Gudang Utama</span>
              </li>
              <li className="flex items-center justify-between">
                <span>📍 Sofifi</span>
                <span className="text-slate-500 text-[10px]">Pusat Kota Sofifi</span>
              </li>
              <li className="flex items-center justify-between">
                <span>📍 Tidore</span>
                <span className="text-slate-500 text-[10px]">Tidore Kepulauan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
