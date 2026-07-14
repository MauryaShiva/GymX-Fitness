import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";

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
    <div className="App bg-background text-text-primary min-h-screen font-sans antialiased overflow-x-hidden relative">
      {/* Top Navigation for Desktop, sticky top for mobile */}
      <Navbar />

      {/* PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-[72px] left-4 right-4 z-40 bg-surface/90 backdrop-blur-md border border-primary/30 p-4 rounded-2xl shadow-2xl flex items-center justify-between mt-safe-top md:hidden"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-xl text-primary">
                <Download size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">Install GymX</p>
                <p className="text-xs text-text-secondary">For a better mobile experience</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInstallBanner(false)}
                className="text-xs font-medium text-text-secondary px-3 py-2"
              >
                Later
              </button>
              <button
                onClick={handleInstallClick}
                className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-primary/20"
              >
                Install
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Page Transitions */}
      <main className="w-full min-h-screen pb-safe">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Footer Section (Desktop primarily, hidden behind BottomNav on mobile) */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default App;
