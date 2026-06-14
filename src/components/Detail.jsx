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
      className="flex flex-col lg:flex-row p-6 items-center gap-8 lg:gap-16 pt-safe pb-safe"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-full lg:max-w-lg shadow-2xl rounded-3xl object-cover bg-white"
        />
      </motion.div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-gray-900 tracking-tight">
          {name}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-red-500">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-gray-800">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="bg-[#FFF2DB] rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8" />
              </div>
              <span className="capitalize text-xl font-semibold text-gray-800">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-4 pb-20 lg:pb-0">
          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Instructions</h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    {instructions.map((step, index) => (
                      <li key={index} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sticky action button for mobile */}
          <div className="fixed lg:relative bottom-[80px] lg:bottom-0 left-0 right-0 p-4 lg:p-0 bg-white/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-t border-gray-200 lg:border-none z-40 pb-safe lg:pb-0 flex justify-center shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] lg:shadow-none">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full max-w-md bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 px-6 rounded-full hover:from-red-600 hover:to-red-700 transition duration-300 shadow-lg shadow-red-500/30 flex items-center justify-center min-h-[56px] text-lg active:scale-[0.98]"
            >
              {showInstructions ? "Hide Instructions" : "View Instructions"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
