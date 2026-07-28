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
      className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="w-full md:w-1/2 md:p-6"
      >
        <div className="w-full relative pt-[100%] md:pt-[75%] bg-gray-100 md:rounded-2xl overflow-hidden shadow-sm">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-5 lg:gap-6 w-full md:w-1/2 px-4 md:px-0 py-4"
      >
        <h1 className="text-3xl lg:text-5xl font-extrabold capitalize text-gray-900 tracking-tight">
          {name}
        </h1>
        <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-gray-900">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-gray-900">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="flex flex-col gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <div className="bg-white shadow-sm rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-7 h-7" />
              </div>
              <span className="capitalize text-lg lg:text-xl font-medium text-gray-800">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-6 sticky bottom-[72px] md:static z-10 bg-white pb-2 md:pb-0">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-red-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-red-700 transition duration-300 flex justify-center items-center gap-2"
          >
            {showInstructions ? "Hide Instructions" : "How to perform"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <ol className="list-decimal list-outside ml-4 space-y-3 text-gray-700">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2 leading-relaxed">{step}</li>
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
