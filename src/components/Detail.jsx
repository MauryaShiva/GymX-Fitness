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
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section - App Style */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 rounded-3xl overflow-hidden bg-[#1e1e1e] shadow-2xl relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-6 left-6 z-20 flex gap-2">
           <span className="bg-red-500 text-white text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
              {bodyParts[0]}
           </span>
        </div>
      </motion.div>

      {/* Details Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold capitalize text-white tracking-tight leading-tight drop-shadow-sm mb-4">
            {name}
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
            Exercises keep you strong. <span className="capitalize font-semibold text-gray-200">{name}</span> is one of the
            best exercises to target your <span className="font-semibold text-gray-200">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
            </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-col gap-4">
            {extraDetail.map((item) => (
            <motion.div
                whileHover={{ scale: 1.02 }}
                key={item.name}
                className="flex items-center gap-5 bg-gray-800/40 p-4 rounded-2xl border border-gray-700/50"
            >
                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl w-14 h-14 flex items-center justify-center shadow-lg">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 filter brightness-0 invert opacity-90" />
                </div>
                <span className="capitalize text-xl font-semibold text-gray-200">
                {item.name}
                </span>
            </motion.div>
            ))}
        </div>

        {/* Instructions Toggle */}
        <div className="mt-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-red-600/20 hover:shadow-red-600/40 transition-all duration-300"
          >
            {showInstructions ? "Hide Instructions" : "Read Step-by-Step Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                 <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
                    <ol className="list-decimal list-outside ml-4 space-y-4 text-gray-300 text-lg leading-relaxed">
                        {instructions.map((step, index) => (
                        <li key={index} className="pl-2">
                            {step}
                        </li>
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
