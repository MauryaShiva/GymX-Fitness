import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full max-w-[350px] h-[400px] md:h-[450px] mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-xl group transition-shadow duration-300 ease-in-out hover:shadow-red-500/30 flex flex-col"
    >
      {/* Image Container with solid background to prevent white flashes */}
      <div className="w-full h-full bg-white relative">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        {/* Deep Gradient overlay for seamless text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-10">
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-red-500/90 text-white text-[10px] md:text-xs font-bold rounded-full capitalize py-1.5 px-3 md:px-4 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-yellow-500/90 text-white text-[10px] md:text-xs font-bold rounded-full capitalize py-1.5 px-3 md:px-4 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-extrabold capitalize text-xl md:text-2xl tracking-tight leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
