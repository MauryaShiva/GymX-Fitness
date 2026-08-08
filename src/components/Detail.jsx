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
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row p-4 sm:p-5 items-center gap-8 lg:gap-16 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Large Hero GIF Section */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-lg lg:max-w-2xl bg-surface p-2 sm:p-4 rounded-3xl shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-auto object-cover rounded-2xl relative z-10"
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold capitalize text-white tracking-tight leading-tight">
            {name}
          </h1>
          <p className="mt-4 text-base lg:text-lg text-text-secondary leading-relaxed">
            Exercises keep you strong. <span className="capitalize font-semibold text-primary">{name}</span> is one of the
            best exercises to target your <span className="font-semibold text-secondary">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        {/* Tags / Extra Details */}
        <div className="flex flex-col gap-4">
          {extraDetail.map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              className="flex flex-row items-center gap-5 p-3 rounded-2xl bg-surface/50 hover:bg-surface transition-colors border border-gray-800"
              whileHover={{ x: 10 }}
            >
              <div className="bg-primary/20 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0 shadow-inner">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md brightness-200" />
              </div>
              <span className="capitalize text-lg sm:text-xl font-medium text-white">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Interactive Instructions Section */}
        <div className="mt-2 sticky bottom-4 z-10 lg:static bg-background/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-2 lg:p-0 rounded-2xl">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between bg-primary text-black font-bold py-4 px-6 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_14px_0_rgba(3,218,198,0.39)] active:scale-95"
          >
            <span className="text-lg">Step-by-Step Instructions</span>
            {showInstructions ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <ol className="list-decimal list-outside ml-5 space-y-3 text-text-secondary text-base lg:text-lg bg-surface p-5 rounded-xl border border-gray-800">
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
