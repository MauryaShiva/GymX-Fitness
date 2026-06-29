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
    return <div className="text-white p-5">Loading details...</div>;
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
    // ✅ Wrap the main container in a motion.div for entry animation
    <motion.div
      className="flex flex-col lg:flex-row bg-surface rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
         variants={itemVariants}
         className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 lg:p-12"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-md object-contain mix-blend-multiply"
        />
      </motion.div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 p-6 md:p-10"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-white tracking-tight">
          {name}
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-bold text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-bold text-secondary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-5">
            {extraDetail.map((item) => (
            <motion.div whileHover={{ x: 10 }} key={item.name} className="flex flex-row items-center gap-6 p-4 rounded-2xl bg-gray-800/50 border border-gray-700">
                <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-inner">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 filter invert" />
                </div>
                <span className="capitalize text-xl font-semibold text-gray-200">
                {item.name}
                </span>
            </motion.div>
            ))}
        </div>

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-4 pb-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-primary text-black font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transition duration-300"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-inside mt-6 space-y-4 text-gray-300 text-lg"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
              >
                {instructions.map((step, index) => (
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index}
                    className="pl-2 border-l-2 border-gray-700"
                   >
                       {step}
                    </motion.li>
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
