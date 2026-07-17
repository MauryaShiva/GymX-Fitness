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
    // ✅ Apply the new app-style detail layout and premium dark theme
    <motion.div
      className="flex flex-col lg:flex-row w-full bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Large hero GIF section with edge-to-edge styling on mobile */}
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 bg-white/5 relative">
        <div className="w-full h-[40vh] md:h-[60vh] lg:h-full min-h-[300px] flex items-center justify-center p-4 lg:p-10 relative z-10 bg-white">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain max-w-lg mx-auto filter contrast-[1.05]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-20 h-full pointer-events-none" />
      </motion.div>

      {/* ✅ Enhanced text content with better spacing and typography */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 px-4 sm:px-8 py-6 lg:py-12 z-30 -mt-6 lg:mt-0"
      >
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold capitalize text-white tracking-tight leading-tight">
            {name}
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 mt-4 leading-relaxed font-medium">
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-gray-200">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-semibold text-primary">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row sm:flex-col items-center sm:items-start gap-4 p-4 rounded-2xl bg-surface border border-gray-800">
              <div className="bg-surface-hover rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0 shadow-inner">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 opacity-80" />
              </div>
              <span className="capitalize text-lg font-semibold text-gray-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section with premium styling */}
        <div className="mt-6">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-surface-hover hover:bg-gray-800 border border-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex justify-between items-center active:scale-[0.98]"
          >
            <span>{showInstructions ? "Hide Instructions" : "View Instructions"}</span>
            <span className="text-primary font-bold text-xl">{showInstructions ? "−" : "+"}</span>
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <ol className="list-decimal list-outside ml-5 mt-6 space-y-4 text-gray-300 text-base leading-relaxed font-medium">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2 marker:text-primary marker:font-bold">{step}</li>
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
