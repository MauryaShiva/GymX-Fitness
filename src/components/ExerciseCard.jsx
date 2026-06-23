import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise, size = "large" }) => {
  // Dynamic sizing classes for responsiveness and reuse
  const sizeClasses = size === "large"
    ? "w-full max-w-[350px] h-[400px] md:h-[450px]"
    : "w-[280px] h-[350px]";

  return (
    // ✅ Main container: Dark theme, rounded corners, wrapped in motion.div for tap/hover effects
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${sizeClasses} mx-auto bg-surface rounded-2xl overflow-hidden shadow-xl border border-gray-800 transition-shadow duration-300 hover:shadow-primary/20`}
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="relative block w-full h-full group"
      >
        {/* ✅ Image with a subtle zoom effect on hover */}
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover bg-white transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        {/* ✅ Gradient overlay for better text readability and a professional look */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90"></div>

        {/* ✅ Container for all the text content, positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-text-primary">
          {/* ✅ Tags with a modern, semi-transparent background */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold rounded-full capitalize py-1.5 px-3 backdrop-blur-md">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold rounded-full capitalize py-1.5 px-3 backdrop-blur-md">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* ✅ Exercise name with improved typography */}
          <h3 className="font-extrabold capitalize text-xl md:text-2xl tracking-tight leading-tight line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
