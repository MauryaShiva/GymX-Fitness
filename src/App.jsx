import React, { useEffect, useState } from "react";
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

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen flex flex-col pt-safe-top pb-16 md:pb-0">
      {/* Top Navigation */}
      <Navbar />

      {showInstallBanner && (
        <div className="bg-primary text-background px-4 py-2 flex justify-between items-center z-40 fixed top-16 md:top-20 w-full shadow-md">
          <span className="text-sm font-medium">Install GymX for a better experience!</span>
          <button
            onClick={handleInstallClick}
            className="bg-background text-primary px-3 py-1 rounded-full text-xs font-bold hover:bg-gray-800"
          >
            Install
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto md:px-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/exercise/:id"
              element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExerciseDetail />
                </motion.div>
              }
            />
            <Route
              path="/home-workouts"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <HomeWorkouts />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Bottom Navigation for Mobile */}
      <BottomNav />
    </div>
  );
};

export default App;
