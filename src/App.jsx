import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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
        console.log("User accepted the install prompt");
      }
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen pb-safe">
      {/* Top Navigation (Hidden on small screens or used concurrently based on design) */}
      <Navbar />

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed top-20 left-0 right-0 z-[60] px-4 flex justify-center">
          <div className="bg-surface/90 backdrop-blur-md shadow-lg rounded-full px-6 py-3 flex items-center justify-between w-full max-w-md border border-gray-800">
            <span className="text-sm font-medium">Install GymX App</span>
            <button
              onClick={handleInstallClick}
              className="bg-primary text-background px-4 py-1.5 rounded-full text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              Install
            </button>
          </div>
        </div>
      )}

      {/* Main Content with Page Transitions */}
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-safe-top pt-20 md:pt-24 pb-20 md:pb-6 min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default App;
