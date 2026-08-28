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
      className="flex flex-col lg:flex-row p-0 md:p-5 items-center gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 flex justify-center bg-surface/30 md:bg-transparent rounded-b-3xl md:rounded-3xl p-4 md:p-0 shadow-xl"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl object-cover mix-blend-screen"
          style={{ filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.2))' }}
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full px-4 md:px-0"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-text-primary tracking-tight">
          {name}
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-4">
          {extraDetail.map((item) => (
            <motion.div
              key={item.name}
              className="flex flex-row items-center gap-6 bg-surface/50 p-4 rounded-2xl border border-gray-800"
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 filter brightness-0 invert" />
              </div>
              <span className="capitalize text-xl font-medium text-text-primary">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-red-500/20 text-lg sticky bottom-24 md:static z-10"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-surface/50 border border-gray-800 rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-4 text-primary">Instructions</h3>
                  <ol className="list-decimal list-inside space-y-4 text-text-secondary">
                    {instructions.map((step, index) => (
                      <li key={index} className="leading-relaxed pl-2">
                        <span className="text-text-primary">{step}</span>
                      </li>
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
