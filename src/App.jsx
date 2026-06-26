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

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen-safe flex flex-col font-sans selection:bg-primary selection:text-black pt-safe">
      {/* Top Navigation (Hidden on small mobile if desired, handled in Navbar) */}
      <Navbar />

      {/* Optional Install Banner for PWA */}
      <AnimatePresence>
        {deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-4 right-4 md:left-auto md:right-8 z-50 bg-surface border border-primary/20 p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4"
          >
            <div>
              <p className="font-bold text-sm">Install GymX App</p>
              <p className="text-xs text-text-secondary">Get the native experience</p>
            </div>
            <button
              onClick={handleInstallClick}
              className="bg-primary text-black px-4 py-2 rounded-full text-sm font-bold active:scale-95 transition-transform"
            >
              Install
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Page Transitions */}
      {/* Added pt-20 to account for fixed Navbar, and pb-20 on mobile for BottomNav */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-24 md:pb-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section (Hidden on mobile via Footer CSS or layout padding handles it) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default App;
