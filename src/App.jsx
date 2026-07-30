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
      console.log(`User response to the install prompt: ${outcome}`);
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <div className="App bg-background text-white min-h-screen flex flex-col pb-safe pt-safe-top">
      {/* Top Navigation (Desktop mostly, sticky on mobile) */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-4 md:py-6 pt-20 md:pt-24 pb-24 md:pb-6">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/exercise/:id" element={<PageTransition><ExerciseDetail /></PageTransition>} />
            <Route path="/home-workouts" element={<PageTransition><HomeWorkouts /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section (Desktop) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden">
        <BottomNav />
      </div>

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 bg-gray-800 text-white p-4 rounded-xl shadow-2xl border border-gray-700 z-50 flex items-center justify-between backdrop-blur-md bg-opacity-90">
          <div className="flex items-center gap-3">
            <img src="/gym-icon.png" alt="GymX App" className="w-10 h-10 rounded-md" />
            <div className="text-sm">
              <p className="font-bold">Install GymX App</p>
              <p className="text-gray-400 text-xs">For a better experience</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInstallBanner(false)}
              className="px-3 py-1 text-sm font-medium text-gray-300 hover:text-white"
            >
              Later
            </button>
            <button
              onClick={handleInstallClick}
              className="px-4 py-1 text-sm font-bold bg-primary text-white rounded-full hover:bg-red-600 transition-colors"
            >
              Install
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

export default App;