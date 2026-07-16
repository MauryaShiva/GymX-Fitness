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
      className="flex flex-col lg:flex-row items-center gap-10 relative pb-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.img
        variants={itemVariants}
        src={gifUrl}
        alt={name}
        loading="lazy"
        className="w-full h-auto object-cover max-w-md lg:max-w-lg shadow-lg rounded-b-3xl md:rounded-3xl"
      />

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-5 lg:gap-6 w-full px-5"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white tracking-tight">
          {name}
        </h1>
        <p className="text-base lg:text-lg text-gray-300">
          Exercises keep you strong.{" "}
          <span className="capitalize font-bold text-red-500">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-bold text-red-500">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        {extraDetail.map((item) => (
          <div key={item.name} className="flex flex-row items-center gap-6 bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
            <div className="bg-red-500/20 rounded-xl w-16 h-16 flex items-center justify-center flex-shrink-0">
              <img src={item.icon} alt={item.alt} className="w-8 h-8 filter brightness-0 invert opacity-80" />
            </div>
            <span className="capitalize text-lg lg:text-2xl text-gray-200 font-semibold">
              {item.name}
            </span>
          </div>
        ))}

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-4 w-full">
          {/* ✅ Sticky Action Button for mobile feel */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="fixed md:static bottom-24 md:bottom-auto left-[5%] md:left-auto w-[90%] md:w-auto bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:scale-105 transition-all duration-300 z-40 text-center text-lg"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-inside mt-4 space-y-3 text-gray-300 bg-gray-900 p-6 rounded-2xl border border-gray-800"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {instructions.map((step, index) => (
                  <li key={index}>{step}</li>
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
