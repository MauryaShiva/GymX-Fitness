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

  return (
    <div className="App bg-background text-text-primary min-h-screen flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-safe-top mt-16 md:mt-20 pb-20 md:pb-6 relative w-full overflow-x-hidden">
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

      {/* Optional: Simple Install Banner if deferredPrompt exists */}
      {/*
      {deferredPrompt && (
        <div className="fixed bottom-20 left-4 right-4 bg-surface p-4 rounded-xl shadow-2xl z-50 flex justify-between items-center border border-gray-800 md:hidden">
          <span className="text-sm">Install GymX for a better experience!</span>
          <button
            onClick={() => deferredPrompt.prompt()}
            className="bg-primary text-background px-4 py-2 rounded-full text-sm font-bold"
          >
            Install
          </button>
        </div>
      )}
      */}
    </div>
  );
};

export default App;