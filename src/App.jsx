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
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    // Updated container to use the new background theme variable
    <div className="App bg-background text-text-primary min-h-screen flex flex-col pt-safe-top pb-safe">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content with AnimatePresence for Page Transitions */}
      {/* Added extra padding bottom on mobile to accommodate BottomNav */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 mt-16 pb-24 md:pb-6 relative">
        {isInstallable && (
          <div className="bg-surface border border-gray-800 rounded-xl p-4 mb-4 flex justify-between items-center shadow-lg">
            <div>
              <p className="font-semibold text-white">Install GymX</p>
              <p className="text-sm text-gray-400">Add to home screen for native experience</p>
            </div>
            <button
              onClick={handleInstallClick}
              className="bg-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-md"
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

      {/* Footer Section - Hidden on mobile to prioritize BottomNav */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default App;
