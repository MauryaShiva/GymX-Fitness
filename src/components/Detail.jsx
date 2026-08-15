import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";
import { Info, Play } from "lucide-react";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return (
      <div className="flex justify-center items-center h-64 text-text-secondary">
        Loading details...
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
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row p-0 md:p-5 items-start lg:items-center gap-8 lg:gap-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 relative bg-surface rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none md:hidden" />
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-[40vh] md:h-auto max-h-[600px] object-cover mix-blend-screen"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20 md:hidden">
           <h1 className="text-3xl font-bold capitalize text-text-primary drop-shadow-lg leading-tight">
            {name}
          </h1>
        </div>
      </motion.div>

      {/* Details Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 px-4 md:px-0"
      >
        <h1 className="hidden md:block text-4xl lg:text-5xl font-extrabold capitalize text-text-primary tracking-tight">
          {name}
        </h1>

        <p className="text-base lg:text-lg text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-2">
          {extraDetail.map((item) => (
            <div
              key={item.name}
              className="flex flex-row items-center gap-4 bg-surface p-4 rounded-2xl border border-gray-800 shadow-sm"
            >
              <div className="bg-primary/20 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 filter brightness-0 invert" />
              </div>
              <span className="capitalize text-sm md:text-base font-semibold text-text-primary">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Instructions Section */}
        <div className="mt-6 bg-surface border border-gray-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:bg-gray-800 transition-colors hover:bg-gray-800/50"
          >
            <div className="flex items-center gap-3">
              <Info className="text-primary h-6 w-6" />
              <span className="font-bold text-lg text-text-primary">Step-by-Step Instructions</span>
            </div>
            <motion.div
              animate={{ rotate: showInstructions ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-text-secondary"
            >
              ▼
            </motion.div>
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-800"
              >
                <ol className="list-decimal list-outside ml-5 space-y-4 text-text-secondary p-5 pl-8">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2 leading-relaxed">
                      {step}
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
