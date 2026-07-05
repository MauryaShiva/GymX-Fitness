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
    // ✅ Wrap the main container in a motion.div for entry animation
    <motion.div
      className="flex flex-col lg:flex-row p-5 items-center gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.img
        variants={itemVariants}
        src={gifUrl}
        alt={name}
        loading="lazy"
        className="w-full max-w-md lg:max-w-lg shadow-lg rounded-lg"
      />

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-5 lg:gap-6 w-full"
      >
        <h1 className="text-3xl lg:text-5xl font-extrabold capitalize text-white tracking-tight">
          {name}
        </h1>
        <p className="text-base lg:text-lg text-gray-400">
          Exercises keep you strong.{" "}
          <span className="capitalize font-bold text-white">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-bold text-white">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        {extraDetail.map((item) => (
          <div key={item.name} className="flex flex-row items-center gap-6 p-4 rounded-xl bg-surface border border-gray-800">
            <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
              <img src={item.icon} alt={item.alt} className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <span className="capitalize text-lg lg:text-xl font-semibold text-gray-200">
              {item.name}
            </span>
          </div>
        ))}

        {/* ✅ Interactive Instructions Section with Sticky Action */}
        <div className="mt-8 md:mt-4 pb-safe">
          <div className="sticky bottom-20 md:static z-40 bg-background/80 backdrop-blur-md p-4 md:p-0 border-t border-gray-800 md:border-none -mx-4 md:mx-0">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full md:w-auto bg-red-600 text-white font-bold py-4 md:py-3 px-8 rounded-xl hover:bg-red-700 transition duration-300 shadow-lg shadow-red-500/20 active:scale-95"
            >
              {showInstructions ? "Hide Instructions" : "Show Instructions"}
            </button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-outside ml-5 mt-6 space-y-4 text-gray-300"
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
