import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle } from "lucide-react"; // Or similar icon

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

  return (
    <div className="flex flex-col lg:flex-row bg-background">
      {/* Mobile-first Hero Image section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 bg-white flex justify-center items-center overflow-hidden lg:rounded-3xl shadow-xl shadow-black/40 -mt-16 md:mt-0 pt-16 md:pt-0"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-auto object-contain max-h-[50vh] md:max-h-[600px] mix-blend-multiply" // Added mix-blend-multiply to blend the white GIF background if needed
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col w-full lg:w-1/2 p-6 md:p-10 -mt-6 lg:mt-0 bg-surface lg:bg-transparent rounded-t-[30px] lg:rounded-none z-10 relative"
      >
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {bodyParts[0]}
          </span>
          <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-gray-700">
            {equipments[0]}
          </span>
        </div>

        <h1 className="text-3xl lg:text-5xl font-extrabold capitalize text-white mb-4 tracking-tight leading-tight">
          {name}
        </h1>

        <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize text-white font-medium">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="text-white font-medium">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        {/* Feature Icons Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {extraDetail.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center bg-surface-light p-4 rounded-2xl border border-gray-800"
            >
              <div className="bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                <img src={item.icon} alt={item.alt} className="w-6 h-6 invert opacity-80" />
              </div>
              <span className="capitalize text-xs md:text-sm font-semibold text-gray-300 text-center">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Instructions Section */}
        <div className="mt-auto">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
          >
            <PlayCircle className="w-5 h-5" />
            {showInstructions ? "Hide Instructions" : "Step-by-Step Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-surface-light rounded-2xl p-6 border border-gray-800">
                  <ol className="space-y-4">
                    {instructions.map((step, index) => (
                      <li key={index} className="flex gap-4 text-gray-300">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed text-sm md:text-base">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Detail;
