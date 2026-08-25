import React, { useState } from "react";
// ✅ Import 'motion' and 'AnimatePresence' for animations
import { motion, AnimatePresence } from "framer-motion";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  // ✅ Add state to manage showing/hiding the instructions
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
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full lg:w-1/2 relative bg-surface md:rounded-2xl overflow-hidden shadow-2xl border-b md:border border-gray-800">
        <motion.img
          variants={itemVariants}
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-auto object-cover bg-white"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none md:hidden"></div>
      </div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 px-4 md:px-0"
      >
        <div>
          <h1 className="text-3xl lg:text-5xl font-extrabold capitalize text-text-primary mb-4 leading-tight">
            {name}
          </h1>
          <p className="text-base lg:text-lg text-text-secondary leading-relaxed">
            Exercises keep you strong.{" "}
            <span className="capitalize font-bold text-primary">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-bold text-primary">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-surface p-4 rounded-xl border border-gray-800 hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 opacity-80" />
              </div>
              <div className="text-center sm:text-left">
                <span className="block text-sm text-text-secondary mb-1">{item.alt.split(' ')[0]}</span>
                <span className="capitalize text-lg font-bold text-text-primary">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-outside ml-6 mt-4 space-y-4 text-text-secondary text-base lg:text-lg leading-relaxed"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              >
                {instructions.map((step, index) => (
                  <li key={index} className="pl-2 marker:text-primary marker:font-bold">{step}</li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>

          <div className="sticky bottom-0 pb-safe bg-background/90 backdrop-blur-md p-4 md:p-0 md:bg-transparent z-10 -mx-4 md:mx-0 px-4 mt-8 md:mt-0 border-t md:border-t-0 border-gray-800">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full bg-primary text-background font-bold py-4 px-6 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 text-lg flex justify-center items-center gap-2"
            >
              {showInstructions ? "Hide Instructions" : "Read Instructions"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
