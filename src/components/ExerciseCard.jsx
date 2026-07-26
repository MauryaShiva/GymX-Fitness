import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-[320px] sm:w-[350px] bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl shadow-black/50 group transition-all duration-300 ease-in-out border border-white/5"
    >
      <div className="w-full h-[250px] bg-white/5 relative">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover mix-blend-screen"
        />
        {/* Gradient overlay specifically for the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex flex-row flex-wrap gap-2">
          <span className="bg-[#2a2a2a] text-gray-300 text-xs font-semibold rounded-lg capitalize py-1.5 px-3 border border-white/10">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg capitalize py-1.5 px-3 border border-red-500/20">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-bold capitalize text-xl text-white tracking-tight line-clamp-2 mt-1">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
