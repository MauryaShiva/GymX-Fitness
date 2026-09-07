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
      className="flex flex-col lg:flex-row pb-5 md:p-5 items-center gap-6 md:gap-10 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="w-full relative" variants={itemVariants}>
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-[300px] sm:h-[400px] md:h-auto md:max-w-md lg:max-w-lg object-cover shadow-lg md:rounded-lg -mt-4 md:mt-0"
        />
        {/* Gradient overlay for mobile back button visibility if needed */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent md:hidden" />
      </motion.div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 md:gap-6 w-full px-4 md:px-0"
      >
        <h1 className="text-3xl lg:text-5xl font-bold capitalize text-gray-800">
          {name}
        </h1>
        <p className="text-base lg:text-lg text-gray-600">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-4 md:gap-6 bg-white p-3 md:p-0 rounded-xl shadow-sm md:shadow-none border border-gray-100 md:border-none">
              <div className="bg-[#FFF2DB] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 md:w-11 md:h-11" />
              </div>
              <span className="capitalize text-lg lg:text-2xl font-medium text-gray-700">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section with sticky button on mobile */}
        <div className="mt-4 pb-20 md:pb-0">
          <div className="sticky bottom-20 md:static z-20 w-full flex justify-center md:justify-start">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="bg-red-500 text-white font-bold py-3 px-8 rounded-full md:rounded-md hover:bg-red-600 transition duration-300 shadow-xl md:shadow-none w-[90%] md:w-auto active:scale-95 transform"
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
                <ol className="list-decimal list-inside mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-3 text-gray-600 leading-relaxed">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2">{step}</li>
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
