import React from 'react';
import { MessageSquare, Bot, LayoutGrid, PhoneCall } from 'lucide-react';

interface FloatingButtonsProps {
  onOpenAIChat: () => void;
  onOpenQuickMenu: () => void;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onOpenAIChat, onOpenQuickMenu }) => {
  const handleOpenWA = () => {
    const text = 'Halo Admin NKExpress, saya mau tanya pengiriman Jastip & Paket rute Ternate - Sofifi - Tidore.';
    const url = `https://wa.me/628215046568?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
      {/* WhatsApp Green Button */}
      <button
        onClick={handleOpenWA}
        title="Chat WhatsApp CS"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 active:scale-90 transition-all cursor-pointer group"
      >
        <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </button>

      {/* Grid Quick Menu Button */}
      <button
        onClick={onOpenQuickMenu}
        title="Quick Menu & Lokasi"
        className="w-11 h-11 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center shadow-lg active:scale-90 transition-all cursor-pointer"
      >
        <LayoutGrid className="w-4.5 h-4.5" />
      </button>

      {/* AI Assistant Blue Button */}
      <button
        onClick={onOpenAIChat}
        title="Asisten AI NKExpress"
        className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white flex items-center justify-center shadow-xl shadow-red-500/30 active:scale-90 transition-all cursor-pointer group relative"
      >
        <Bot className="w-5.5 h-5.5 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
      </button>
    </div>
  );
};
