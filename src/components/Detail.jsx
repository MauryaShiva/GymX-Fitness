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
    // ✅ Wrap the main container in a motion.div for entry animation. Updated for mobile-first.
    <motion.div
      className="flex flex-col lg:flex-row items-center gap-0 lg:gap-16 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section: Full width on mobile for app feel */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 bg-[var(--color-surface)] flex justify-center items-center overflow-hidden lg:rounded-3xl shadow-2xl relative"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-auto max-h-[500px] object-cover mix-blend-screen"
        />
        {/* Gradient overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent lg:hidden"></div>
      </motion.div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 px-4 py-8 lg:p-0 -mt-8 lg:mt-0 relative z-10"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white tracking-tight">
          {name}
        </h1>
        <p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-bold text-red-400">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-bold text-white">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-5 p-4 rounded-2xl bg-[var(--color-surface)]/50 border border-gray-800 backdrop-blur-sm">
              <div className="bg-red-500/10 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 filter invert opacity-80" />
              </div>
              <span className="capitalize text-lg lg:text-xl text-gray-200 font-semibold">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section with app-style buttons */}
        <div className="mt-6">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-red-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-red-700 active:scale-95 transition-all duration-300 shadow-lg shadow-red-500/20"
          >
            {showInstructions ? "Hide Instructions" : "View Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">Steps</h3>
                  <ol className="list-decimal list-inside space-y-4 text-gray-300">
                    {instructions.map((step, index) => (
                      <li key={index} className="leading-relaxed pl-2 pb-2 border-b border-gray-800 last:border-0">{step}</li>
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
