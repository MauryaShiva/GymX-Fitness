import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
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
      className="flex flex-col lg:flex-row items-center gap-6 md:gap-10 pb-20 md:pb-0" // Add bottom padding for mobile sticky button
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full md:p-5">
        <div className="w-full aspect-square md:aspect-auto max-w-md lg:max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover mix-blend-multiply" // Better blend for gifs on light backgrounds
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-5 lg:gap-6 w-full px-4 md:px-5"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold capitalize text-gray-900 tracking-tight">
          {name}
        </h1>
        <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-red-500">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-red-500">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 my-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row md:flex-col items-center md:justify-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="bg-[#FFF2DB] rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <span className="capitalize text-lg font-semibold text-gray-800 md:text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile Sticky Instructions Button, Desktop Inline */}
        <div className="mt-4">
          <div className="fixed md:static bottom-[64px] md:bottom-auto left-0 w-full md:w-auto px-4 md:px-0 py-3 md:py-0 bg-white/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-t border-gray-200 md:border-none z-30 pb-safe">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full md:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 md:py-3 px-8 rounded-full md:rounded-xl shadow-lg shadow-red-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-lg md:text-base"
            >
              {showInstructions ? "Hide Instructions" : "Show Instructions"}
            </button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Step-by-step Instructions</h3>
                  <ol className="list-decimal list-outside ml-4 space-y-3 text-gray-700 leading-relaxed">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2">{step}</li>
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
