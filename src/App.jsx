import React, { useState } from "react";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="App bg-gray-950 text-white min-h-screen pb-16 md:pb-0 selection:bg-red-500/30">
      {/* Top Navigation */}
      <Navbar onSearchClick={toggleSearch} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto min-h-screen relative pt-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/home-workouts" element={<HomeWorkouts />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav onSearchClick={toggleSearch} />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default App;
