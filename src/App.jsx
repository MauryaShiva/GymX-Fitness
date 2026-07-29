import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";
import BottomNav from "./components/BottomNav.jsx";

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
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  return (
    // Updated background color to use CSS variable for dark theme
    <div className="App bg-background text-text-primary min-h-screen pb-[70px] md:pb-0">
      {/* Top Navigation */}
      <Navbar />

      {showInstallBanner && (
        <div className="fixed top-20 left-4 right-4 z-40 bg-surface border border-gray-700 rounded-lg p-4 shadow-xl flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-text-primary">Install GymX</h3>
            <p className="text-sm text-text-secondary">Get the full app experience</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInstallBanner(false)}
              className="px-3 py-1 text-text-secondary hover:text-white"
            >
              Later
            </button>
            <button
              onClick={handleInstallClick}
              className="px-4 py-1 bg-primary text-background font-bold rounded-full"
            >
              Install
            </button>
          </div>
        </div>
      )}

      {/* Main Content with Page Transitions */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 pt-24 md:pt-28 min-h-screen mt-safe-top">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/exercise/:id"
              element={
                <PageTransition>
                  <ExerciseDetail />
                </PageTransition>
              }
            />
            <Route
              path="/home-workouts"
              element={
                <PageTransition>
                  <HomeWorkouts />
                </PageTransition>
              }
            />
            {/* Fallback routes for bottom nav items to avoid 404s for now */}
            <Route
              path="/favorites"
              element={
                <PageTransition>
                  <div className="flex items-center justify-center min-h-[50vh]">
                    <h2 className="text-2xl font-bold">Favorites Coming Soon</h2>
                  </div>
                </PageTransition>
              }
            />
            <Route
              path="/profile"
              element={
                <PageTransition>
                  <div className="flex items-center justify-center min-h-[50vh]">
                    <h2 className="text-2xl font-bold">Profile Coming Soon</h2>
                  </div>
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Footer Section - Hide on mobile since we have bottom nav */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

// Reusable Page Transition Wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default App;
