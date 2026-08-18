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
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 },
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

  return (
    <motion.main
      className="bg-[var(--color-background)] text-white min-h-screen relative"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: "tween", ease: "anticipate", duration: 0.4 }}
    >
      {/* Mobile Back Button (Appears as a floating action) */}
      <div className="fixed top-20 md:top-24 left-4 z-40 md:hidden">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-gray-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full">
        <section className="mb-12 md:mb-20">
          <Detail exerciseDetail={exerciseDetail} />
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Stylized Divider */}
          <div className="w-full flex justify-center my-12 md:my-16">
            <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>

          <section className="mb-12 md:mb-20">
            <ExerciseVideos
              exerciseVideos={exerciseVideos}
              name={exerciseDetail.name}
            />
          </section>

          <div className="w-full flex justify-center my-12 md:my-16">
            <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>

          <section>
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
