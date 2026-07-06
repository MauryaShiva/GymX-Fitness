import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import MobileSearchOverlay from "./components/MobileSearchOverlay";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";

const App = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener('open-mobile-search', handleOpenSearch);

    // PWA Install Prompt Logic
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('open-mobile-search', handleOpenSearch);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen flex flex-col">
      {/* Top Navigation (Sticky) */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-[72px] md:pt-[88px] pb-20 md:pb-0 safe-area-layout">
        {/* PWA Install Banner */}
        {deferredPrompt && (
          <div className="bg-surface border-b border-gray-800 px-4 py-3 flex justify-between items-center z-40 relative">
            <span className="text-sm font-medium text-gray-200">Install GymX for a better experience</span>
            <button
              onClick={handleInstallClick}
              className="bg-primary text-background px-4 py-1.5 rounded-full text-sm font-bold shadow-lg"
            >
              Install App
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section (Hidden on mobile when BottomNav is present to save space) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile-only Bottom Navigation */}
      <BottomNav />

      {/* Full Screen Mobile Search Overlay */}
      <MobileSearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default App;
