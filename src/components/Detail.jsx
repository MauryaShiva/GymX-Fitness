import React, { useState } from "react";
// ✅ Import 'motion' and 'AnimatePresence' for animations
import { motion, AnimatePresence } from "framer-motion";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  // ✅ Add state to manage showing/hiding the instructions
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
      className="flex flex-col lg:flex-row items-center gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center bg-surface md:bg-transparent md:p-0 p-4">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-sm lg:max-w-xl rounded-2xl shadow-2xl object-cover"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 px-4 md:px-0"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-text-primary tracking-tight">
          {name}
        </h1>
        <p className="text-lg lg:text-xl text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-bold text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-bold text-secondary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-5 mt-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-6 bg-surface p-4 rounded-xl border border-gray-800 shadow-md">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 opacity-80 filter invert" />
              </div>
              <span className="capitalize text-xl font-semibold text-text-primary">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-primary text-black font-extrabold py-4 px-8 rounded-full active:scale-95 transition-transform duration-200 shadow-lg shadow-primary/20"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-outside ml-5 mt-6 space-y-3 text-text-secondary text-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {instructions.map((step, index) => (
                  <li key={index} className="pl-2">{step}</li>
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
