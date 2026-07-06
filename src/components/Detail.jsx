import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";

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
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part icon", label: "Body Part" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle icon", label: "Muscle" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment icon", label: "Equipment" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 xl:gap-16 pt-4">
      {/* Hero Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 rounded-[2rem] overflow-hidden bg-white shadow-2xl relative"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain aspect-square mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"></div>
      </motion.div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-primary/20 text-primary border border-primary/30 text-sm font-bold rounded-full capitalize py-1 px-4">
              {bodyParts[0]}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold capitalize text-white mb-6 leading-tight tracking-tight">
            {name}
          </h1>

          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Exercises keep you strong. <span className="capitalize text-white font-medium">{name}</span> is one of the
            best exercises to target your <span className="text-white font-medium">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {extraDetail.map((item) => (
            <div key={item.name} className="bg-surface border border-gray-800 rounded-2xl p-4 flex flex-row sm:flex-col items-center sm:items-start gap-4">
              <div className="bg-gray-800/50 rounded-xl p-3 flex items-center justify-center">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 filter invert brightness-0 opacity-80" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                <p className="capitalize text-lg text-white font-semibold">{item.name}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Action Button & Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-gray-200 transition-colors duration-300 active:scale-95 transform"
          >
            <FileText className="w-5 h-5" />
            {showInstructions ? "Hide Instructions" : "Read Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: "2rem" }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden bg-surface border border-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">How to perform:</h3>
                <ol className="space-y-4 text-gray-300">
                  {instructions.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <span className="pt-1 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Detail;
