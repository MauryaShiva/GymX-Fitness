import React from "react";
import { Route, Routes } from "react-router-dom";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";
import BottomNav from "./components/BottomNav";

const App = () => {
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI to notify the user they can add to home screen
      setShowInstallBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallBanner(false);
      });
    }
  };

  return (
    <div className="App bg-[#fffafb] pb-16 md:pb-0">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4 pt-20 md:py-6 md:pt-24 min-h-screen pt-safe">
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

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed top-20 md:top-24 left-1/2 transform -translate-x-1/2 z-[100] w-[90%] max-w-md bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col">
            <span className="font-bold text-sm">Install GymX</span>
            <span className="text-xs text-gray-300">Add to home screen for a better experience</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInstallBanner(false)}
              className="px-3 py-1.5 text-xs text-gray-300 hover:text-white"
            >
              Later
            </button>
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors"
            >
              Install
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
