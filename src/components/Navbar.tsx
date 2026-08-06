import React from 'react';
import { UserCheck, Anchor } from 'lucide-react';
import { NkExpressLogo } from './NkExpressLogo';

interface NavbarProps {
  onOpenStaffModal: () => void;
  isLoggedInStaff: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStaffModal, isLoggedInStaff }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-3 shadow-xs">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {/* Brand logo & title */}
        <div className="flex items-center gap-3">
          <NkExpressLogo size="md" />
          <div>
            <h1 className="text-slate-900 font-extrabold text-base tracking-tight leading-none flex items-center gap-1.5">
              NKExpress
            </h1>
            <p className="text-[10px] font-bold text-red-600 tracking-wider uppercase mt-0.5">
              TERNATE • SOFIFI • TIDORE
            </p>
          </div>
        </div>

        {/* Staff Login Button */}
        <button
          onClick={onOpenStaffModal}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all border ${
            isLoggedInStaff
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
              : 'bg-white border-slate-300 text-slate-700 hover:border-red-500 hover:text-red-600 hover:bg-red-50/50 shadow-xs'
          }`}
        >
          {isLoggedInStaff ? (
            <>
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Staff Active</span>
            </>
          ) : (
            <>
              <Anchor className="w-3.5 h-3.5 text-red-500" />
              <span>Login Staff</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
