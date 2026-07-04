import React, { useState } from "react";
// ✅ Import 'motion' and 'AnimatePresence' for animations
import { motion, AnimatePresence } from "framer-motion";

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
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part icon" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle icon" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment icon" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 pt-0 md:pt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Edge-to-edge image on mobile */}
      <motion.div variants={itemVariants} className="w-full -mx-4 px-4 md:mx-0 md:px-0 lg:max-w-xl md:w-1/2">
        <div className="relative w-full overflow-hidden bg-white shadow-xl md:rounded-3xl border-b border-gray-800 md:border-0 md:shadow-primary/10">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-[45vh] md:h-auto object-cover md:object-contain object-center scale-110"
          />
          {/* Gradient overlay just for mobile to blend with background below */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent md:hidden pointer-events-none"></div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 w-full lg:w-1/2 px-4 md:px-0 z-10"
      >
        <div>
          <div className="flex gap-2 mb-3">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {bodyParts[0]}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold capitalize tracking-tight text-white mb-4">
            {name}
          </h1>
          <p className="text-base lg:text-lg text-text-secondary leading-relaxed">
            Exercises keep you strong. <span className="capitalize font-semibold text-text-primary">{name}</span> is one of the
            best exercises to target your <span className="font-semibold text-text-primary">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        <div className="flex flex-col gap-4 my-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-5 p-4 rounded-2xl bg-surface border border-gray-800 shadow-sm">
              <div className="bg-primary/20 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 filter brightness-0 invert opacity-80" />
              </div>
              <span className="capitalize text-lg font-semibold text-text-primary">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* App-style sticky actions / instructions toggle */}
        <div className="mt-2 md:mt-6">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-primary text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {showInstructions ? "Hide Instructions" : "View Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                className="mt-6 p-6 rounded-2xl bg-surface border border-gray-800 overflow-hidden"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
              >
                <h3 className="text-xl font-bold mb-4 text-white">How to perform</h3>
                <ol className="list-decimal list-outside ml-4 space-y-3 text-text-secondary">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2 leading-relaxed">{step}</li>
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
