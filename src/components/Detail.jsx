import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(true);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div className="p-8 text-center text-text-secondary">Loading details...</div>;
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
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-0 lg:gap-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Mobile-first Hero Image Area */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 relative bg-white lg:rounded-3xl overflow-hidden shadow-2xl -mt-20 md:mt-0 pt-20 md:pt-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 lg:hidden z-10 pointer-events-none" />
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-[50vh] lg:h-auto object-cover object-center mix-blend-multiply"
        />

        {/* Mobile Header Overlaid on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 lg:hidden">
          <div className="flex gap-2 mb-3">
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg">
              {targetMuscles[0]}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold capitalize text-white drop-shadow-md leading-tight">
            {name}
          </h1>
        </div>
      </motion.div>

      {/* Content Area */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 w-full lg:w-1/2 px-5 py-8 md:p-0"
      >
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="flex gap-2 mb-4">
            <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
              {targetMuscles[0]}
            </span>
          </div>
          <h1 className="text-5xl font-extrabold capitalize text-white mb-6">
            {name}
          </h1>
        </div>

        <p className="text-base lg:text-lg text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-white">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-white">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        {/* Feature Tags */}
        <div className="flex flex-col sm:flex-row gap-4 my-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex items-center gap-4 bg-surface p-4 rounded-2xl border border-gray-800 flex-1">
              <div className="bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-6 h-6 invert opacity-80" />
              </div>
              <span className="capitalize text-base font-semibold text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Instructions Section */}
        <div className="mt-4 bg-surface rounded-2xl border border-gray-800 overflow-hidden">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex justify-between items-center p-5 bg-gray-800/50 hover:bg-gray-800 transition-colors focus:outline-none"
          >
            <span className="text-lg font-bold text-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-primary" />
              Instructions
            </span>
            {showInstructions ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 pb-5 pt-2"
              >
                <ol className="space-y-4 text-text-secondary">
                  {instructions.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sticky Action Button for Mobile */}
        <div className="md:hidden fixed bottom-[72px] left-0 right-0 p-4 bg-gradient-to-t from-background via-background/90 to-transparent z-40 pointer-events-none">
          <button
            className="w-full py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/30 pointer-events-auto transform transition-transform active:scale-95"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            View Similar Exercises
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
