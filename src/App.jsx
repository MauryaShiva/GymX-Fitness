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
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
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
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 min-h-screen pb-24 md:pb-12">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-surface border border-gray-700 text-white p-4 rounded-xl shadow-2xl flex flex-col sm:flex-row items-center gap-4 w-[90%] max-w-md mx-auto">
          <p className="text-sm font-medium text-center sm:text-left">
            Install GymX for a better experience!
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
             <button
              onClick={handleInstallClick}
              className="bg-primary text-background font-bold py-2 px-4 rounded-md hover:bg-opacity-90 w-full sm:w-auto text-sm"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="bg-gray-700 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-600 w-full sm:w-auto text-sm"
            >
              Later
            </button>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <Footer />

      {/* Bottom Navigation for Mobile */}
      <BottomNav />
    </div>
  );
};

export default App;
