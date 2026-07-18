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
    return <div className="p-8 text-center">Loading details...</div>;
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
      className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Large Hero GIF Section with elegant styling */}
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-[500px] aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 p-2 md:p-4">
           <img
             src={gifUrl}
             alt={name}
             loading="lazy"
             className="w-full h-full object-contain rounded-2xl"
           />
           {/* Subtle gradient border effect */}
           <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/5 pointer-events-none"></div>
        </div>
      </motion.div>

      {/* Text Content & Sticky Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold capitalize text-gray-900 tracking-tight leading-tight">
            {name}
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-teal-600">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-semibold text-teal-600">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-5">
              <div className="bg-teal-50 rounded-xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0 shadow-sm">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 md:w-9 md:h-9 opacity-80" />
              </div>
              <span className="capitalize text-lg md:text-xl font-medium text-gray-800">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Instructions Section */}
        <div className="mt-2 relative">
          {/* Sticky action button for mobile layout */}
          <div className="sticky bottom-[80px] md:static z-20 w-full pb-4">
             <motion.button
               whileTap={{ scale: 0.95 }}
               onClick={() => setShowInstructions(!showInstructions)}
               className="w-full bg-teal-600 text-white font-bold py-4 md:py-3 px-6 rounded-xl hover:bg-teal-700 transition duration-300 shadow-lg shadow-teal-500/30 flex justify-center items-center gap-2 text-lg"
             >
               {showInstructions ? "Hide Instructions" : "How to perform"}
             </motion.button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden bg-white rounded-2xl shadow-md border border-gray-100"
              >
                <ol className="list-decimal list-inside p-6 space-y-4 text-gray-700 text-base md:text-lg leading-relaxed marker:text-teal-600 marker:font-bold">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2">{step}</li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
