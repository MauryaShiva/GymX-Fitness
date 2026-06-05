import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Import the CSS file which should contain your Tailwind directives
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import MobileSearchOverlay from "./components/MobileSearchOverlay";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetails";
import Footer from "./components/Footer";
import HomeWorkouts from "./pages/HomeWorkouts.jsx";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);


  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="App bg-[#0f0f0f] text-white min-h-screen flex flex-col relative pb-20 md:pb-0">
      {/* Top Navigation (Desktop & Mobile Header) */}
      <Navbar onOpenSearch={() => setIsMobileSearchOpen(true)} />

      <MobileSearchOverlay
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        onSearch={(term) => {
          if (location.pathname !== '/') {
             // Use react-router navigate to avoid full page reload
             navigate('/?search=' + encodeURIComponent(term));
          } else {
             window.dispatchEvent(new CustomEvent('global-search', { detail: term }));
          }
        }}
      />

      {/* PWA Install Prompt for mobile if available */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-4 right-4 z-40 bg-gray-800 border border-gray-700 p-4 rounded-2xl shadow-2xl flex justify-between items-center"
          >
            <div>
              <p className="font-bold text-white">Install GymX</p>
              <p className="text-sm text-gray-400">Add to your home screen for the best experience.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowInstallPrompt(false)} className="text-gray-400 p-2">Dismiss</button>
              <button onClick={handleInstallClick} className="bg-red-600 text-white px-4 py-2 rounded-xl font-bold">Install</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Route Transitions */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-24 pb-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/exercise/:id" element={<PageTransition><ExerciseDetail /></PageTransition>} />
            <Route path="/home-workouts" element={<PageTransition><HomeWorkouts /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer Section (Desktop) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Navigation (Mobile Only) */}
      <BottomNav />
    </div>
  );
};

export default App;
