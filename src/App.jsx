import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import MobileSearchOverlay from "./components/MobileSearchOverlay";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";
import PageTransition from "./components/PageTransition.jsx";

const App = () => {
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Intercept PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // In a real app, you would show a custom modal/banner here using `deferredPrompt.prompt()`
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <div className="App bg-[#121212] min-h-screen overflow-x-hidden">
      {/* Top Navigation (Desktop) & Sticky Header (Mobile) */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-24 pb-24 md:pb-6 min-h-screen text-white relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/exercise/:id" element={<PageTransition><ExerciseDetail /></PageTransition>} />
            <Route path="/home-workouts" element={<PageTransition><HomeWorkouts /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Mobile Search Overlay */}
      <MobileSearchOverlay />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Footer Section (Desktop mainly) */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default App;
