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
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  return (
    <div className="App bg-[#fffafb] min-h-[100dvh] pb-safe flex flex-col">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 w-full relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <div className="pb-16 md:pb-0"> {/* Add padding for BottomNav on mobile */}
        <Footer />
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNav />

      {/* PWA Install Prompt Banner */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 bg-gray-900 text-white p-4 rounded-2xl shadow-2xl z-50 flex items-center justify-between border border-gray-700"
          >
            <div className="flex items-center gap-3">
              <img src="/gym-icon.png" alt="GymX App" className="w-10 h-10 rounded-lg shadow-sm" />
              <div className="flex flex-col">
                <span className="font-bold text-sm">Install GymX</span>
                <span className="text-xs text-gray-400">Add to home screen for quick access</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                Later
              </button>
              <button
                onClick={handleInstallClick}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md transition-colors"
              >
                Install
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
