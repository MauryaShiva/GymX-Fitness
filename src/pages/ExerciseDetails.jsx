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
    // ✅ New UI: A clean, high-contrast light theme for better readability, adapted for mobile-first app feel.
    <motion.main
      className="bg-gray-50 text-gray-900 min-h-screen pb-24 md:pb-0" // Extra pb for mobile sticky action button
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto w-full md:py-10">
        <section className="md:mb-20">
          <Detail exerciseDetail={exerciseDetail} />
        </section>

        {/* ✅ Stylized Divider: Updated for the light theme. */}
        <div className="hidden md:flex w-full justify-center my-20">
          <div className="w-1/3 h-px bg-gray-200"></div>
        </div>

        <div className="md:hidden w-full h-2 bg-gray-100 my-6"></div>

        <section className="mb-10 md:mb-20 px-4 md:px-8">
          <ExerciseVideos
            exerciseVideos={exerciseVideos}
            name={exerciseDetail.name}
          />
        </section>

        <div className="hidden md:flex w-full justify-center my-20">
          <div className="w-1/3 h-px bg-gray-200"></div>
        </div>

        <div className="md:hidden w-full h-2 bg-gray-100 my-6"></div>

        <section className="px-4 md:px-8">
          <SimilarExercises
            targetMuscleExercises={targetMuscleExercises}
            equipmentExercises={equipmentExercises}
          />
        </section>
      </div>

      {/* Sticky Action Button for Mobile */}
      <div className="md:hidden fixed bottom-[64px] left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-40 pb-safe">
        <button className="w-full bg-red-500 text-white font-bold py-4 px-6 rounded-full shadow-lg shadow-red-500/30 active:scale-95 transition-transform">
          Add to Workout
        </button>
      </div>
    </motion.main>
  );
};

export default ExerciseDetails;
