import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";
// Will create BottomNav in the next step, importing it here first
import BottomNav from "./components/BottomNav.jsx";

const App = () => {
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const pageTransitionVariants = {
    initial: {
      opacity: 0,
      x: 20,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: -20,
    },
  };

  const pageTransitionConfig = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  return (
    <div className="App bg-background text-text-primary min-h-screen flex flex-col pt-safe-top pb-safe">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-20 md:pb-6 w-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageTransitionVariants}
                  transition={pageTransitionConfig}
                  className="w-full h-full"
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/exercise/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageTransitionVariants}
                  transition={pageTransitionConfig}
                  className="w-full h-full"
                >
                  <ExerciseDetail />
                </motion.div>
              }
            />
            <Route
              path="/home-workouts"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageTransitionVariants}
                  transition={pageTransitionConfig}
                  className="w-full h-full"
                >
                  <HomeWorkouts />
                </motion.div>
              }
            />
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
