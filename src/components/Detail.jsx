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
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row p-4 md:p-5 items-center lg:items-start gap-8 lg:gap-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF section taking full width on mobile with premium rounded corners */}
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-square bg-surface rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </motion.div>

      {/* Details text content */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white mb-4 tracking-tight">
            {name}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-primary">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-semibold text-white">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        {/* Info pills for app-like layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex items-center gap-4 bg-surface p-4 rounded-2xl border border-gray-800 shadow-sm">
              <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-6 h-6 filter invert" />
              </div>
              <span className="capitalize text-lg font-semibold text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Sticky action button for instructions on mobile, standard on desktop */}
        <div className="mt-4 md:mt-8">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-primary text-white font-bold py-4 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary/30"
          >
            {showInstructions ? "Hide Instructions" : "Read Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-surface p-6 rounded-2xl border border-gray-800">
                  <h3 className="text-xl font-bold mb-4 text-white">Instructions</h3>
                  <ol className="list-decimal list-inside space-y-3 text-text-secondary">
                    {instructions.map((step, index) => (
                      <li key={index} className="leading-relaxed pl-2">{step}</li>
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
