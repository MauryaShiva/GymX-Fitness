import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div className="text-white text-center">Loading details...</div>;
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part icon", label: "Body Part" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle icon", label: "Target" },
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
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section - Full width on mobile, max-w on desktop */}
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl shadow-red-500/10 border border-gray-800 bg-gray-900 relative">
        <div className="aspect-square w-full relative">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white tracking-tight leading-tight">
            {name}
          </h1>
          <p className="text-base lg:text-lg text-gray-400 mt-4 leading-relaxed">
            Exercises keep you strong. <span className="capitalize font-semibold text-white">{name}</span> is one of the best exercises to target your <span className="font-semibold text-white">{targetMuscles[0]}</span>. It will help you improve your mood and gain energy.
          </p>
        </div>

        {/* Tags / Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex items-center gap-4 bg-gray-900/50 border border-gray-800 p-4 rounded-2xl backdrop-blur-md">
              <div className="bg-red-500/20 p-3 rounded-xl flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 filter invert" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">{item.label}</span>
                <span className="capitalize text-lg font-bold text-white leading-tight">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions Section */}
        <div className="mt-2 mb-20 lg:mb-0">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-4 px-8 rounded-2xl hover:bg-gray-700 active:scale-95 transition-all duration-300 border border-gray-700"
          >
            <Play className="w-5 h-5 text-red-500" />
            {showInstructions ? "Hide Instructions" : "Read Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 lg:p-8">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    Step-by-Step Guide
                  </h3>
                  <ol className="space-y-6">
                    {instructions.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-600/20 text-red-500 font-bold text-sm">
                          {index + 1}
                        </span>
                        <p className="text-gray-300 leading-relaxed pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Sticky Action Button */}
        <div className="lg:hidden fixed bottom-[72px] left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-40 pointer-events-none">
          <button
            className="w-full bg-red-600 text-white font-bold py-4 rounded-full shadow-lg shadow-red-600/30 active:scale-95 transition-transform pointer-events-auto"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
