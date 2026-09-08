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
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen flex flex-col pt-safe-top pb-safe overflow-x-hidden">
      {/* Top Navigation (Sticky) */}
      <Navbar />

      {/* Main Content with Page Transitions */}
      <main className="flex-grow w-full max-w-7xl mx-auto md:px-8 pb-20 md:pb-6 relative z-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Custom PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 bg-surface border border-border p-4 rounded-xl shadow-2xl z-50 flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold text-text-primary">Install GymX</h4>
              <p className="text-sm text-text-secondary">Get the full app experience</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInstallBanner(false)}
                className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary"
              >
                Later
              </button>
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-hover"
              >
                Install
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Section (Hidden on mobile to save space for BottomNav) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default App;
