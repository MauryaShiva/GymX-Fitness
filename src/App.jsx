import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="App bg-[#fffafb] min-h-screen pb-safe pt-safe-top flex flex-col">
      {/* Custom Install Prompt Banner */}
      <AnimatePresence>
        {deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-16 md:top-20 left-0 right-0 z-40 mx-4 mt-4 bg-gray-900 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between border border-gray-700"
          >
            <div className="flex flex-col">
              <span className="font-bold text-lg">Install GymX</span>
              <span className="text-sm text-gray-300">Add to home screen for native experience</span>
            </div>
            <button
              onClick={handleInstallClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors whitespace-nowrap ml-4"
            >
              Install
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-4 md:py-6 mt-16 md:mt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      <BottomNav />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default App;
