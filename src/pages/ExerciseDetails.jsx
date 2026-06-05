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
    // Reverted to dark theme and optimized for mobile-first PWA experience
    <motion.main
      className="bg-[#0f0f0f] text-white min-h-screen px-4 sm:px-6 lg:px-8 pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto pt-6 md:pt-12">

        <section className="mb-16 md:mb-24">
          <Detail exerciseDetail={exerciseDetail} />
        </section>

        {/* Sticky Action Button for Mobile */}
        <div className="md:hidden fixed bottom-[calc(env(safe-area-inset-bottom)+70px)] left-0 right-0 p-4 z-40 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent pt-10">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#0f0f0f]">
            Start Workout
          </button>
        </div>

        {/* Divider */}
        <div className="w-full flex justify-center my-16">
          <div className="w-1/3 h-px bg-gray-800"></div>
        </div>

        <section className="mb-16 md:mb-24">
          <ExerciseVideos
            exerciseVideos={exerciseVideos}
            name={exerciseDetail.name}
          />
        </section>

        <div className="w-full flex justify-center my-16">
          <div className="w-1/3 h-px bg-gray-800"></div>
        </div>

        <section>
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
