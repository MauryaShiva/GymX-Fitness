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
    <div className="App bg-[var(--color-background)] text-[var(--color-text-primary)] min-h-screen pb-[80px] md:pb-0 font-sans antialiased">
      {deferredPrompt && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-blue-600 text-white p-3 flex justify-between items-center text-sm pt-safe-top">
          <span>Install GymX for a better experience!</span>
          <button
            onClick={handleInstallClick}
            className="bg-white text-blue-600 px-3 py-1 rounded font-bold"
          >
            Install
          </button>
        </div>
      )}
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto min-h-screen pt-[70px] pb-safe md:pt-[80px]">
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
    </div>
  );
};

export default App;
