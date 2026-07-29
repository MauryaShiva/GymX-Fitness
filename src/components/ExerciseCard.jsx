import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use Framer Motion's motion.create for v12 compatibility
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      className="relative block w-full aspect-[4/5] bg-surface rounded-2xl overflow-hidden shadow-lg group"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-surface flex items-center justify-center p-4">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-text-primary">
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight text-white line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
