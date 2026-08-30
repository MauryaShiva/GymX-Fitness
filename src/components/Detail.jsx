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
      className="flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-12 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Image Section - Full width on mobile, rounded on desktop */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 bg-white lg:rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none lg:hidden"></div>
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-[400px] sm:h-[500px] lg:h-auto lg:aspect-square object-cover mix-blend-multiply"
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 p-6 lg:p-0 -mt-6 lg:mt-0 bg-background lg:bg-transparent rounded-t-3xl lg:rounded-none relative z-20"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold capitalize text-text-primary tracking-tight">
          {name}
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-bold text-white">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-bold text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-wrap gap-4 sm:gap-6 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex items-center gap-4 bg-surface p-3 sm:p-4 rounded-2xl flex-1 min-w-[140px] shadow-sm border border-gray-800">
              <div className="bg-primary/20 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-6 h-6 brightness-200" />
              </div>
              <span className="capitalize text-sm sm:text-base font-bold text-text-primary">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Sticky-like Instructions Action */}
        <div className="mt-6 bg-surface p-5 sm:p-6 rounded-2xl border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-text-primary">Instructions</h3>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="bg-primary text-white font-bold py-2 px-4 rounded-full text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30"
            >
              {showInstructions ? "Hide" : "Show"}
            </button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-outside ml-5 space-y-4 text-text-secondary text-base"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                style={{ overflow: 'hidden' }}
              >
                {instructions.map((step, index) => (
                  <li key={index} className="pl-2 marker:text-primary marker:font-bold">
                    {step}
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
