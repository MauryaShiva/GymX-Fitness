import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.96 }}
      className="relative block w-full h-[350px] sm:h-[400px] md:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/20"
    >
      {/* Background container for the image */}
      <div className="absolute inset-0 bg-white dark:bg-gray-100 flex items-center justify-center">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

      {/* Container for all the text content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white flex flex-col justify-end h-full pointer-events-none">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-black text-xs font-bold uppercase tracking-wider rounded-full py-1 px-3 backdrop-blur-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/90 text-white text-xs font-bold uppercase tracking-wider rounded-full py-1 px-3 backdrop-blur-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-extrabold capitalize text-xl md:text-2xl lg:text-3xl tracking-tight leading-tight mb-1 text-white">
          {exercise.name}
        </h3>

        {exercise.equipments && exercise.equipments.length > 0 && (
          <p className="text-gray-300 text-sm font-medium capitalize mt-1 flex items-center gap-1">
             {exercise.equipments[0]}
          </p>
        )}
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
