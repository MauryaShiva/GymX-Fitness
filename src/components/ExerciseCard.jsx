import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -8 }}
      className="w-full h-full flex justify-center"
    >
      {/* ✅ Main container: Dark theme, rounded corners, and a "group" class for hover effects */}
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="relative w-full max-w-[350px] h-[400px] md:h-[450px] bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl group transition-shadow duration-300 ease-in-out hover:shadow-2xl hover:shadow-red-500/20 block border border-gray-800"
      >
        {/* ✅ Image with a subtle zoom effect on hover */}
        <div className="w-full h-full bg-white flex items-center justify-center p-4">
           <img
             src={exercise.gifUrl}
             alt={exercise.name}
             loading="lazy"
             className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
           />
        </div>

        {/* ✅ Gradient overlay for better text readability and a professional look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

        {/* ✅ Container for all the text content, positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          {/* ✅ Tags with a modern, semi-transparent background */}
          <div className="flex flex-row gap-2 mb-3">
            <span className="bg-red-600/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-3 backdrop-blur-md shadow-sm">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-yellow-500/90 text-black text-xs font-bold rounded-full capitalize py-1.5 px-3 backdrop-blur-md shadow-sm">
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
