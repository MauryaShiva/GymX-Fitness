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
    // ✅ Updated UI: Integrates with the new Dark Theme design system.
    <motion.main
      className="bg-[var(--color-background)] text-[var(--color-text-primary)] min-h-screen md:px-6 lg:px-8 -mx-4 md:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="w-full max-w-7xl mx-auto md:py-10">
        <section className="mb-12 md:mb-20">
          <Detail exerciseDetail={exerciseDetail} />
        </section>

        {/* ✅ Stylized Divider: Updated for dark theme. */}
        <div className="w-full flex justify-center my-10 md:my-20 px-4">
          <div className="w-1/3 h-px bg-gray-800"></div>
        </div>

        <section className="mb-12 md:mb-20 px-4 md:px-0">
          <ExerciseVideos
            exerciseVideos={exerciseVideos}
            name={exerciseDetail.name}
          />
        </section>

        <div className="w-full flex justify-center my-10 md:my-20 px-4">
          <div className="w-1/3 h-px bg-gray-800"></div>
        </div>

        <section className="px-4 md:px-0 mb-10">
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
