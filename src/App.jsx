import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
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
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <div className="App bg-background text-white min-h-screen flex flex-col">
      {/* PWA Install Banner */}
      {deferredPrompt && (
        <div className="bg-red-600 text-white p-3 text-center flex justify-between items-center fixed top-safe left-0 right-0 z-[60] pt-safe">
          <span className="text-sm font-medium">Install GymX for a better experience</span>
          <button
            onClick={handleInstallClick}
            className="bg-white text-red-600 px-4 py-1 rounded-full text-sm font-bold shadow-sm"
          >
            Install
          </button>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto pt-safe pb-24 md:pb-safe pt-20 md:pt-24 px-4 md:px-8">
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

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default App;
