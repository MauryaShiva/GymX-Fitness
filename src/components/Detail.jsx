import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div>Loading details...</div>;
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part icon" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle icon" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment icon" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full flex flex-col relative pb-safe">
      {/* Hero GIF Section - App Style */}
      <div className="relative w-full h-[45vh] md:h-[60vh] bg-white">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain p-8 mix-blend-multiply"
        />
        {/* Gradient Overlay for bottom transition */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content Section */}
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-8 -mt-8 relative z-10 flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl lg:text-6xl font-bold capitalize text-text-primary drop-shadow-lg"
        >
          {name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base lg:text-lg text-text-secondary leading-relaxed max-w-3xl"
        >
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </motion.p>

        {/* Stats / Extra Details Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-3 md:gap-6 w-full max-w-3xl mt-4"
        >
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-col items-center p-3 md:p-4 bg-surface rounded-2xl border border-gray-800 shadow-md">
              <div className="bg-primary/10 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mb-3">
                <img src={item.icon} alt={item.alt} className="w-6 h-6 md:w-8 md:h-8 filter brightness-200" />
              </div>
              <span className="capitalize text-sm md:text-lg text-text-primary font-medium text-center line-clamp-1">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Interactive Instructions Section */}
        <motion.div variants={itemVariants} className="mt-8 pb-10">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">Instructions</h2>
          <ol className="list-decimal list-inside space-y-4 text-text-secondary text-base lg:text-lg">
            {instructions.map((step, index) => (
              <li key={index} className="pl-2 marker:text-primary marker:font-bold">
                {step}
              </li>
            ))}
          </ol>
        </motion.div>
      </motion.div>

      {/* Sticky Action Button for Mobile & Desktop */}
      <div className="fixed bottom-[70px] md:bottom-6 left-0 right-0 px-4 md:px-8 z-40 flex justify-center pointer-events-none">
        <div className="w-full max-w-7xl flex justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              const videoSection = document.getElementById("exercise-videos");
              if (videoSection) {
                videoSection.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }
            }}
            className="pointer-events-auto flex items-center gap-2 bg-primary text-background font-bold py-3 px-6 rounded-full shadow-lg shadow-primary/20 hover:bg-teal-400 transition-colors"
          >
            <Play className="w-5 h-5 fill-current" />
            Watch Video
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
