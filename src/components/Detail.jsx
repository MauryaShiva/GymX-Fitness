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
      className="flex flex-col lg:flex-row p-0 lg:p-5 items-center gap-0 lg:gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.img
        variants={itemVariants}
        src={gifUrl}
        alt={name}
        loading="lazy"
        className="w-full aspect-square object-cover mb-4 lg:mb-0 lg:max-w-lg lg:rounded-lg shadow-xl"
      />

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-5 lg:gap-6 w-full px-4 lg:px-0"
      >
        <h1 className="text-3xl lg:text-5xl font-bold capitalize text-text-primary">
          {name}
        </h1>
        <p className="text-base lg:text-lg text-text-secondary">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        {extraDetail.map((item) => (
          <div key={item.name} className="flex flex-row items-center gap-6 p-2 rounded-xl hover:bg-surface transition-colors">
            <div className="bg-surface border border-gray-800 rounded-full w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center flex-shrink-0 shadow-inner">
              <img src={item.icon} alt={item.alt} className="w-8 h-8 lg:w-11 lg:h-11 filter invert brightness-0 opacity-80" />
            </div>
            <span className="capitalize text-lg lg:text-2xl text-text-primary font-medium">
              {item.name}
            </span>
          </div>
        ))}

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-4 sticky bottom-safe z-40 bg-background/95 backdrop-blur-md p-4 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:static md:shadow-none md:p-0 md:bg-transparent">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-primary text-background font-bold py-3 px-8 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-inside mt-6 space-y-3 text-text-secondary"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {instructions.map((step, index) => (
                  <li key={index} className="leading-relaxed">{step}</li>
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
