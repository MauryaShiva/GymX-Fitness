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
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowInstallBtn(true);
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
        setShowInstallBtn(false);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen pb-16 md:pb-0">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content with Route Transitions */}
      <main className="w-full mx-auto px-4 md:px-8 py-4 md:py-6 pt-20 md:pt-24 min-h-[calc(100vh-64px)] max-w-[1440px]">
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <HomeWorkouts />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Install App Banner */}
      <AnimatePresence>
        {showInstallBtn && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 md:bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-surface border border-border p-4 rounded-xl shadow-2xl z-50 flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-text-primary">Install GymX App</p>
              <p className="text-sm text-text-secondary">Get the native experience!</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInstallBtn(false)}
                className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary"
              >
                Later
              </button>
              <button
                onClick={handleInstallClick}
                className="px-4 py-1.5 text-sm font-bold bg-primary text-white rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-colors"
              >
                Install
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Section */}
      <Footer />

      {/* Bottom Navigation for Mobile */}
      <BottomNav />
    </div>
  );
};

export default App;
