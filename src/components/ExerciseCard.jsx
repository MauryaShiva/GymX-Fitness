import React from "react";
import { Link } from "react-router-dom";

const ExerciseCard = ({ exercise, size = "normal" }) => {
  // Mobile-first responsive sizing. Using a fixed ratio but making it responsive up to max limits.
  // We use w-full so it adapts to the grid, but maintain aspect-ratio.
  const isSmall = size === "small";
  const aspectClass = isSmall ? "aspect-square" : "aspect-[4/5]";

  return (
    // Main container: Dark theme, premium glassmorphism/shadow effects, touch-friendly scaled animations
    <Link
      to={`/exercise/${exercise.exerciseId}`}
      className={`relative block w-full max-w-sm mx-auto bg-surface rounded-2xl overflow-hidden shadow-md active:scale-95 md:hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] md:hover:shadow-xl md:hover:shadow-primary/20 ${aspectClass} group cursor-pointer`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Background GIF with zoom effect on desktop hover */}
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        className="w-full h-full object-cover bg-white transition-transform duration-700 ease-out md:group-hover:scale-110"
      />

      {/* Premium dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 md:opacity-80 md:group-hover:opacity-90 transition-opacity duration-300"></div>

      {/* Content wrapper */}
      <div className={`absolute bottom-0 left-0 right-0 flex flex-col justify-end ${isSmall ? 'p-3 md:p-4' : 'p-4 md:p-5'} text-text-primary z-10`}>
        {/* Tags container */}
        <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
          <span className="bg-primary/80 text-white text-[10px] md:text-xs font-semibold rounded-full capitalize py-1 px-2.5 md:px-3 backdrop-blur-md shadow-sm">
            {exercise.bodyParts?.[0] || 'N/A'}
          </span>
          <span className="bg-secondary/80 text-background text-[10px] md:text-xs font-semibold rounded-full capitalize py-1 px-2.5 md:px-3 backdrop-blur-md shadow-sm">
            {exercise.targetMuscles?.[0] || 'N/A'}
          </span>
        </div>

        {/* Exercise name with line clamping for neatness */}
        <h3 className={`font-bold capitalize tracking-tight line-clamp-2 ${isSmall ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}>
          {exercise.name}
        </h3>
      </div>
    </Link>
  );
};

export default ExerciseCard;
