import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const ExerciseCard = ({ exercise, size = "large" }) => {
  const isSmall = size === "small";

  return (
    <MotionLink
      to={`/exercise/${exercise.exerciseId}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative ${isSmall ? 'w-[280px] h-[360px]' : 'w-full aspect-[3/4] max-w-[350px] mx-auto'} bg-surface rounded-2xl overflow-hidden shadow-lg group block border border-gray-800`}
    >
      <div className="absolute inset-0 bg-white">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end h-full">
        <div className="flex flex-row flex-wrap gap-2 mb-3">
          <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold rounded-full capitalize py-1 px-3 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className={`font-extrabold capitalize tracking-tight text-white ${isSmall ? 'text-xl' : 'text-2xl leading-tight'}`}>
          {exercise.name}
        </h3>
      </div>
    </MotionLink>
  );
};

export default ExerciseCard;
