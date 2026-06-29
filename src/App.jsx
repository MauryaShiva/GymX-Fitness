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
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowInstallBanner(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen pb-16 md:pb-0">
      {/* Top Navigation */}
      <Navbar />

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 bg-surface text-white p-4 rounded-xl shadow-2xl z-50 flex justify-between items-center border border-gray-700">
          <span className="text-sm">Install GymX for a better experience!</span>
          <div className="flex gap-2">
            <button onClick={() => setShowInstallBanner(false)} className="text-xs text-gray-400 hover:text-white px-2 py-1">Dismiss</button>
            <button onClick={handleInstallClick} className="bg-primary text-black text-xs font-bold py-1 px-3 rounded hover:bg-teal-400 transition-colors">Install</button>
          </div>
        </div>
      )}

      {/* Main Content with Page Transitions */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-4 md:py-6 pt-20 sm:pt-24 min-h-screen">
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
