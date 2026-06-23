import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";
import BottomNav from "./components/BottomNav.jsx";

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
      }
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Navbar />

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed top-20 left-4 right-4 z-50 bg-surface border border-primary p-4 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <h3 className="font-bold text-text-primary">Install GymX</h3>
            <p className="text-sm text-text-secondary">Add to home screen for native app experience.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowInstallBanner(false)}
              className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary"
            >
              Later
            </button>
            <button
              onClick={handleInstallClick}
              className="px-3 py-1 text-sm bg-primary text-background rounded-md font-bold"
            >
              Install
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {/* pt-20 to clear navbar, pb-24 to clear bottom nav on mobile */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-safe pb-safe mt-20 mb-20 md:mb-0 min-h-screen w-full flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section - Hidden on mobile to make room for BottomNav */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNav />
    </div>
  );
};

export default App;
