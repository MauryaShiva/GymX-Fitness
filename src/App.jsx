import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";

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
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="App bg-black text-white min-h-screen pb-16 md:pb-0">
      {/* Top Navigation for Desktop */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto md:px-8 min-h-screen pt-0 md:pt-safe-top">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Bottom Navigation for Mobile */}
      <BottomNav />

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed bottom-20 left-4 right-4 bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-2xl z-50 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-3">
            <img src="/gym-icon.png" alt="App Icon" className="w-10 h-10 rounded-lg" />
            <div>
              <p className="font-semibold text-white text-sm">Install GymX</p>
              <p className="text-gray-400 text-xs">Add to Home Screen</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInstallBanner(false)}
              className="text-gray-400 text-sm px-2 py-1"
            >
              Later
            </button>
            <button
              onClick={handleInstallClick}
              className="bg-red-600 text-white text-sm px-4 py-1.5 rounded-full font-medium"
            >
              Install
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
