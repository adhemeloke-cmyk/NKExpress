import React from 'react';
import { ClipboardList, Warehouse, Scale, Ship, MapPin } from 'lucide-react';

export const CaraMengirim: React.FC = () => {
  const steps = [
    {
      stepNumber: 1,
      title: 'Antar ke Gudang',
      description: 'Serahkan paket ke gudang kami di Ternate. Pastikan packing aman',
      icon: Warehouse,
    },
    {
      stepNumber: 2,
      title: 'Input & Timbang',
      description: 'Admin akan menimbang, mengukur volume, dan menginput data ke sistem.',
      icon: Scale,
    },
    {
      stepNumber: 3,
      title: 'Muat ke Kapal',
      description: 'Paket dimasukkan ke karung manifest dan dimuat ke kapal sesuai jadwal.',
      icon: Ship,
    },
    {
      stepNumber: 4,
      title: 'Ambil di Tujuan',
      description: 'Tunggu notifikasi WA. Paket siap diambil di agen cabang tujuan.',
      icon: MapPin,
    },
  ];

  return (
    <section className="px-4 py-6 max-w-xl mx-auto text-left">
      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center justify-center gap-2 mb-5">
        <ClipboardList className="w-5 h-5 text-red-600" />
        <span>Cara Mengirim Paket</span>
      </h3>

      {/* 4 Steps Stack */}
      <div className="space-y-3.5">
        {steps.map((s) => {
          const IconComp = s.icon;
          return (
            <div
              key={s.stepNumber}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-3.5 shadow-xs hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Step Badge */}
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                {s.stepNumber}
              </div>

              {/* Step Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-extrabold text-slate-900 mb-0.5 flex items-center gap-1.5">
                  <span>{s.title}</span>
                  <IconComp className="w-3.5 h-3.5 text-red-600" />
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
