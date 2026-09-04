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
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl bg-surface/50 border border-gray-800 backdrop-blur-sm"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-auto object-cover aspect-square mix-blend-screen"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 w-full lg:w-1/2"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold capitalize text-text-primary tracking-tight">
          {name}
        </h1>

        <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-bold text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-bold text-secondary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-wrap gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex items-center gap-3 bg-surface border border-gray-800 rounded-full px-4 py-2 shadow-sm">
              <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-6 h-6 invert" />
              </div>
              <span className="capitalize font-semibold text-text-primary">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-surface rounded-2xl p-6 border border-gray-800 shadow-lg">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between text-left text-xl font-bold text-text-primary focus:outline-none"
          >
            Instructions
            <span className={`transform transition-transform duration-300 ${showInstructions ? 'rotate-180 text-primary' : 'text-text-secondary'}`}>
              ▼
            </span>
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-inside mt-6 space-y-4 text-text-secondary overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {instructions.map((step, index) => (
                  <li key={index} className="pl-2 leading-relaxed">{step}</li>
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
