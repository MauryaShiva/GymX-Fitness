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
      className="flex flex-col md:flex-row md:items-start gap-8 lg:gap-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/*
        ✅ Image Container: Mobile-first hero image
      */}
      <motion.div variants={itemVariants} className="w-full md:w-1/2 flex justify-center mt-0 md:mt-10">
        <div className="relative w-full max-w-lg aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-gray-800 bg-white">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain p-4"
          />
        </div>
      </motion.div>

      {/* ✅ Text Content: App-style content hierarchy */}
      <motion.div
        variants={itemVariants}
        className="w-full md:w-1/2 flex flex-col pt-4 md:pt-10 px-4 md:px-0"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold capitalize text-white mb-4 tracking-tight drop-shadow-md">
          {name}
        </h1>

        <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="font-bold text-primary capitalize">
            {name}
          </span>{" "}
          is one of the best exercises to target your{" "}
          <span className="font-bold text-primary capitalize">
            {targetMuscles?.join(", ")}
          </span>
          . It will help you improve your mood and gain energy.
        </p>

        {/* ✅ Info Cards: Native-app feeling list items */}
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Exercise Details</h3>
          {extraDetail.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-5 p-4 rounded-2xl bg-surface border border-gray-800 shadow-md transition-colors hover:bg-gray-800"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black/50 text-primary border border-gray-700 p-3 flex-shrink-0">
                <img
                  src={item.icon}
                  alt={item.alt}
                  className="w-full h-full object-contain filter invert opacity-90"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-400 capitalize">
                  {index === 0 ? "Body Part" : index === 1 ? "Target Muscle" : "Equipment"}
                </p>
                <p className="text-lg font-bold capitalize text-white">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-8">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl hover:bg-primary-dark transition duration-300 shadow-lg shadow-primary/20 flex justify-between items-center"
          >
            <span>{showInstructions ? "Hide Instructions" : "Show Instructions"}</span>
            <span className="text-xl">{showInstructions ? "−" : "+"}</span>
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-outside ml-5 mt-6 space-y-4 text-gray-300"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
              >
                {instructions.map((step, index) => (
                  <li key={index} className="pl-2">{step}</li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
