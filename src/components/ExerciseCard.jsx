import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    // Wrap with Framer Motion for premium touch interactions
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-[300px] md:w-[350px] h-[400px] md:h-[450px]"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="relative block w-full h-full bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-xl shadow-black/50 group"
      >
        {/* GIF container with smooth zoom on hover */}
        <div className="w-full h-full overflow-hidden bg-white/5">
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>

        {/* Content Container */}
        <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col gap-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="bg-red-500/90 text-white text-[11px] uppercase tracking-wider font-bold rounded-full py-1.5 px-3 backdrop-blur-md shadow-sm">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-yellow-500/90 text-white text-[11px] uppercase tracking-wider font-bold rounded-full py-1.5 px-3 backdrop-blur-md shadow-sm">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* Exercise Name */}
          <h3 className="font-extrabold capitalize text-xl md:text-2xl text-white tracking-tight leading-tight drop-shadow-md">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
