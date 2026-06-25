import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import MobileHeader from "./components/MobileHeader";
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
      e.preventDefault();
      setDeferredPrompt(e);
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

  const pageTransition = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3, ease: "easeInOut" }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen pb-nav-safe md:pb-0 pt-header-safe md:pt-20">
      {/* Install Banner */}
      {showInstallBanner && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-primary text-background px-4 py-2 flex justify-between items-center text-sm font-medium">
          <span>Install GymX for a better experience!</span>
          <div className="flex gap-2">
            <button onClick={handleInstallClick} className="bg-background text-primary px-3 py-1 rounded-md">Install</button>
            <button onClick={() => setShowInstallBanner(false)} className="text-background underline">Dismiss</button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar />
      <MobileHeader />

      {/* Main Content with Route Transitions */}
      <main className="max-w-7xl mx-auto px-0 md:px-8 w-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div {...pageTransition}>
                <Home />
              </motion.div>
            } />
            <Route path="/exercise/:id" element={
              <motion.div {...pageTransition}>
                <ExerciseDetail />
              </motion.div>
            } />
            <Route path="/home-workouts" element={
              <motion.div {...pageTransition}>
                <HomeWorkouts />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default App;
