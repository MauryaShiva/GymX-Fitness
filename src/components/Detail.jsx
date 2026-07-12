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
      className="flex flex-col lg:flex-row p-4 md:p-8 items-start md:items-center gap-8 md:gap-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center bg-white rounded-[40px] shadow-2xl p-4 md:p-8">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full object-cover aspect-square md:aspect-auto rounded-3xl"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black capitalize text-white tracking-tight">
          {name}
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-gray-200">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-gray-200">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-6">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-6">
              <div className="bg-gray-800 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0 shadow-lg border border-gray-700">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 md:w-10 md:h-10 brightness-200" />
              </div>
              <span className="capitalize text-xl md:text-2xl font-semibold text-gray-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons wrapped in sticky container for mobile */}
        <div className="fixed bottom-[64px] left-0 md:static w-full bg-black/90 md:bg-transparent p-4 md:p-0 border-t border-gray-800 md:border-none z-40 pb-safe md:pb-0 mt-8">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-red-600 text-white font-bold py-4 md:py-3 px-8 rounded-full md:rounded-xl hover:bg-red-700 transition duration-300 shadow-lg shadow-red-600/30 text-lg md:text-base active:scale-95"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </button>
        </div>

        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <ol className="list-decimal list-inside mt-6 space-y-4 text-gray-300 bg-gray-900 p-6 rounded-2xl border border-gray-800">
                {instructions.map((step, index) => (
                  <li key={index} className="leading-relaxed pl-2">{step}</li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
