import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ExerciseCard = ({ exercise }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="block relative w-full h-[400px] sm:h-[450px] bg-surface rounded-3xl overflow-hidden shadow-lg border border-gray-800 transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10"
      >
        <div className="w-full h-full p-4 pb-0 bg-white">
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            loading="lazy"
            className="w-full h-[70%] object-contain mix-blend-multiply"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent h-[60%] top-auto"></div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
          <div className="flex flex-row flex-wrap gap-2 mb-3">
            <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md">
              {exercise.bodyParts[0]}
            </span>
            <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md">
              {exercise.targetMuscles[0]}
            </span>
          </div>

          <h3 className="font-bold capitalize text-xl md:text-2xl tracking-tight text-white line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
