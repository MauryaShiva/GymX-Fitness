import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use motion.create for Framer Motion v12+ with custom components
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise, size = "large" }) => {
  const isSmall = size === "small";

  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`relative block bg-surface rounded-2xl overflow-hidden shadow-lg border border-gray-800 transition-shadow duration-300 hover:shadow-primary/20 ${
        isSmall ? "w-[260px] h-[340px]" : "w-full max-w-sm h-[420px] mx-auto"
      }`}
    >
      {/* Background Image/GIF */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover mix-blend-screen opacity-90"
      />

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none"></div>

      {/* Content Container positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
        {/* Pills for Body Part and Muscle */}
        <div className="flex flex-wrap gap-2">
          <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider py-1 px-3 backdrop-blur-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/20 text-secondary border border-secondary/30 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider py-1 px-3 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise Name */}
        <h3 className={`font-bold capitalize text-text-primary tracking-tight line-clamp-2 ${
          isSmall ? "text-xl" : "text-2xl"
        }`}>
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
