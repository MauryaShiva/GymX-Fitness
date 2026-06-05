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
    // Re-designed for dark theme PWA
    <motion.div
      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 pt-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 flex justify-center bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full object-cover mix-blend-screen scale-105"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white tracking-tight mb-4">
            {name}
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
            Exercises keep you strong.{" "}
            <span className="capitalize font-bold text-red-500">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-bold text-gray-200">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {extraDetail.map((item) => (
            <motion.div
              key={item.name}
              className="flex items-center gap-6 bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-gray-700 rounded-xl w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-inner">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 opacity-80" />
              </div>
              <span className="capitalize text-xl font-semibold text-gray-200">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Interactive Instructions Section */}
        <div className="mt-4 mb-24 md:mb-0">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-gray-800 border border-gray-700 text-white font-bold py-4 px-8 rounded-xl hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <ol className="list-decimal list-outside ml-5 space-y-3 text-gray-300 bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2 leading-relaxed">{step}</li>
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
