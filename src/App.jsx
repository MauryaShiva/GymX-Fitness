import React, { useState } from "react";
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
import MobileBottomNav from "./components/MobileBottomNav";
import MobileSearchOverlay from "./components/MobileSearchOverlay";

// Wrapper for animated route transitions
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  const location = useLocation();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <div className="App bg-[#fffafb] min-h-screen-safe flex flex-col">
      {/* Top Navigation */}
      <Navbar onSearchClick={() => setIsMobileSearchOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-20 md:pb-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/exercise/:id" element={<PageWrapper><ExerciseDetail /></PageWrapper>} />
            <Route path="/home-workouts" element={<PageWrapper><HomeWorkouts /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <div className="pb-16 md:pb-0"> {/* Padding to prevent footer being covered by bottom nav on mobile */}
        <Footer />
      </div>

      {/* Mobile-only Bottom Navigation */}
      <MobileBottomNav />

      {/* Mobile-only Search Overlay */}
      <MobileSearchOverlay
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
      />
    </div>
  );
};

export default App;
