import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import allExercisesData from "../data/exercises.json";
import { fetchData, youtubeOptions } from "../utils/fetchData";

import Detail from "../components/Detail.jsx";
import ExerciseVideos from "../components/ExerciseVideos.jsx";
import SimilarExercises from "../components/SimilarExercises.jsx";
import Loader from "../components/Loader.jsx";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.98 },
};

const ExerciseDetails = () => {
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const currentExercise = allExercisesData.find((ex) => ex.exerciseId === id);

    if (currentExercise) {
      setExerciseDetail(currentExercise);

      const fetchVideos = async () => {
        const youtubeSearchUrl =
          "https://youtube-search-and-download.p.rapidapi.com";
        try {
          const videosData = await fetchData(
            `${youtubeSearchUrl}/search?query=${currentExercise.name} exercise`,
            youtubeOptions
          );
          if (videosData.contents) {
            setExerciseVideos(videosData.contents);
          }
        } catch (error) {
          console.error("Failed to fetch videos", error);
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

  return (
    <motion.main
      className="bg-background text-text-primary min-h-screen relative w-full"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.3 }}
    >
      {/* App-style Back Button for Mobile */}
      <button
        onClick={() => navigate(-1)}
        className="md:hidden fixed top-safe-top left-4 z-50 p-2 mt-4 bg-surface/80 backdrop-blur-md rounded-full text-white shadow-lg border border-gray-800"
      >
        <ArrowLeft size={24} />
      </button>

      {/*
        Hero Image Section (Mobile App Style)
        This is now part of the detail component to keep it cohesive,
        so we pass it down.
      */}
      <Detail exerciseDetail={exerciseDetail} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="w-full flex justify-center my-12">
          <div className="w-1/3 h-px bg-gray-800"></div>
        </div>

        <section className="mb-20">
          <ExerciseVideos
            exerciseVideos={exerciseVideos}
            name={exerciseDetail.name}
          />
        </section>

        <div className="w-full flex justify-center my-12">
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
