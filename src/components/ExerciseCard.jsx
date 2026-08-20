import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full max-w-[350px] aspect-[4/5] md:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group mx-auto block border border-gray-800"
    >
      <div className="w-full h-full bg-white relative">
        {/* ✅ Image with a subtle zoom effect on hover */}
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      {/* ✅ Container for all the text content, positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
        {/* ✅ Tags with a modern, semi-transparent background */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-white text-[11px] font-bold tracking-wide rounded-full uppercase py-1.5 px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-gray-700/90 text-gray-100 text-[11px] font-bold tracking-wide rounded-full uppercase py-1.5 px-3 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* ✅ Exercise name with improved typography */}
        <h3 className="font-extrabold capitalize text-2xl tracking-tight leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
