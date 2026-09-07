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
      className="flex flex-col lg:flex-row p-5 items-center gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.img
        variants={itemVariants}
        src={gifUrl}
        alt={name}
        loading="lazy"
        className="w-full max-w-md lg:max-w-lg shadow-lg rounded-lg"
      />

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-5 lg:gap-6 w-full"
      >
        <h1 className="text-3xl lg:text-5xl font-bold capitalize text-gray-800">
          {name}
        </h1>
        <p className="text-base lg:text-lg text-gray-600">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        {extraDetail.map((item) => (
          <div key={item.name} className="flex flex-row items-center gap-6">
            <div className="bg-[#FFF2DB] rounded-full w-20 h-20 flex items-center justify-center flex-shrink-0">
              <img src={item.icon} alt={item.alt} className="w-11 h-11" />
            </div>
            <span className="capitalize text-lg lg:text-2xl text-gray-700">
              {item.name}
            </span>
          </div>
        ))}

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-4">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-md hover:bg-red-600 transition duration-300"
          >
            {showInstructions ? "Hide Instructions" : "Show Instructions"}
          </button>

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
