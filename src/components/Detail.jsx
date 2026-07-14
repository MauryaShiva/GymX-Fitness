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
    <motion.div
      className="flex flex-col lg:flex-row items-center gap-10 md:p-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section - Full width on mobile, rounded on desktop */}
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative bg-white lg:rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden"></div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-5 lg:gap-8 w-full lg:w-1/2 px-4 md:px-0"
      >
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
             <span className="bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full border border-primary/30">
                {bodyParts[0]}
             </span>
             <span className="bg-surface text-text-secondary text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full border border-gray-700">
                {targetMuscles[0]}
             </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-text-primary tracking-tight">
            {name}
          </h1>
        </div>

        <p className="text-lg lg:text-xl text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-bold text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-bold text-text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row sm:flex-col items-center gap-4 bg-surface p-4 rounded-2xl border border-gray-800">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 filter invert brightness-0 sepia-0 hue-rotate-0 saturate-0" style={{ filter: 'brightness(0) saturate(100%) invert(42%) sepia(87%) saturate(2250%) hue-rotate(337deg) brightness(97%) contrast(98%)' }} />
              </div>
              <span className="capitalize text-lg font-semibold text-text-primary">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Instructions Section */}
        <div className="mt-2 mb-20 md:mb-0">
          {/* Sticky Action Button on Mobile */}
          <div className="fixed bottom-20 md:relative md:bottom-auto left-0 right-0 px-4 md:px-0 z-40 md:z-auto">
             <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full bg-primary text-white font-bold py-4 px-6 rounded-2xl hover:bg-red-600 transition-colors duration-300 shadow-xl shadow-primary/30 flex items-center justify-center gap-2 text-lg active:scale-95 transform"
            >
              {showInstructions ? "Hide Instructions" : "View Instructions"}
            </button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden bg-surface rounded-2xl border border-gray-800"
              >
                <ol className="list-decimal list-inside p-6 space-y-4 text-text-secondary text-base lg:text-lg">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2 leading-relaxed">
                      <span className="text-text-primary ml-2">{step}</span>
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
