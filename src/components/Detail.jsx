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
      className="flex flex-col lg:flex-row p-2 sm:p-5 items-center gap-8 lg:gap-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-[500px] h-auto object-cover shadow-2xl rounded-3xl border border-gray-800 bg-gray-900"
        />
      </motion.div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-5 lg:gap-6 w-full lg:w-1/2"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white tracking-tight">
          {name}
        </h1>
        <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-bold text-red-500">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-bold text-red-500">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-4 bg-gray-800 rounded-full px-5 py-3 shadow-md">
              <div className="bg-red-500/20 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-6 h-6 brightness-0 invert" />
              </div>
              <span className="capitalize text-base font-semibold text-gray-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-8 pb-16 md:pb-0">
          <div className="fixed bottom-20 left-4 right-4 md:static z-40">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-red-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
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
                <ol className="list-decimal list-inside space-y-4 text-gray-300 bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                  {instructions.map((step, index) => (
                    <li key={index} className="leading-relaxed pl-2">{step}</li>
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
