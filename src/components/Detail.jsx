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
      className="flex flex-col lg:flex-row p-2 md:p-5 items-center gap-8 lg:gap-16 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-red-800 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="relative w-full aspect-[4/5] object-cover rounded-2xl md:rounded-3xl shadow-2xl border border-gray-700/50"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 px-2"
      >
        <div className="flex flex-wrap gap-2">
           <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-primary/30">
            {targetMuscles[0]}
          </span>
           <span className="bg-surface text-text-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-gray-700">
            {bodyParts[0]}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black capitalize text-white tracking-tight">
          {name}
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Exercises keep you strong. <span className="capitalize font-semibold text-white">{name}</span> is one of the best exercises to target your <span className="font-semibold text-white">{targetMuscles[0]}</span>. It will help you improve your mood and gain energy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-4 bg-surface/50 p-4 rounded-2xl border border-gray-800 backdrop-blur-sm">
              <div className="bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-6 h-6 brightness-0 invert opacity-70" />
              </div>
              <span className="capitalize text-sm font-semibold text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full sm:w-auto bg-surface text-white font-bold py-4 px-8 rounded-xl border border-gray-700 shadow-lg active:scale-95 transition-all duration-300 flex justify-center items-center gap-2 hover:bg-gray-800"
          >
            {showInstructions ? "Hide Instructions" : "View Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <ol className="list-decimal list-inside mt-6 space-y-4 text-text-secondary bg-surface/30 p-6 rounded-2xl border border-gray-800/50">
                  {instructions.map((step, index) => (
                    <li key={index} className="leading-relaxed pl-2 text-sm sm:text-base">
                      <span className="text-white ml-2">{step}</span>
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
