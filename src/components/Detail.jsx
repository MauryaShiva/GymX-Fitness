import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part icon", color: "bg-primary/20", textColor: "text-primary" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle icon", color: "bg-secondary/20", textColor: "text-secondary" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment icon", color: "bg-blue-500/20", textColor: "text-blue-400" },
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Hero Image Section - Full width on mobile, rounded on desktop */}
      <div className="w-full lg:w-1/2 bg-white relative">
        <div className="aspect-square lg:aspect-auto lg:h-[600px] w-full relative">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain p-4 lg:rounded-2xl"
          />
          {/* Gradient to blend image into dark background */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden pointer-events-none"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 px-5 py-6 lg:p-10 flex flex-col gap-6 -mt-6 lg:mt-0 relative z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold capitalize text-text-primary tracking-tight">
          {name}
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        {/* Tags / Info Pills */}
        <div className="flex flex-wrap gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className={`flex items-center gap-3 ${item.color} px-4 py-2 rounded-full border border-gray-700/50`}>
              <div className="bg-background/50 rounded-full w-8 h-8 flex items-center justify-center">
                <img src={item.icon} alt={item.alt} className="w-4 h-4 invert" />
              </div>
              <span className={`capitalize text-sm font-bold ${item.textColor}`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Instructions Accordion */}
        <div className="mt-6">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex justify-between items-center bg-surface p-4 rounded-xl border border-gray-800 focus:outline-none"
          >
            <span className="text-lg font-bold text-text-primary">Instructions</span>
            {showInstructions ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-primary" />}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-surface/50 mt-2 p-5 rounded-xl border border-gray-800/50">
                  <ol className="list-decimal list-outside ml-4 space-y-3 text-text-secondary text-sm sm:text-base leading-relaxed">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2">{step}</li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Detail;
