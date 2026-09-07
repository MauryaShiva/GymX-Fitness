import React from "react";
import { Link } from "react-router-dom";

const ExerciseCard = ({ exercise }) => {
  return (
    // ✅ Main container: Dark theme, rounded corners, and a "group" class for hover effects
    <Link
      to={`/exercise/${exercise.exerciseId}`}
      className="relative w-[350px] h-[450px] bg-gray-800 rounded-xl overflow-hidden shadow-lg group transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2"
    >
      {/* ✅ Image with a subtle zoom effect on hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      {/* ✅ Gradient overlay for better text readability and a professional look */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      {/* ✅ Container for all the text content, positioned at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        {/* ✅ Tags with a modern, semi-transparent background */}
        <div className="flex flex-row gap-2 mb-3">
          <span className="bg-red-500/80 text-white text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-sm">
            {exercise.bodyParts[0]}
          </span>
          <span className="bg-yellow-500/80 text-white text-xs font-semibold rounded-full capitalize py-1 px-3 backdrop-blur-sm">
            {exercise.targetMuscles[0]}
          </span>
        </div>

        {/* ✅ Exercise name with improved typography */}
        <h3 className="font-bold capitalize text-2xl tracking-tight">
          {exercise.name}
        </h3>
      </div>
    </Link>
  );
};

export default ExerciseCard;
