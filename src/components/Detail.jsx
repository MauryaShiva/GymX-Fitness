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
      className="flex flex-col lg:flex-row items-center gap-10 lg:p-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="w-full lg:max-w-lg lg:shadow-2xl lg:rounded-3xl overflow-hidden bg-white flex justify-center -mx-4 lg:mx-0 sm:-mx-6"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full object-cover lg:rounded-3xl"
        />
      </motion.div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full px-4 lg:px-0"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white tracking-tight">
          {name}
        </h1>
        <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-bold text-red-400">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-bold text-red-400">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-5 mt-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-6 bg-surface p-4 rounded-2xl border border-gray-800">
              <div className="bg-[#FFF2DB] rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-inner">
                <img src={item.icon} alt={item.alt} className="w-8 h-8" />
              </div>
              <span className="capitalize text-xl lg:text-2xl font-semibold text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-6">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-4 px-8 rounded-xl hover:scale-105 active:scale-95 transition-transform duration-300 shadow-lg shadow-red-500/20"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <ol className="list-decimal list-outside ml-5 space-y-4 text-gray-300 text-lg">
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
