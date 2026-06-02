import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } = exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div>Loading details...</div>;
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment" },
  ];

  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
      {/* Hero Image Section */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-4 sm:p-8">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-auto max-h-[500px] object-contain mix-blend-multiply"
        />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold capitalize text-white mb-6">
            {name}
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed">
            Exercises keep you strong. <span className="capitalize font-bold text-gray-200">{name}</span> is one of the best exercises to target your <span className="font-bold text-red-500">{targetMuscles[0]}</span>. It will help you improve your mood and gain energy.
          </p>

          <div className="flex flex-col gap-5 mb-8">
            {extraDetail.map((item) => (
              <div key={item.name} className="flex items-center gap-6 p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                <div className="bg-red-500/10 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <img src={item.icon} alt={item.alt} className="w-8 h-8 object-contain filter brightness-0 invert opacity-70" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">{item.alt}</span>
                  <span className="capitalize text-xl font-bold text-gray-200">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Instructions Section */}
          <div className="mt-4">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-between bg-gray-800 border border-gray-700 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-700 transition duration-300"
            >
              <span className="text-lg">Step-by-Step Instructions</span>
              {showInstructions ? <ChevronUp className="w-6 h-6 text-red-500" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
            </button>

            <AnimatePresence>
              {showInstructions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <ol className="list-decimal list-outside ml-5 mt-6 space-y-4 text-gray-300">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2 leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Detail;
