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
      className="flex flex-col lg:flex-row items-center gap-10 md:p-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center bg-gray-900 rounded-3xl p-4 shadow-xl border border-gray-800">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-md lg:max-w-lg rounded-2xl mix-blend-screen opacity-90"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 px-4 md:px-0"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white tracking-tight">
          {name}
        </h1>
        <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize text-red-400 font-bold">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="text-red-400 font-bold">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-6">
              <div className="bg-gray-800 rounded-2xl w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-inner border border-gray-700">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 opacity-80" />
              </div>
              <span className="capitalize text-xl lg:text-2xl text-gray-200 font-medium">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-4 px-8 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-red-500/20"
          >
            {showInstructions ? "Hide Instructions" : "Read Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden bg-gray-900 border border-gray-800 rounded-2xl p-6"
              >
                <ol className="list-decimal list-inside space-y-4 text-gray-300 text-lg">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2 leading-relaxed marker:text-red-500 marker:font-bold">
                      <span className="ml-2">{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
