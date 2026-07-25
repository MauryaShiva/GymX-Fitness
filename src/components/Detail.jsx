import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Play, Plus } from "lucide-react";

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
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle icon", label: "Target" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment icon", label: "Equipment" },
  ];

  return (
    <div className="w-full flex flex-col md:flex-row">
      {/* Mobile-first Hero Image Area */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen md:sticky md:top-0 bg-white flex items-center justify-center overflow-hidden">
        <motion.img
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain mix-blend-multiply"
        />

        {/* Gradient overlay to blend image into background on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent md:hidden"></div>
      </div>

      {/* Content Area */}
      <div className="w-full md:w-1/2 relative -mt-8 md:mt-0 z-10 md:pt-24 px-5 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-surface md:bg-transparent rounded-t-3xl md:rounded-none p-6 md:p-0 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:shadow-none min-h-full"
        >
          {/* Mobile Handle */}
          <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-8 md:hidden"></div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold capitalize text-white mb-4 tracking-tight leading-tight">
            {name}
          </h1>

          <p className="text-base lg:text-lg text-gray-400 mb-8 leading-relaxed">
            Consistency is key. <span className="capitalize text-white font-medium">{name}</span> is one of the
            best exercises to isolate and build your <span className="text-primary font-medium">{targetMuscles[0]}</span>.
            Add this to your routine to improve strength and overall fitness.
          </p>

          {/* Stats Grid - App Style */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {extraDetail.map((item) => (
              <div key={item.name} className="flex flex-col items-center bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
                <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <img src={item.icon} alt={item.alt} className="w-6 h-6 brightness-200" />
                </div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                  {item.label}
                </span>
                <span className="capitalize text-sm font-bold text-white text-center">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="flex-1 bg-primary text-black font-bold py-4 px-6 rounded-xl hover:bg-primary/90 transition duration-300 flex items-center justify-center gap-2 active:scale-95"
            >
              <Info size={20} />
              {showInstructions ? "Hide Guide" : "Step-by-Step Guide"}
            </button>

            <button className="w-14 h-14 bg-gray-800 text-white rounded-xl flex items-center justify-center hover:bg-gray-700 transition active:scale-95 border border-gray-700">
               <Plus size={24} />
            </button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 mt-4">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Play size={20} className="text-primary" />
                    How to perform
                  </h3>
                  <ol className="space-y-4">
                    {instructions.map((step, index) => (
                      <li key={index} className="flex gap-4 text-gray-300">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-primary text-sm border border-gray-700">
                          {index + 1}
                        </span>
                        <p className="pt-1 leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Detail;
