import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Play } from "lucide-react";

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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section */}
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 bg-white rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(3,218,198,0.15)] flex justify-center items-center p-4">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-lg object-contain mix-blend-multiply"
        />
      </motion.div>

      {/* Details Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 w-full lg:w-1/2"
      >
        <h1 className="text-4xl lg:text-5xl font-extrabold capitalize text-white tracking-tight">
          {name}
        </h1>
        <p className="text-lg lg:text-xl text-text-secondary leading-relaxed">
          Exercises keep you strong. <span className="capitalize font-semibold text-primary">{name}</span> is one of the
          best exercises to target your <span className="font-semibold text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-4 mt-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-6 p-4 bg-surface rounded-2xl border border-gray-800 shadow-md">
              <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 border border-primary/30">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 filter brightness-0 invert" style={{ filter: "brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(1000%) hue-rotate(130deg) brightness(95%) contrast(100%)" }} />
              </div>
              <span className="capitalize text-xl font-bold text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Sticky Action Buttons & Instructions */}
        <div className="mt-8 relative">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full sticky bottom-20 md:static flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-black font-bold py-4 px-8 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_25px_rgba(3,218,198,0.4)] z-40 text-lg"
          >
            {showInstructions ? <Info size={24} /> : <Play size={24} />}
            {showInstructions ? "Hide Instructions" : "How To Perform"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-6"
              >
                <div className="bg-surface border border-gray-800 p-6 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Instructions</h3>
                  <ol className="list-decimal list-outside ml-5 space-y-4 text-text-secondary text-lg">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2 marker:text-primary marker:font-bold">{step}</li>
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
