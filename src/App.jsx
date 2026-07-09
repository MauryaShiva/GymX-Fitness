import React, { useEffect, useState } from "react";
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

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <div className="App bg-[#fffafb] pb-[72px] md:pb-0">
      {/* Top Navigation */}
      <Navbar />

      {/* Install Banner */}
      {showInstallBanner && (
        <div className="fixed top-20 left-0 w-full z-40 px-4 md:hidden">
          <div className="bg-red-50 text-red-900 px-4 py-3 rounded-xl shadow-lg border border-red-100 flex items-center justify-between mt-safe-top">
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Install GymX App</span>
              <span className="text-xs text-red-700">Add to home screen for faster access</span>
            </div>
            <button
              onClick={handleInstallClick}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-transform"
            >
              Install
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 min-h-screen pt-safe-top md:mt-20 mt-24">
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
