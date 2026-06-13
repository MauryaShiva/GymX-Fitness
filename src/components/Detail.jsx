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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-start lg:items-center w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Edge-to-edge GIF on mobile, contained on desktop */}
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 -mx-4 sm:mx-0 sm:rounded-2xl overflow-hidden bg-gray-100 mb-8 lg:mb-0 shadow-sm relative">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-[400px] lg:h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none sm:hidden"></div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 lg:pl-12 px-4 sm:px-0"
      >
        <div>
           {/* Tags */}
           <div className="flex gap-2 mb-3">
             <span className="bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
               {bodyParts[0]}
             </span>
             <span className="bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
               {targetMuscles[0]}
             </span>
           </div>

           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold capitalize text-gray-900 tracking-tight leading-tight">
             {name}
           </h1>
        </div>

        <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-gray-800">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-gray-800">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="bg-[#FFF2DB] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-6 h-6" />
              </div>
              <span className="capitalize text-sm font-semibold text-gray-800">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Sticky Action Button Container for Mobile */}
        <div className="mt-4 sticky bottom-[80px] z-30 lg:static bg-white/90 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:pt-0 sm:pb-0">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full sm:w-auto bg-gray-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-gray-800 transition duration-300 shadow-xl shadow-gray-900/20 active:scale-95"
          >
            {showInstructions ? "Hide Instructions" : "View Step-by-Step"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                   <h3 className="text-xl font-bold mb-4 text-gray-900">Instructions</h3>
                   <ol className="list-decimal list-outside ml-4 space-y-3 text-gray-600">
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
