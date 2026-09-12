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
      // Optionally show your custom install banner
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

  const handleDismissBanner = () => {
    setShowInstallBanner(false);
  };

  // Page Transition variants
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3
  };

  return (
    <div className="App min-h-screen bg-background text-text-primary flex flex-col font-sans">
      {/* Top Navigation (Sticky) */}
      <Navbar />

      {/* Main Content with Safe Area Paddings */}
      <main className="flex-grow pt-safe-top pb-safe px-4 md:px-8 py-4 md:py-6 mt-[72px] mb-[72px] md:mb-0 relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/exercise/:id"
              element={
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                  <ExerciseDetail />
                </motion.div>
              }
            />
            <Route
              path="/home-workouts"
              element={
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                  <HomeWorkouts />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer (Hidden on Mobile, shown on Desktop) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Navigation (Shown on Mobile, hidden on Desktop) */}
      <BottomNav />

      {/* Custom PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-[90px] md:bottom-4 left-4 right-4 md:left-auto md:right-4 bg-surface border border-gray-700 p-4 rounded-xl shadow-2xl z-[60] flex flex-col sm:flex-row items-center gap-4 max-w-sm ml-auto mr-auto"
          >
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">Install GymX</h3>
              <p className="text-text-secondary text-sm">Add to home screen for a better experience.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto mt-3 sm:mt-0">
              <button
                onClick={handleDismissBanner}
                className="flex-1 sm:flex-none px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition"
              >
                Later
              </button>
              <button
                onClick={handleInstallClick}
                className="flex-1 sm:flex-none px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:bg-primary-dark transition shadow-[0_0_10px_rgba(3,218,198,0.3)]"
              >
                Install
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
