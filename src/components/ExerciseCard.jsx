import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full max-w-[350px] mx-auto h-[400px] sm:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group block border border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
    >
      <div className="w-full h-full bg-white relative overflow-hidden">
        <motion.img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover origin-center"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] sm:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/20 text-secondary border border-secondary/30 text-[10px] sm:text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-extrabold capitalize text-xl sm:text-2xl tracking-tight text-white line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;