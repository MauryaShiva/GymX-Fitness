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
      className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 flex justify-center"
      >
        <div className="relative w-full max-w-lg aspect-square lg:aspect-auto rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center border border-gray-800 p-2">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </motion.div>

      {/* ✅ Animate the text content as well */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 px-4 lg:px-0"
      >
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold capitalize text-white mb-4 tracking-tight">
            {name}
          </h1>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-white">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-semibold text-white">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-5 p-4 rounded-2xl bg-gray-900 border border-gray-800 shadow-sm">
              <div className="bg-red-500/10 rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 filter brightness-0 invert" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{item.alt.replace(" icon", "")}</p>
                <p className="capitalize text-lg lg:text-xl font-bold text-white leading-none">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section */}
        <div className="mt-2 relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-red-600 text-white font-bold py-4 px-6 rounded-2xl hover:bg-red-700 transition duration-300 shadow-lg shadow-red-500/30 flex justify-between items-center"
          >
            <span>{showInstructions ? "Hide Instructions" : "View Instructions"}</span>
            <span className="text-xl">{showInstructions ? "−" : "+"}</span>
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <ol className="list-decimal list-outside ml-4 space-y-4 text-gray-300 text-sm md:text-base">
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
