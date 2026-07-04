import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import allExercisesData from "../data/exercises.json";
import { fetchData, youtubeOptions } from "../utils/fetchData";

import Detail from "../components/Detail.jsx";
import ExerciseVideos from "../components/ExerciseVideos.jsx";
import SimilarExercises from "../components/SimilarExercises.jsx";
import Loader from "../components/Loader.jsx";

const ExerciseDetails = () => {
  // --- Saara State aur Logic jaisa tha waisa hi hai ---
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
        const youtubeSearchUrl =
          "https://youtube-search-and-download.p.rapidapi.com";
        const videosData = await fetchData(
          `${youtubeSearchUrl}/search?query=${currentExercise.name} exercise`,
          youtubeOptions
        );
        if (videosData.contents) {
          setExerciseVideos(videosData.contents);
        }
      };
      fetchVideos();

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
  // --- Logic mein koi badlav nahi ---

  return (
    // Updated to premium dark app theme design without safe-area top to allow the image to bleed on mobile
    <motion.main
      className="bg-background text-text-primary min-h-screen pb-safe"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="w-full mx-auto md:max-w-7xl md:px-4 md:py-8 lg:px-8">

        <section className="mb-8 md:mb-16">
          <Detail exerciseDetail={exerciseDetail} />
        </section>

        <div className="px-4 md:px-0">
          <div className="w-full h-px bg-gray-800 my-8 md:my-16"></div>

          <section className="mb-8 md:mb-16">
            <ExerciseVideos
              exerciseVideos={exerciseVideos}
              name={exerciseDetail.name}
            />
          </section>

          <div className="w-full h-px bg-gray-800 my-8 md:my-16"></div>

          <section className="pb-12 md:pb-0">
            <SimilarExercises
              targetMuscleExercises={targetMuscleExercises}
              equipmentExercises={equipmentExercises}
            />
          </section>
        </div>
      </div>
    </motion.main>
  );
};

export default ExerciseDetails;
