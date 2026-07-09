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
      className="flex flex-col lg:flex-row p-0 md:p-5 items-center gap-6 md:gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full relative">
        <motion.img
          variants={itemVariants}
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full lg:max-w-lg shadow-lg md:rounded-3xl mix-blend-multiply md:mix-blend-normal aspect-square object-contain bg-white"
        />
      </div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-5 lg:gap-6 w-full px-4 md:px-0"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold capitalize text-gray-900 tracking-tight">
          {name}
        </h1>
        <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-gray-900">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-gray-900">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-4 mt-2">
          {extraDetail.map((item) => (
            <motion.div whileTap={{ scale: 0.98 }} key={item.name} className="flex flex-row items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
              <div className="bg-[#FFF2DB] rounded-xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0 shadow-inner">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <span className="capitalize text-lg md:text-xl font-medium text-gray-800">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-6 mb-8 md:mb-0">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 md:py-3 px-8 rounded-2xl md:rounded-xl shadow-lg shadow-red-500/30 active:shadow-sm transition-all duration-300"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Instructions</h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2 leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
