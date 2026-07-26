import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";
import { Play, ChevronDown, ChevronUp } from "lucide-react";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyParts?.join(", "),
      label: "Body Part",
    },
    {
      icon: TargetImage,
      name: targetMuscles?.join(", "),
      label: "Target Muscle",
    },
    {
      icon: EquipmentImage,
      name: equipments?.join(", "),
      label: "Equipment",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-20">
      {/* Hero Image Section */}
      <div className="w-full lg:w-1/2 relative bg-white/5 rounded-[40px] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 sticky top-24">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-[400px] lg:h-[600px] object-cover mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold capitalize text-white tracking-tight">
          {name}
        </h1>

        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
          Exercises keep you strong. <span className="capitalize font-semibold text-white">{name}</span> is one
          of the best exercises to target your <span className="capitalize font-semibold text-white">{targetMuscles?.join(", ")}</span>.
          It will help you improve your mood and gain energy.
        </p>

        {/* Action Buttons (Sticky on mobile) */}
        <div className="sticky top-16 md:static bg-black/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none z-20 py-4 md:py-0 flex gap-4 w-full border-b border-white/5 md:border-none">
           <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 md:flex-none bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-500/20 transition-colors flex items-center justify-center gap-2"
           >
              Add to Workout
           </motion.button>
           <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('exercise-videos')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-1 md:flex-none bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full border border-gray-700 transition-colors flex items-center justify-center gap-2"
           >
              <Play className="w-4 h-4 fill-current" /> Watch Video
           </motion.button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {extraDetail.map((item, index) => (
            <div key={index} className="flex flex-row items-center gap-4 bg-[#1a1a1a] p-5 rounded-2xl border border-white/5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/10 shrink-0">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-6 h-6 invert opacity-80"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</span>
                <span className="text-white font-semibold capitalize text-base">{item.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions Section */}
        {instructions && instructions.length > 0 && (
          <div className="mt-8 bg-[#1a1a1a] rounded-3xl p-6 border border-white/5">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="flex items-center justify-between w-full text-left focus:outline-none"
            >
              <h3 className="text-2xl font-bold text-white">Instructions</h3>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                {showInstructions ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
              </div>
            </button>

            <AnimatePresence>
              {showInstructions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <ol className="list-decimal list-outside ml-5 mt-6 space-y-4 text-gray-300 text-lg leading-relaxed">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2 marker:text-red-500 marker:font-bold">{step}</li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
