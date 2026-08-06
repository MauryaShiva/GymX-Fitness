import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayArrow, Info } from "@mui/icons-material";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div className="text-white text-center py-10">Loading details...</div>;
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part icon" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle icon" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment icon" },
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
      className="flex flex-col lg:flex-row gap-8 lg:gap-16 pt-safe-top"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section - Larger, App-style */}
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative">
        <div className="aspect-square md:aspect-[4/3] lg:aspect-square bg-surface rounded-3xl overflow-hidden shadow-2xl border border-gray-800 relative group">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold capitalize text-white mb-4 tracking-tight">
            {name}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-white">{name}</span>{" "}
            is one of the best exercises to target your{" "}
            <span className="font-semibold text-white">{targetMuscles[0]}</span>.
            It will help you improve your mood and gain energy.
          </p>
        </div>

        {/* Extra Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {extraDetail.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05 }}
              className="bg-surface border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-lg"
            >
              <div className="bg-primary/20 rounded-full w-14 h-14 flex items-center justify-center">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 filter invert sepia saturate-0 hue-rotate-[175deg] brightness-200" />
              </div>
              <span className="capitalize text-lg font-bold text-white text-center">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Sticky Action Buttons */}
        <div className="sticky bottom-20 md:static z-40 bg-background/80 backdrop-blur-md py-4 md:py-0 border-t border-gray-800 md:border-none mt-4 md:mt-0 flex gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex-1 bg-primary text-background font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-lg"
          >
            <Info />
            {showInstructions ? "Hide Instructions" : "How to do it"}
          </motion.button>
          <motion.a
            whileTap={{ scale: 0.95 }}
            href="#videos"
            className="flex-1 bg-surface border border-gray-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-lg hover:bg-gray-800 transition-colors"
          >
            <PlayArrow />
            Watch Video
          </motion.a>
        </div>

        {/* Instructions Panel */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-surface border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-4">Instructions</h3>
                <ol className="list-decimal list-inside space-y-4 text-gray-300 text-lg">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2 leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
