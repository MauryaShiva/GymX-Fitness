import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Dumbbell, Target } from "lucide-react";

const ExerciseCard = ({ exercise }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full sm:w-[350px] h-[400px] mx-auto"
    >
      <Link
        to={`/exercise/${exercise.exerciseId}`}
        className="block relative w-full h-full bg-surface rounded-2xl overflow-hidden shadow-lg group border border-gray-800"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end h-full">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="flex items-center gap-1 bg-primary/20 text-primary text-xs font-bold rounded-full py-1.5 px-3 backdrop-blur-md border border-primary/30 capitalize">
              <Dumbbell size={12} />
              {exercise.bodyParts[0]}
            </span>
            <span className="flex items-center gap-1 bg-secondary/20 text-secondary text-xs font-bold rounded-full py-1.5 px-3 backdrop-blur-md border border-secondary/30 capitalize">
              <Target size={12} />
              {exercise.targetMuscles[0]}
            </span>
          </div>

          <h3 className="font-extrabold capitalize text-2xl text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {exercise.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;
