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
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Mobile: Scrollable Hero Image / Desktop: Sticky left panel */}
      <div className="w-full lg:w-1/2 lg:sticky lg:top-[80px] lg:h-[calc(100vh-80px)] bg-[var(--color-surface)] flex items-center justify-center p-0 lg:p-10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-background)] opacity-50 lg:hidden pointer-events-none z-10" />
        <motion.img
          variants={itemVariants}
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-auto max-h-[60vh] lg:max-h-full object-contain rounded-none lg:rounded-3xl shadow-none lg:shadow-2xl z-0"
        />
      </div>

      {/* Content Side */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col flex-1 w-full p-6 lg:p-12 z-20 -mt-10 lg:mt-0 bg-[var(--color-background)] rounded-t-3xl lg:rounded-none lg:bg-transparent"
      >
        <div className="max-w-2xl mx-auto w-full lg:mx-0 pt-4 lg:pt-0">
          <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white mb-4 lg:mb-6 leading-tight">
            {name}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            Exercises keep you strong. <span className="capitalize font-semibold text-white">{name}</span> is one of the best
            exercises to target your <span className="font-semibold text-[var(--color-primary)]">{targetMuscles[0]}</span>. It will help you
            improve your mood and gain energy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {extraDetail.map((item) => (
              <div key={item.name} className="flex sm:flex-col items-center sm:justify-center gap-4 bg-[var(--color-surface)] p-4 rounded-2xl border border-gray-800">
                <div className="bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <img src={item.icon} alt={item.alt} className="w-7 h-7 filter invert brightness-0" />
                </div>
                <span className="capitalize text-lg font-medium text-gray-200">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-24 lg:mb-0">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full sm:w-auto bg-[var(--color-surface)] border border-gray-700 text-white font-bold py-4 px-8 rounded-xl hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {showInstructions ? "Hide Instructions" : "Read Instructions"}
            </button>

            <AnimatePresence>
              {showInstructions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <ol className="list-decimal list-inside mt-6 space-y-4 text-[var(--color-text-secondary)] text-lg bg-[var(--color-surface)]/50 p-6 rounded-2xl border border-gray-800/50">
                    {instructions.map((step, index) => (
                      <li key={index} className="leading-relaxed pl-2">{step}</li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Mobile Sticky Bottom Action Button */}
      <div className="fixed bottom-[64px] left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)] to-transparent lg:hidden z-40 pb-safe">
        <button
          onClick={() => {
            setShowInstructions(true);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }}
          className="w-full bg-[var(--color-primary)] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-red-500/30 active:scale-95 transition-transform"
        >
          Start Workout
        </button>
      </div>
    </motion.div>
  );
};

export default Detail;
