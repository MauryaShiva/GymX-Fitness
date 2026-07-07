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
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
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
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <div className="App bg-gray-950 min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Navbar />

      {/* Install Banner (PWA) */}
      {showInstallBanner && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-red-600 text-white px-4 py-3 flex justify-between items-center shadow-lg">
          <span className="text-sm font-medium">Install GymX for a better experience!</span>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1 bg-white text-red-600 font-bold rounded-md text-sm"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="px-3 py-1 bg-red-800 text-white rounded-md text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {/* Add pb-20 on mobile to avoid overlapping with BottomNav */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex-1 w-full pb-20 md:pb-6 pt-safe-top">
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

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default App;
