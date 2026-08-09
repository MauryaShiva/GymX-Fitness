import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full max-w-[350px] aspect-[4/5] bg-surface rounded-2xl overflow-hidden shadow-lg border border-border group transition-all duration-300 mx-auto block"
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 bg-white"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-text-primary">
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-white text-xs font-semibold rounded-full capitalize py-1.5 px-3 backdrop-blur-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface/80 border border-border text-text-secondary text-xs font-semibold rounded-full capitalize py-1.5 px-3 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
