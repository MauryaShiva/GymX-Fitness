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
import MobileSearchOverlay from "./components/MobileSearchOverlay";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      });
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen pb-safe">
      {/* Top Navigation */}
      <Navbar />

      {/* PWA Install Prompt Banner */}
      <AnimatePresence>
        {showInstallPrompt && (
          <div className="fixed top-20 left-4 right-4 z-50 bg-surface/95 backdrop-blur-md border border-gray-700 rounded-xl p-4 shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/gym-icon-192.png" alt="GymX Icon" className="w-10 h-10 rounded-lg" />
              <div>
                <p className="font-semibold text-white text-sm">Install GymX</p>
                <p className="text-gray-400 text-xs">Add to home screen</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowInstallPrompt(false)} className="px-3 py-1.5 text-xs text-gray-400 font-medium">Later</button>
              <button onClick={handleInstallClick} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors">Install</button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="w-full mx-auto min-h-screen pt-20 pb-20 lg:pt-24 md:pb-0">
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

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay />
    </div>
  );
};

export default App;
