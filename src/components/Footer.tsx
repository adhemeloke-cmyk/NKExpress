import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { WAREHOUSE_ADDRESS } from '../data/initialData';
import { NkExpressLogo } from './NkExpressLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-10 pb-20 px-4 text-left text-xs text-slate-600">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Logo & Intro */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <NkExpressLogo size="sm" />
            <div>
              <h3 className="text-slate-900 font-extrabold text-base tracking-tight leading-none">
                NKExpress
              </h3>
              <p className="text-[10px] font-bold text-red-600 uppercase mt-0.5">
                TERNATE • SOFIFI • TIDORE
              </p>
            </div>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed max-w-md">
            Solusi pengiriman barang cepat, murah, dan aman rute Ternate, Sofifi, dan Tidore. Jastip resmi Shopee & TikTok Shop.
          </p>
        </div>

        {/* Lokasi Layanan */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            LOKASI LAYANAN
          </h4>
          <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-700">
            <p className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              Ternate
            </p>
            <p className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              Sofifi
            </p>
            <p className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              Tidore
            </p>
          </div>
        </div>

        {/* Hubungi Kami */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            HUBUNGI KAMI
          </h4>
          <div className="space-y-1.5 text-[11px] text-slate-700">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>CS WhatsApp: <strong className="text-emerald-700">08215046568</strong></span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
              <span>Gudang: Depan Panti Jompo Himo Himo Ubo Ubo, Jalan Lapangan, Bengkel Mobil, Pagar Seng, Samping Citra Wijaya Meubel Somel, RT 013 / RW 004, Ternate Selatan, Kota Ternate, Maluku Utara</span>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
          <p>© {new Date().getFullYear()} NKExpress. All rights reserved.</p>
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <ShieldCheck className="w-3 h-3 text-red-600" /> Pengiriman Cepat & Resmi
          </span>
        </div>
      </div>
    </footer>
  );
};
