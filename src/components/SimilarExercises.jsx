import React from "react";
import HorizontalScrollbar from "./HorizontalScrollbar.jsx";
import Loader from "./Loader.jsx";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <div className="w-full flex flex-col p-4 md:p-8">
      <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-text-primary">
        Similar <span className="text-primary capitalize">Target Muscle</span>{" "}
        exercises
      </h2>
      <div className="w-full mb-16 relative">
        <div className="absolute top-0 left-0 h-full w-8 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {targetMuscleExercises.length !== 0 ? (
          <HorizontalScrollbar data={targetMuscleExercises} />
        ) : (
          <Loader />
        )}
        <div className="absolute top-0 right-0 h-full w-8 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>

      <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-text-primary">
        Similar <span className="text-primary capitalize">Equipment</span>{" "}
        exercises
      </h2>
      <div className="w-full relative">
        <div className="absolute top-0 left-0 h-full w-8 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {equipmentExercises.length !== 0 ? (
          <HorizontalScrollbar data={equipmentExercises} />
        ) : (
          <Loader />
        )}
        <div className="absolute top-0 right-0 h-full w-8 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
};

export default SimilarExercises;
