import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-xl text-gray-500">Loading details...</div>
      </div>
    );
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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row pb-24 md:pb-12 pt-4 md:pt-10 items-start gap-8 lg:gap-16 w-full max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Mobile-first Hero Image - Full width on mobile, rounded on desktop */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 -mx-4 md:mx-0 relative bg-white dark:bg-gray-900 md:rounded-3xl shadow-sm md:shadow-xl overflow-hidden flex items-center justify-center aspect-square md:aspect-auto p-4 md:p-8 border-b md:border border-gray-100 dark:border-gray-800"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 px-4 md:px-0"
      >
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
             <span className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {bodyParts[0]}
             </span>
             <span className="bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {targetMuscles[0]}
             </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold capitalize text-gray-900 dark:text-white tracking-tight leading-tight">
            {name}
          </h1>
        </div>

        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Consistent training is key to progress. <span className="capitalize font-semibold text-gray-900 dark:text-white">{name}</span> is an excellent exercise specifically designed to target your <span className="font-semibold text-gray-900 dark:text-white">{targetMuscles[0]}</span>. Incorporating this into your routine will help build strength and improve overall fitness.
        </p>

        {/* Extra Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="bg-red-100 dark:bg-gray-800 rounded-xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0 shadow-sm">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 md:w-8 md:h-8 opacity-80" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1 hidden md:block">
                  {item.alt.split(" ")[0]}
                </p>
                <span className="capitalize text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions Section */}
        <div className="mt-4 md:mt-8">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98]"
          >
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Step-by-Step Instructions
            </span>
            {showInstructions ? (
              <ChevronUp className="text-red-500 w-6 h-6" />
            ) : (
              <ChevronDown className="text-red-500 w-6 h-6" />
            )}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                  <ol className="space-y-4">
                    {instructions.map((step, index) => (
                      <li key={index} className="flex gap-4 text-gray-700 dark:text-gray-300">
                        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-bold text-sm">
                          {index + 1}
                        </span>
                        <span className="mt-1 leading-relaxed">{step}</span>
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
