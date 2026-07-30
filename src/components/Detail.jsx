import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Play, CheckCircle2 } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div>Loading details...</div>;
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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start md:gap-10 md:p-5">
      {/* Mobile-first Hero Image */}
      <div className="w-full relative h-[50vh] md:h-auto md:w-1/2 md:max-w-lg shrink-0 bg-white">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover md:rounded-2xl md:shadow-2xl"
        />
        {/* Gradient overlay for mobile back button visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background md:hidden"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 w-full px-5 pt-6 md:pt-0 pb-20 md:pb-0 relative z-10 -mt-10 md:mt-0"
      >
        <div className="mb-2">
          <motion.div variants={itemVariants} className="flex gap-2 mb-3">
             <span className="bg-primary/20 text-primary text-xs font-bold rounded-full capitalize py-1 px-3">
              {bodyParts[0]}
            </span>
             <span className="bg-gray-800 text-gray-300 text-xs font-bold rounded-full capitalize py-1 px-3">
              {targetMuscles[0]}
            </span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold capitalize text-white tracking-tight leading-tight">
            {name}
          </motion.h1>
        </div>

        <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-400 leading-relaxed">
          Exercises keep you strong. <span className="capitalize font-semibold text-gray-200">{name}</span> is one of the
          best exercises to target your <span className="font-semibold text-gray-200">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </motion.p>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 my-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-col items-center justify-center p-4 bg-surface rounded-2xl border border-gray-800 shadow-lg shadow-black/20">
              <div className="bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <img src={item.icon} alt={item.alt} className="w-6 h-6 invert" />
              </div>
              <span className="text-xs text-gray-500 font-medium mb-1">{item.label}</span>
              <span className="capitalize text-sm font-bold text-gray-200 text-center line-clamp-1">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Interactive Instructions Section */}
        <motion.div variants={itemVariants} className="mt-4">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between bg-surface border border-gray-800 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 transition duration-300 shadow-md focus:outline-none"
          >
            <span className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="text-primary w-5 h-5" />
              How to perform
            </span>
            {showInstructions ? <ChevronUp className="w-6 h-6 text-gray-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-surface mt-2 rounded-xl border border-gray-800">
                  <ol className="space-y-4">
                    {instructions.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                        <p className="text-gray-300 pt-1 leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Sticky Action Button for Mobile */}
        <motion.div variants={itemVariants} className="fixed md:static bottom-20 md:bottom-auto left-4 right-4 md:left-auto md:right-auto md:mt-4 z-40">
           <button className="w-full bg-primary hover:bg-red-600 text-white font-bold py-4 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-lg transition-transform active:scale-95">
             <Play className="w-5 h-5 fill-current" />
             Start Exercise
           </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Detail;