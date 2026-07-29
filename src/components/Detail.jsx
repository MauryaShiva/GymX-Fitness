import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div className="text-text-primary p-6">Loading details...</div>;
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment" },
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
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section - Large on mobile */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 bg-surface rounded-3xl overflow-hidden shadow-2xl p-4 md:p-8 flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-50"></div>
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-auto max-h-[60vh] object-contain rounded-2xl relative z-10 filter contrast-125"
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 w-full lg:w-1/2 pt-4"
      >
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black capitalize text-text-primary mb-4 tracking-tight">
            {name}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-primary">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-semibold text-secondary">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        {/* Tags Section */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex items-center gap-4 bg-surface p-4 rounded-2xl flex-1 border border-gray-800">
              <div className="bg-primary/20 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-6 h-6 invert opacity-80" />
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase tracking-wider">{item.alt}</p>
                <span className="capitalize text-lg font-bold text-text-primary">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Instructions Section with Sticky Button */}
        <div className="mt-6 flex flex-col">
          <div className="sticky top-20 z-30 pb-4 bg-background">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full bg-primary text-background font-bold py-4 px-6 rounded-2xl text-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              {showInstructions ? "Hide Instructions" : "View Instructions"}
            </button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-surface rounded-2xl border border-gray-800"
              >
                <ol className="p-6 space-y-4">
                  {instructions.map((step, index) => (
                    <li key={index} className="flex gap-4 text-text-secondary">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 text-text-primary flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <span className="pt-1 leading-relaxed text-base">{step}</span>
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
