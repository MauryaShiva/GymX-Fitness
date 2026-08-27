import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use framer-motion's motion.create to wrap react-router-dom Link (Framer Motion v12+)
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="block relative w-full h-[400px] md:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg border border-border group"
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <span className="bg-primary/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface-hover/90 text-text-primary text-xs font-bold rounded-full capitalize py-1.5 px-3 backdrop-blur-md border border-border shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-extrabold capitalize text-2xl md:text-3xl text-text-primary tracking-tight leading-tight">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
