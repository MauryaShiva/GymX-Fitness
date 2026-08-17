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
      className="flex flex-col lg:flex-row p-4 sm:p-5 items-center gap-8 lg:gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center">
         <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-2xl rounded-2xl border border-gray-800"
        />
      </motion.div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-5 lg:gap-6 w-full lg:w-1/2"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold capitalize text-text-primary">
          {name}
        </h1>
        <p className="text-base md:text-lg text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-secondary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-4 p-3 rounded-xl bg-surface/50 border border-gray-800 hover:bg-surface transition-colors">
              <div className="bg-primary/20 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <span className="capitalize text-lg md:text-xl font-medium text-text-primary">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-4 md:mt-6 w-full">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-primary text-background font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                 <ol className="list-decimal list-outside ml-4 space-y-3 text-text-secondary text-sm md:text-base bg-surface/30 p-5 rounded-xl border border-gray-800">
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
