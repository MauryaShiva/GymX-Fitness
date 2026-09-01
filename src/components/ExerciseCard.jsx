import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise, size = "default" }) => {
  const isSmall = size === "small";

  return (
    // ✅ Main container: Framer motion Link, dynamic size
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`relative block bg-surface rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/30 transition-shadow duration-300 group ${isSmall ? "w-full h-[280px]" : "w-full h-[350px] sm:w-[350px] sm:h-[450px]"}`}
    >
      {/* ✅ Image with a subtle zoom effect on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover mix-blend-screen opacity-90 transition-transform duration-500 ease-out group-hover:scale-110"
      />

      {/* ✅ Gradient overlay for better text readability and a professional look */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90"></div>

      {/* ✅ Container for all the text content, positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
        {/* ✅ Tags with a modern, semi-transparent background */}
        <div className="flex flex-row flex-wrap gap-2 mb-2 sm:mb-3">
          <span className="bg-primary/20 border border-primary/30 text-primary text-[10px] sm:text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 text-[10px] sm:text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* ✅ Exercise name with improved typography */}
        <h3 className={`font-bold capitalize tracking-tight ${isSmall ? "text-lg" : "text-xl sm:text-2xl"} text-text-primary line-clamp-2`}>
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
