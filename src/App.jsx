import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";
import BottomNav from "./components/BottomNav.jsx";

const App = () => {
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
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
        setShowInstallBanner(false);
      }
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen pb-safe">
      {/* Top Navigation for Desktop/Tablet */}
      <Navbar />

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-surface/90 backdrop-blur-md border border-gray-700 px-4 py-2 rounded-full shadow-lg flex items-center gap-4">
          <span className="text-sm font-medium">Install GymX App</span>
          <button
            onClick={handleInstallClick}
            className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-primary-dark transition-colors"
          >
            Install
          </button>
          <button
            onClick={() => setShowInstallBanner(false)}
            className="text-gray-400 hover:text-white"
          >
            &times;
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-safe-top pt-20 md:pt-24 pb-24 md:pb-6 min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section - Hidden on mobile where BottomNav is shown */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default App;
