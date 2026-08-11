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
    <div className="App bg-background min-h-screen pb-safe">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content with Page Transitions */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20 md:pb-6 min-h-screen-safe">
        {deferredPrompt && (
          <div className="bg-surface border border-primary p-4 rounded-lg mb-6 flex justify-between items-center shadow-lg">
            <div>
              <h3 className="text-text-primary font-bold">Install GymX</h3>
              <p className="text-text-secondary text-sm">Add to home screen for a better experience</p>
            </div>
            <button
              onClick={handleInstallClick}
              className="bg-primary text-white px-4 py-2 rounded-full font-bold shadow-md hover:bg-red-600 transition-colors"
            >
              Install
            </button>
          </div>
        )}
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

      {/* Bottom Navigation for Mobile */}
      <BottomNav />
    </div>
  );
};

export default App;
