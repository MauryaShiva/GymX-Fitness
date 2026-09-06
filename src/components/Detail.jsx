import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Info } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const navigate = useNavigate();

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

  // Animation variants for a staggered fade-in effect
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
      className="flex flex-col w-full relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Mobile Sticky Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="md:hidden absolute top-4 left-4 z-10 bg-surface/80 backdrop-blur-md p-3 rounded-full text-text-primary shadow-lg active:scale-90 transition-transform"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Hero Image Section */}
      <motion.div
        variants={itemVariants}
        className="w-full h-[50vh] md:h-[60vh] bg-surface relative rounded-b-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl mb-8 md:mt-8 md:mx-4 lg:mx-8"
      >
        <div className="absolute inset-0 bg-gray-800"></div>
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover md:object-contain mix-blend-screen opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent md:rounded-[2.5rem]"></div>

        {/* Title Overlay for Mobile */}
        <div className="absolute bottom-6 left-6 right-6 md:hidden">
          <div className="flex gap-2 mb-3 flex-wrap">
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold capitalize text-white shadow-sm">
              {targetMuscles[0]}
            </span>
            <span className="bg-surface/80 backdrop-blur-md border border-gray-700 px-3 py-1 rounded-full text-xs font-bold capitalize text-text-primary shadow-sm">
              {equipments[0]}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold capitalize text-white drop-shadow-md leading-tight">
            {name}
          </h1>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col px-6 md:px-12 w-full max-w-5xl mx-auto"
      >
        {/* Title for Desktop */}
        <div className="hidden md:block mb-8 text-center md:text-left">
          <div className="flex gap-3 mb-4 justify-center md:justify-start">
            <span className="bg-primary px-4 py-1.5 rounded-full text-sm font-bold capitalize text-white shadow-sm">
              {targetMuscles[0]}
            </span>
            <span className="bg-surface border border-gray-700 px-4 py-1.5 rounded-full text-sm font-bold capitalize text-text-primary shadow-sm">
              {equipments[0]}
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold capitalize text-text-primary tracking-tight">
            {name}
          </h1>
        </div>

        <p className="text-lg text-text-secondary leading-relaxed mb-10">
          Exercises keep you strong. <span className="capitalize font-semibold text-text-primary">{name}</span> is one of the
          best exercises to target your <span className="font-semibold text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-col items-center bg-surface p-4 rounded-2xl border border-gray-800 shadow-sm">
              <div className="bg-primary/20 rounded-full w-14 h-14 flex items-center justify-center mb-3">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 opacity-90" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <span className="capitalize text-sm font-semibold text-text-primary text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Instructions Section */}
        <div className="bg-surface border border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Info className="text-primary" /> Instructions
            </h3>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-primary font-semibold text-sm hover:underline"
            >
              {showInstructions ? "Hide" : "Show All"}
            </button>
          </div>

          <div className="space-y-4">
            {/* Always show first step */}
            {instructions.length > 0 && (
              <div className="flex gap-4 items-start">
                <div className="bg-gray-800 text-text-secondary w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm mt-0.5">1</div>
                <p className="text-text-primary leading-relaxed pt-1">{instructions[0]}</p>
              </div>
            )}

            <AnimatePresence>
              {showInstructions && instructions.slice(1).map((step, index) => (
                <motion.div
                  key={index + 1}
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="flex gap-4 items-start"
                >
                  <div className="bg-gray-800 text-text-secondary w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm mt-0.5">
                    {index + 2}
                  </div>
                  <p className="text-text-primary leading-relaxed pt-1">{step}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
