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
    return <div className="text-center py-10 text-gray-400">Loading details...</div>;
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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Image Section - Full width on mobile, rounded on desktop */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 bg-gray-900 lg:rounded-3xl overflow-hidden relative shadow-2xl aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-[600px]"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-center mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent lg:rounded-3xl pointer-events-none"></div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col w-full lg:w-1/2 px-4 md:px-0 pt-4"
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold capitalize text-text-primary mb-4 tracking-tight leading-tight">
            {name}
          </h1>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-primary">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-semibold text-text-primary">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex sm:flex-col items-center sm:items-start gap-4 p-4 bg-surface border border-gray-800 rounded-2xl">
              <div className="bg-primary/10 rounded-xl p-3 flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 opacity-80" style={{ filter: 'invert(1)' }} />
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">{item.label}</p>
                <span className="capitalize text-sm md:text-base font-semibold text-text-primary block truncate max-w-[150px] sm:max-w-full">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sticky-like Instructions Button for Mobile */}
        <div className="w-full md:w-auto relative mb-8">
           <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-surface border border-gray-800 text-text-primary font-bold py-4 px-6 rounded-2xl hover:bg-gray-800 transition duration-300 flex items-center justify-between shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span className="text-lg">Instructions</span>
            {showInstructions ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-gray-400" />}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-surface border border-gray-800 rounded-2xl">
                  <ol className="list-decimal list-inside space-y-4 text-text-secondary">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2 leading-relaxed text-[15px]">
                        <span className="ml-2 text-text-primary">{step}</span>
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
