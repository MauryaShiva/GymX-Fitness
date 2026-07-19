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
        try {
          const youtubeSearchUrl =
            "https://youtube-search-and-download.p.rapidapi.com";
          const videosData = await fetchData(
            `${youtubeSearchUrl}/search?query=${currentExercise.name} exercise`,
            youtubeOptions
          );
          if (videosData && videosData.contents) {
            setExerciseVideos(videosData.contents);
          }
        } catch (error) {
          console.error("Failed to fetch videos:", error);
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
      className="bg-background text-text-primary min-h-screen pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Sticky Back Button for Mobile App Feel */}
      <div className="sticky top-[70px] md:top-[90px] z-30 px-4 py-2 bg-background/90 backdrop-blur-md border-b border-gray-800 -mx-4 md:mx-0 md:bg-transparent md:border-none md:backdrop-blur-none mb-4 md:mb-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className="w-full">
        <section className="mb-16 md:mb-24">
          <Detail exerciseDetail={exerciseDetail} />
        </section>

        <div className="w-full flex justify-center my-16 opacity-30">
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        </div>

        <section className="mb-16 md:mb-24">
          <ExerciseVideos
            exerciseVideos={exerciseVideos}
            name={exerciseDetail.name}
          />
        </section>

        <div className="w-full flex justify-center my-16 opacity-30">
          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
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
