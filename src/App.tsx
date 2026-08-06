import React, { useState, useEffect } from 'react';
import { PackageData, ShipSchedule, OngkirRate } from './types';
import { INITIAL_PACKAGES, INITIAL_SCHEDULES, INITIAL_RATES } from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrackingModal } from './components/TrackingModal';
import { JadwalKapal } from './components/JadwalKapal';
import { AlatBantuPengiriman } from './components/AlatBantuPengiriman';
import { CaraMengirim } from './components/CaraMengirim';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { StaffModal } from './components/StaffModal';
import { AIChatModal } from './components/AIChatModal';
import { QuickMenuModal } from './components/QuickMenuModal';

export default function App() {
  // State for package data & tracking search with localStorage persistence
  const [packages, setPackages] = useState<PackageData[]>(() => {
    const saved = localStorage.getItem('nk_packages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved packages', e);
      }
    }
    return INITIAL_PACKAGES;
  });

  useEffect(() => {
    localStorage.setItem('nk_packages', JSON.stringify(packages));
  }, [packages]);

  const [searchedResi, setSearchedResi] = useState<string>('');
  const [foundPackage, setFoundPackage] = useState<PackageData | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  // State for ship schedules with localStorage persistence
  const [schedules, setSchedules] = useState<ShipSchedule[]>(() => {
    const saved = localStorage.getItem('nk_schedules');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved schedules', e);
      }
    }
    return INITIAL_SCHEDULES;
  });

  useEffect(() => {
    localStorage.setItem('nk_schedules', JSON.stringify(schedules));
  }, [schedules]);

  // State for rates
  const [rates] = useState<OngkirRate[]>(INITIAL_RATES);

  // Modals state
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isLoggedInStaff, setIsLoggedInStaff] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  // Handle Search Resi
  const handleSearchResi = (query: string) => {
    setSearchedResi(query);
    const cleanQuery = query.trim().toLowerCase();
    
    // Find match by resi code or receiver name
    const match = packages.find(
      (p) =>
        p.resi.toLowerCase() === cleanQuery ||
        p.receiverName.toLowerCase().includes(cleanQuery)
    );

    setFoundPackage(match || null);
    setIsTrackingModalOpen(true);
  };

  // Staff Actions
  const handleAddPackage = (newPkg: PackageData) => {
    setPackages((prev) => [newPkg, ...prev]);
  };

  const handleUpdatePackageStatus = (
    resi: string,
    newStatus: PackageData['status'],
    newLoc: string
  ) => {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.resi === resi) {
          const updatedHistory = [
            ...p.history,
            {
              timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
              status: newStatus,
              location: newLoc,
              description: `Status diperbarui menjadi: ${newStatus}`,
            },
          ];
          return {
            ...p,
            status: newStatus,
            currentLocation: newLoc,
            history: updatedHistory,
          };
        }
        return p;
      })
    );
  };

  const handleAddSchedule = (newSched: ShipSchedule) => {
    setSchedules((prev) => [newSched, ...prev]);
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  const sampleResis = packages.slice(0, 3).map((p) => p.resi);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-red-500 selection:text-white">
      {/* Top Navbar Header */}
      <Navbar
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
        isLoggedInStaff={isLoggedInStaff}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {/* Hero Section with Tracking Card */}
        <HeroSection
          onSearchResi={handleSearchResi}
          sampleResis={sampleResis}
        />

        {/* Jadwal Kapal Terbaru */}
        <JadwalKapal
          schedules={schedules}
          onRefresh={() => {
            // Optional refresh logic
          }}
        />

        {/* Alat Bantu Pengiriman (Cek Ongkir + Label Alamat Jastip) */}
        <AlatBantuPengiriman rates={rates} />

        {/* Cara Mengirim Paket (4 Steps) */}
        <CaraMengirim />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons (WhatsApp, Quick Menu, AI Chat) */}
      <FloatingButtons
        onOpenAIChat={() => setIsAIChatOpen(true)}
        onOpenQuickMenu={() => setIsQuickMenuOpen(true)}
      />

      {/* Tracking Modal */}
      {isTrackingModalOpen && (
        <TrackingModal
          packageData={foundPackage}
          searchedResi={searchedResi}
          onClose={() => setIsTrackingModalOpen(false)}
        />
      )}

      {/* Staff Admin Dashboard Modal */}
      <StaffModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        isLoggedIn={isLoggedInStaff}
        onLoginSuccess={() => setIsLoggedInStaff(true)}
        onLogout={() => setIsLoggedInStaff(false)}
        packages={packages}
        onAddPackage={handleAddPackage}
        onUpdatePackageStatus={handleUpdatePackageStatus}
        schedules={schedules}
        onAddSchedule={handleAddSchedule}
        onDeleteSchedule={handleDeleteSchedule}
      />

      {/* AI Assistant Chat Modal */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />

      {/* Quick Menu & Warehouse Location Modal */}
      <QuickMenuModal
        isOpen={isQuickMenuOpen}
        onClose={() => setIsQuickMenuOpen(false)}
      />
    </div>
  );
}
