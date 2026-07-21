import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Play, Dumbbell, Target } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(true);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div>Loading details...</div>;
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part icon", label: "Body Part" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle icon", label: "Target Muscle" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment icon", label: "Equipment" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 pt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 rounded-3xl overflow-hidden bg-surface shadow-2xl border border-gray-800 sticky top-24"
      >
        <div className="aspect-square relative">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-5xl font-extrabold capitalize text-white drop-shadow-lg leading-tight">
              {name}
            </h1>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col w-full lg:w-1/2"
      >
        <div className="bg-surface border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl mb-8">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-primary">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-semibold text-primary">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {extraDetail.map((item) => (
              <div key={item.name} className="flex flex-col items-center bg-gray-900/50 rounded-2xl p-4 border border-gray-800">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                  <img src={item.icon} alt={item.alt} className="w-8 h-8 filter invert" />
                </div>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">{item.label}</span>
                <span className="capitalize text-lg font-bold text-white text-center">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center justify-between w-full focus:outline-none group"
          >
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-white">Instructions</h3>
            </div>
            <motion.div
              animate={{ rotate: showInstructions ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400 group-hover:text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </motion.div>
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <ol className="mt-6 space-y-4">
                  {instructions.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold text-sm border border-red-500/30">
                        {index + 1}
                      </span>
                      <p className="text-gray-300 leading-relaxed pt-1">{step}</p>
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
