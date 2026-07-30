import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import { useSearchParams } from "react-router-dom";

import allExercisesData from "../data/exercises.json"; // Local data import
import HeroBanner from "../components/HeroBanner.jsx";
import SearchExercises from "../components/SearchExercises.jsx";
import Exercises from "../components/Exercises.jsx";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Home = () => {
  const [exercises, setExercises] = useState(allExercisesData);
  const [bodyPart, setBodyPart] = useState("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Fuse.js setup for smart search
  const fuse = new Fuse(allExercisesData, {
    keys: ["name", "targetMuscles", "equipments", "bodyParts"],
    threshold: 0.4,
  });

  useEffect(() => {
    // Check URL params for search trigger (e.g. from bottom nav on other pages)
    if (searchParams.get("search") === "true") {
      setIsSearchOpen(true);
      // Clean up URL without triggering reload
      setSearchParams({});
    }

    // Listen for custom event from Navbar/BottomNav
    const handleOpenSearch = () => {
      setIsSearchOpen(true);
    };

    window.addEventListener("open-search", handleOpenSearch);

    // Handle resizing to switch between mobile overlay and desktop inline
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
      window.removeEventListener("resize", handleResize);
    };
  }, [searchParams, setSearchParams, isSearchOpen]);

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setExercises(allExercisesData);
      setBodyPart("all");
      return;
    }
    const results = fuse.search(searchTerm);
    const searchedExercises = results.map((result) => result.item);
    setExercises(searchedExercises);
    setBodyPart(`${searchTerm}`);
  };

  const handleBodyPartChange = (part) => {
    setBodyPart(part);
    if (part === "all") {
      setExercises(allExercisesData);
    } else {
      const filtered = allExercisesData.filter((exercise) =>
        exercise.bodyParts
          .map((bp) => bp.toLowerCase())
          .includes(part.toLowerCase())
      );
      setExercises(filtered);
    }
  };

  return (
    <div>
      <HeroBanner />

      {/* Desktop Search (Hidden on Mobile) */}
      <div className="hidden md:block">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <SearchExercises
            onSearch={handleSearch}
            bodyPart={bodyPart}
            setBodyPart={handleBodyPartChange}
          />
        </motion.div>
      </div>

      {/* Mobile Search Overlay */}
      <div className="md:hidden">
        <SearchExercises
          onSearch={handleSearch}
          bodyPart={bodyPart}
          setBodyPart={handleBodyPartChange}
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Exercises
          exercises={exercises}
          bodyPart={bodyPart}
        />
      </motion.div>
    </div>
  );
};

export default Home;