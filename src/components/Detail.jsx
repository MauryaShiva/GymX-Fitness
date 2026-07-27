import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Animation variants for a staggered fade-in effect
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
    <motion.div
      className="flex flex-col lg:flex-row p-5 md:p-8 items-center gap-10 lg:gap-16 bg-surface rounded-3xl shadow-2xl border border-gray-800 mx-4 md:mx-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center relative">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-90 -z-10"></div>
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-md lg:max-w-xl rounded-2xl shadow-xl object-cover mix-blend-screen"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold capitalize text-white tracking-tight leading-tight">
          {name}
        </h1>
        <p className="text-base lg:text-lg text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-secondary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-6 p-4 rounded-2xl bg-background/50 border border-gray-800 hover:bg-gray-800 transition-colors">
              <div className="bg-surface rounded-xl w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-inner">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 opacity-80" />
              </div>
              <span className="capitalize text-lg lg:text-xl font-medium text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full sm:w-auto bg-primary text-background font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-inside mt-6 space-y-4 text-text-secondary bg-background/50 p-6 rounded-2xl border border-gray-800"
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {instructions.map((step, index) => (
                  <li key={index} className="leading-relaxed">{step}</li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
