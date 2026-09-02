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

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen flex flex-col">
      {/* PWA Install Banner */}
      {deferredPrompt && (
        <div className="fixed bottom-20 left-0 right-0 mx-4 md:mx-auto md:bottom-4 md:max-w-md bg-surface border border-gray-700 p-4 rounded-xl shadow-2xl z-50 flex justify-between items-center text-sm md:text-base">
          <div>
            <p className="font-bold text-white">Install GymX</p>
            <p className="text-gray-400">Add to your home screen for quick access.</p>
          </div>
          <button
            onClick={handleInstallClick}
            className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Install
          </button>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content with Mobile Bottom Padding */}
      <main className="flex-grow pt-16 pb-20 md:pb-0 w-full">
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
