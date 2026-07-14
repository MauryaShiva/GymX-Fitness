import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise, size = "large" }) => {
  const isSmall = size === "small";

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative ${
        isSmall ? "w-[280px] h-[360px]" : "w-full max-w-[380px] h-[450px]"
      } bg-surface rounded-2xl overflow-hidden shadow-lg border border-gray-800/50 group mx-auto`}
    >
      <Link to={`/exercise/${exercise.exerciseId}`} className="block w-full h-full">
        {/* Image Container */}
        <div className="absolute inset-0 bg-white">
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            loading="lazy"
            className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>

        {/* Content Container */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex flex-col justify-end h-full">
          {/* Tags */}
          <div className="flex flex-row gap-2 mb-3 flex-wrap">
            <span className="bg-primary/90 text-white text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-md py-1.5 px-3 backdrop-blur-md shadow-sm">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-surface/90 text-text-primary text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-md py-1.5 px-3 backdrop-blur-md border border-gray-700 shadow-sm">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-extrabold capitalize text-xl md:text-2xl text-text-primary tracking-tight leading-tight mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
