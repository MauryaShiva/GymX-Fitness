import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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

  const pageTransition = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen flex flex-col pt-safe pb-16 md:pb-0">
      {/* Top Navigation */}
      <Navbar />

      {/* PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-4 right-4 md:left-auto md:right-4 z-50 bg-surface border border-primary p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
               <img src="/gym-icon.png" alt="App Icon" className="w-10 h-10 rounded-lg" />
               <div className="flex flex-col">
                 <span className="font-bold text-sm text-text-primary">Install GymX</span>
                 <span className="text-xs text-text-secondary">For a better mobile experience</span>
               </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInstallBanner(false)}
                className="px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary"
              >
                Later
              </button>
              <button
                onClick={handleInstallClick}
                className="px-4 py-1.5 text-xs font-bold bg-primary text-white rounded-lg shadow hover:bg-primary-dark transition-colors"
              >
                Install
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-4 md:py-6 mt-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<motion.div {...pageTransition}><Home /></motion.div>} />
            <Route path="/exercise/:id" element={<motion.div {...pageTransition}><ExerciseDetail /></motion.div>} />
            <Route path="/home-workouts" element={<motion.div {...pageTransition}><HomeWorkouts /></motion.div>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNav />
    </div>
  );
};

export default App;
