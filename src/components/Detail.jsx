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
      <motion.div
        variants={itemVariants}
        className="w-full lg:max-w-xl bg-surface md:rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10" />
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full object-cover mix-blend-screen"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full px-5 md:px-0"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white tracking-tight">
          {name}
        </h1>
        <p className="text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl">
          Exercises keep you strong.{" "}
          <span className="capitalize font-bold text-white">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-bold text-white">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-wrap gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex items-center gap-4 bg-gray-900/50 border border-gray-800 rounded-2xl p-4 pr-6">
              <div className="bg-primary/20 rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 invert" />
              </div>
              <span className="capitalize text-lg font-semibold text-gray-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section with Sticky Button Mobile */}
        <div className="mt-6 md:mt-8">
          <div className="sticky bottom-20 md:static z-40 bg-background/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-0 -mx-5 md:mx-0 border-t border-gray-800 md:border-0 pb-safe md:pb-0">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full md:w-auto bg-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-red-500/20 active:scale-95 transition-all text-lg"
            >
              {showInstructions ? "Hide Instructions" : "Read Instructions"}
            </button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-outside ml-5 mt-8 space-y-4 text-gray-300 text-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {instructions.map((step, index) => (
                  <li key={index} className="pl-2 marker:text-primary marker:font-bold">{step}</li>
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
