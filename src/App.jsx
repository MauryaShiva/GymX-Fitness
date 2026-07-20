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
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      console.log("beforeinstallprompt event was fired");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <div className="App bg-[#fffafb] dark:bg-background min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100">
      {/* Top Navigation - Visible mainly on desktop */}
      <Navbar />

      {/* Main Content */}
      {/* Added safe area padding and bottom padding for bottom nav on mobile */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 pt-safe-top pb-20 md:pb-6 w-full relative">
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

      {/* Example install banner (optional) */}
      {/* {deferredPrompt && (
        <div className="fixed bottom-[80px] left-4 right-4 bg-primary text-white p-4 rounded-xl shadow-lg z-50 flex justify-between items-center md:hidden">
          <span>Install App for better experience</span>
          <button
            className="bg-white text-primary px-4 py-2 rounded-lg font-bold"
            onClick={() => {
              deferredPrompt.prompt();
              deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                  console.log('User accepted the install prompt');
                } else {
                  console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null);
              });
            }}
          >
            Install
          </button>
        </div>
      )} */}
    </div>
  );
};

export default App;
