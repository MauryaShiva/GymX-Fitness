import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Use motion.create for Framer Motion v12+ compatibility with React Router components
const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise }) => {
  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      className="relative w-full max-w-[350px] sm:w-[350px] h-[400px] sm:h-[450px] bg-surface rounded-2xl overflow-hidden shadow-lg group block mx-auto border border-gray-800"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Image with zoom effect */}
      <motion.div className="w-full h-full overflow-hidden bg-gray-900">
        <motion.img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover object-center mix-blend-screen"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none"></div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-text-primary z-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/90 text-white text-xs font-bold rounded-full capitalize py-1.5 px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-surface/90 border border-gray-700 text-text-primary text-xs font-semibold rounded-full capitalize py-1.5 px-3 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* Exercise Name */}
        <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight leading-tight line-clamp-2">
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
