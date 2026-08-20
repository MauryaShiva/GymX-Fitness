import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Play } from "lucide-react";

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
    { icon: BodyPartImage, name: bodyParts[0], alt: "Body Part" },
    { icon: TargetImage, name: targetMuscles[0], alt: "Target Muscle" },
    { icon: EquipmentImage, name: equipments[0], alt: "Equipment" },
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
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const handleScrollToVideos = () => {
    document.getElementById("exercise-videos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Image Section - App Style */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-800 mx-auto max-w-lg lg:max-w-none"
      >
        <div className="aspect-square relative w-full flex items-center justify-center p-4">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {extraDetail.map((item, idx) => (
             <div key={idx} className="w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center backdrop-blur-md tooltip" title={item.name}>
               <img src={item.icon} alt={item.alt} className="w-5 h-5 opacity-80" />
             </div>
          ))}
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-3xl lg:text-5xl font-extrabold capitalize text-white mb-4 tracking-tight leading-tight">
            {name}
          </h1>
          <p className="text-base lg:text-lg text-text-secondary leading-relaxed">
            Exercises keep you strong. <span className="capitalize font-bold text-white">{name}</span> is one of the
            best exercises to target your <span className="font-bold text-white">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        {/* Info Pills */}
        <div className="flex flex-wrap gap-3 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex items-center gap-2 bg-surface border border-gray-700 rounded-full py-2 px-4 shadow-sm">
              <div className="bg-primary/20 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                <img src={item.icon} alt={item.alt} className="w-4 h-4 brightness-0 invert" />
              </div>
              <span className="capitalize text-sm font-semibold text-gray-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Sticky Action Button (Mobile) & Standard Button (Desktop) */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-gray-800 z-40 lg:static lg:bg-transparent lg:border-0 lg:p-0 lg:mt-4 md:hidden">
          <button
             onClick={handleScrollToVideos}
             className="w-full bg-primary hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            Watch Tutorial
          </button>
        </div>

        {/* Desktop Only Button */}
        <button
             onClick={handleScrollToVideos}
             className="hidden md:flex w-full lg:w-auto bg-primary hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 items-center justify-center gap-2 transition-all active:scale-95 mt-4"
          >
            <Play className="w-5 h-5 fill-current" />
            Watch Tutorial
        </button>

        {/* Interactive Instructions Section */}
        <div className="mt-4 bg-surface rounded-2xl border border-gray-800 overflow-hidden">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between p-5 focus:outline-none bg-surface hover:bg-gray-800/50 transition-colors"
          >
            <span className="text-lg font-bold text-white">How to perform</span>
            {showInstructions ? (
              <ChevronUp className="w-5 h-5 text-text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-text-secondary" />
            )}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-5 pt-0 border-t border-gray-800">
                  <ol className="space-y-4">
                    {instructions.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-xs shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-300 leading-relaxed text-sm md:text-base">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Padding spacer for mobile sticky button */}
        <div className="h-24 lg:hidden"></div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
