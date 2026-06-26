import React from "react";
import { Link } from "react-router-dom";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link
      to={`/exercise/${exercise.exerciseId}`}
      className="relative w-full aspect-[4/5] sm:h-[450px] sm:w-[350px] bg-surface rounded-2xl overflow-hidden shadow-md group transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-2 active:scale-95"
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-text-primary">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold rounded-full capitalize py-1.5 px-4 backdrop-blur-md">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        <h3 className="font-extrabold capitalize text-2xl tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
          {exercise.name}
        </h3>
      </div>
    </Link>
  );
};

export default ExerciseCard;
