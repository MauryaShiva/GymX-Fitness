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

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    await deferredPrompt.userChoice;

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  return (
    <div className="App bg-[#fffafb] min-h-safe pb-16 md:pb-0 pt-0 md:pt-20 relative">
      {/* PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && (
          <div className="fixed top-14 md:top-20 left-0 right-0 z-[60] bg-red-600 text-white px-4 py-3 flex items-center justify-between shadow-lg">
            <span className="font-medium text-sm md:text-base">Add GymX to your Home Screen</span>
            <div className="flex gap-3">
              <button
                onClick={() => setShowInstallBanner(false)}
                className="text-white/80 hover:text-white text-sm"
              >
                Later
              </button>
              <button
                onClick={handleInstallClick}
                className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold active:scale-95 transition-transform"
              >
                Install
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Top Navigation for Desktop */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-0 sm:px-4 md:px-8 w-full mt-14 md:mt-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section (Hidden on mobile to avoid clashing with bottom nav) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNav />
    </div>
  );
};

export default App;
