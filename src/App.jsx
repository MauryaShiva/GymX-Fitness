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

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <div className="App min-h-screen-safe bg-background text-text-primary pb-16 md:pb-0">
      {deferredPrompt && (
        <div className="fixed top-0 left-0 right-0 bg-primary text-white p-2 text-center z-[60] flex justify-between items-center px-4">
          <span className="text-sm font-medium">Install GymX for a better experience</span>
          <button onClick={handleInstallClick} className="bg-white text-primary px-3 py-1 rounded-full text-xs font-bold">Install</button>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 mt-16 md:mt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Home />
              </motion.div>
            } />
            <Route path="/exercise/:id" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <ExerciseDetail />
              </motion.div>
            } />
            <Route path="/home-workouts" element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <HomeWorkouts />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <BottomNav />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default App;
