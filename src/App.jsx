import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

import "./App.css";

import Navbar from "./components/Navbar";
import MobileHeader from "./components/MobileHeader";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";

const App = () => {
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      }
    }
  };

  return (
    // Updated background to match the dark theme and full height layout
    <div className="App bg-black min-h-screen flex flex-col text-white selection:bg-red-500 selection:text-white">
      {/* Desktop Navigation */}
      <Navbar />

      {/* Mobile Header */}
      <MobileHeader />

      {/* PWA Install Banner */}
      {showInstallPrompt && (
        <div className="bg-red-600 text-white px-4 py-3 flex justify-between items-center sticky top-0 md:top-[72px] z-50">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5" />
            <div className="text-sm">
              <p className="font-bold">Install GymX</p>
              <p className="text-red-100 text-xs">For a better experience</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="px-3 py-1 text-sm bg-red-700 hover:bg-red-800 rounded-md transition-colors"
            >
              Later
            </button>
            <button
              onClick={handleInstallClick}
              className="px-3 py-1 text-sm bg-white text-red-600 font-bold rounded-md hover:bg-gray-100 transition-colors"
            >
              Install
            </button>
          </div>
        </div>
      )}

      {/* Main Content with bottom padding for mobile navigation */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 pb-24 md:pb-6 relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default App;
