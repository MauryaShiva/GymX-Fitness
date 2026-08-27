import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import allExercisesData from "../data/exercises.json";

import Detail from "../components/Detail.jsx";
import ExerciseVideos from "../components/ExerciseVideos.jsx";
import SimilarExercises from "../components/SimilarExercises.jsx";
import { fetchData, youtubeOptions } from "../utils/fetchData";

const ExerciseDetails = () => {
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const currentExercise = allExercisesData.find(
        (ex) => String(ex.exerciseId) === String(id)
      );

      if (currentExercise) {
        setExerciseDetail(currentExercise);

        // Fetch YouTube videos matching exercise name
        try {
          const youtubeSearchUrl =
            "https://youtube-search-and-download.p.rapidapi.com";
          const exerciseVideosData = await fetchData(
            `${youtubeSearchUrl}/search?query=${currentExercise.name} exercise`,
            youtubeOptions
          );
          if (exerciseVideosData && exerciseVideosData.contents) {
            setExerciseVideos(exerciseVideosData.contents);
          }
        } catch (error) {
          console.error("Error fetching YouTube videos:", error);
        }

        if (currentExercise.targetMuscles && currentExercise.targetMuscles.length > 0) {
          const primaryTarget = currentExercise.targetMuscles[0];
          const similarTarget = allExercisesData.filter(
            (ex) =>
              ex.targetMuscles &&
              ex.targetMuscles.includes(primaryTarget) &&
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
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.main
      className="bg-background text-text-primary min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Detail exerciseDetail={exerciseDetail} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-20">
        <section className="mb-16 md:mb-24">
          <ExerciseVideos
            exerciseVideos={exerciseVideos}
            name={exerciseDetail.name}
          />
        </section>

        <section className="mb-16 md:mb-24">
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
