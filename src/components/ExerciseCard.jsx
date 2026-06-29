import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    // ✅ Main container: Dark theme, rounded corners, and framer-motion for smooth interaction
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full max-w-[350px] h-[450px] bg-surface rounded-2xl overflow-hidden shadow-xl shadow-black/50 group transition-shadow duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 mx-auto"
    >
      <Link to={`/exercise/${exercise.exerciseId}`} className="block w-full h-full">
        {/* ✅ Image with a subtle zoom effect on hover via tailwind group-hover */}
        <div className="w-full h-[65%] bg-white flex items-center justify-center p-4">
           <img
            src={exercise.gifUrl}
            alt={exercise.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110 mix-blend-multiply"
            />
        </div>

        {/* ✅ Container for all the text content */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-surface flex flex-col justify-end p-5 rounded-t-3xl border-t border-gray-800">
          {/* ✅ Tags with a modern, dark theme background */}
          <div className="flex flex-row flex-wrap gap-2 mb-3">
            <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-semibold rounded-full capitalize py-1 px-3">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs font-semibold rounded-full capitalize py-1 px-3">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          {/* ✅ Exercise name with improved typography */}
          <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight text-white line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
