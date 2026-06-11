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
    // ✅ Wrap the main container in a motion.div for entry animation
    <motion.div
      className="flex flex-col lg:flex-row p-0 md:p-5 items-center md:items-start gap-6 lg:gap-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full md:w-1/2 lg:w-[45%] rounded-b-3xl md:rounded-3xl overflow-hidden shadow-2xl bg-gray-50 aspect-square flex items-center justify-center">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 w-full md:w-1/2 lg:w-[55%] px-5 md:px-0"
      >
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold capitalize text-gray-900 tracking-tight">
            {name}
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-red-600">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-semibold text-gray-800">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-2">
          {extraDetail.map((item) => (
            <motion.div
              key={item.name}
              className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 flex-1 min-w-[140px]"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-[#FFF2DB] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-6 h-6" />
              </div>
              <span className="capitalize text-sm md:text-base font-semibold text-gray-800">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-6 md:mt-4 pb-24 md:pb-0">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-gray-900 text-white font-semibold py-4 px-8 rounded-xl hover:bg-gray-800 transition duration-300 shadow-lg shadow-gray-900/20"
          >
            {showInstructions ? "Hide Instructions" : "Show Step-by-Step Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.ol
                className="list-decimal list-inside mt-4 space-y-2 text-gray-600"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {instructions.map((step, index) => (
                  <li key={index}>{step}</li>
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
