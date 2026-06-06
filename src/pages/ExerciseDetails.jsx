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

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    // ✅ New UI: A clean, high-contrast light theme for better readability.
    <motion.main
      className="bg-background text-gray-100 min-h-screen px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="max-w-7xl mx-auto py-12 md:py-20">
        {/*
          NOTE: For the best look, the <Detail /> component should be updated
          to use this new light theme with teal accents.
        */}
        <section className="mb-20">
          <Detail exerciseDetail={exerciseDetail} />
        </section>

        {/* ✅ Stylized Divider */}
        <div className="w-full flex justify-center my-20">
          <div className="w-1/3 h-px bg-gray-800"></div>
          <div className="w-1/3 h-px bg-gray-800"></div>
        </div>

        {/*
          NOTE: The <ExerciseVideos /> component should be updated to match,
          with headings and links using the new teal accent color (e.g., text-teal-500).
        */}
        <section className="mb-20">
          <ExerciseVideos
            exerciseVideos={exerciseVideos}
            name={exerciseDetail.name}
          />
        </section>

        <div className="w-full flex justify-center my-20">
          <div className="w-1/3 h-px bg-gray-200"></div>
        </div>

        {/*
          NOTE: The <SimilarExercises /> component and its cards should be
          redesigned for a light background to complete the look.
        */}
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
