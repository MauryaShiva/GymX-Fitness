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
      className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="-mx-4 md:mx-0 w-[calc(100%+2rem)] md:w-full max-w-md lg:max-w-lg overflow-hidden bg-surface shadow-2xl md:rounded-3xl flex justify-center"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full object-cover mix-blend-screen"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-5 lg:gap-8 w-full"
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

        <div className="flex flex-col gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-6 p-3 bg-surface/50 rounded-2xl border border-gray-800">
              <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <span className="capitalize text-xl lg:text-2xl text-white font-medium">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 pb-24 md:pb-0">
          <div className="fixed bottom-[80px] left-4 right-4 z-40 md:static md:w-auto">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full bg-red-600 text-white font-bold py-4 px-8 rounded-full hover:bg-red-700 active:scale-95 transform transition duration-300 shadow-xl shadow-red-500/20 text-lg"
            >
              {showInstructions ? "Hide Instructions" : "Show Instructions"}
            </button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-surface border border-gray-800 rounded-3xl p-6 lg:p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Instructions</h3>
                  <ol className="list-decimal list-outside ml-5 space-y-4 text-gray-300 text-lg">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2 leading-relaxed">{step}</li>
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
