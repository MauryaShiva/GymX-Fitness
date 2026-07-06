import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import allExercisesData from "../data/exercises.json";
import { fetchData, youtubeOptions } from "../utils/fetchData";

import Detail from "../components/Detail.jsx";
import ExerciseVideos from "../components/ExerciseVideos.jsx";
import SimilarExercises from "../components/SimilarExercises.jsx";
import Loader from "../components/Loader.jsx";

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const ExerciseDetails = () => {
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const currentExercise = allExercisesData.find((ex) => ex.exerciseId === id);

    if (currentExercise) {
      setExerciseDetail(currentExercise);

      const fetchVideos = async () => {
        try {
          const youtubeSearchUrl = "https://youtube-search-and-download.p.rapidapi.com";
          const videosData = await fetchData(
            `${youtubeSearchUrl}/search?query=${currentExercise.name} exercise tutorial`,
            youtubeOptions
          );
          if (videosData.contents) {
            setExerciseVideos(videosData.contents);
          }
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      };

      // Only fetch if key is present to prevent crashes
      if (import.meta.env.VITE_RAPIDAPI_KEY) {
         fetchVideos();
      }

      if (
        currentExercise.targetMuscles &&
        currentExercise.targetMuscles.length > 0
      ) {
        const primaryMuscle = currentExercise.targetMuscles[0];
        const similarTarget = allExercisesData.filter(
          (ex) =>
            ex.targetMuscles &&
            ex.targetMuscles.includes(primaryMuscle) &&
            ex.exerciseId !== id
        );
        setTargetMuscleExercises(similarTarget);
      }

      if (currentExercise.equipments && currentExercise.equipments.length > 0) {
        const primaryEquipment = currentExercise.equipments[0];
        const similarEquipment = allExercisesData.filter(
          (ex) =>
            ex.equipments &&
            ex.equipments.includes(primaryEquipment) &&
            ex.exerciseId !== id
        );
        setEquipmentExercises(similarEquipment);
      }
    }
  }, [id]);

  if (!exerciseDetail) {
    return <Loader />;
  }

  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-background text-text-primary min-h-screen px-4 md:px-8 pb-safe"
    >
      <div className="max-w-7xl mx-auto py-6 md:py-12">
        <section className="mb-16">
          <Detail exerciseDetail={exerciseDetail} />
        </section>

        <div className="w-full flex justify-center my-12 opacity-50">
          <div className="w-1/2 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>

        <section className="mb-16">
          <ExerciseVideos
            exerciseVideos={exerciseVideos}
            name={exerciseDetail.name}
          />
        </section>

        <div className="w-full flex justify-center my-12 opacity-50">
          <div className="w-1/2 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>

        <section className="pb-10">
          <SimilarExercises
            targetMuscleExercises={targetMuscleExercises}
            equipmentExercises={equipmentExercises}
          />
        </section>
      </div>
    </motion.main>
  );
};

export default ExerciseDetails;
