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
      className="flex flex-col lg:flex-row items-start lg:items-center gap-10 mt-16 md:mt-24 mb-10 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden p-6 sm:p-8">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-auto object-contain mix-blend-multiply"
          />
        </div>
      </motion.div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 px-4 sm:px-0"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white tracking-tight">
          {name}
        </h1>
        <p className="text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-white">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-white">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-6 mt-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-6 p-4 rounded-2xl bg-gray-900 border border-gray-800 shadow-lg">
              <div className="bg-red-500/20 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0 border border-red-500/30">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 sm:w-10 sm:h-10 filter brightness-200" />
              </div>
              <span className="capitalize text-xl sm:text-2xl font-semibold text-gray-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-8 mb-20 md:mb-0">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-red-500/30 transition-all duration-300 text-lg"
          >
            {showInstructions ? "Hide Instructions" : "View Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <ol className="list-decimal list-inside space-y-4 text-gray-300 bg-gray-900 p-6 rounded-2xl border border-gray-800">
                  {instructions.map((step, index) => (
                    <li key={index} className="text-base sm:text-lg pl-2 leading-relaxed">
                      {step}
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
