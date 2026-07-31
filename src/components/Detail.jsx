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
      className="flex flex-col lg:flex-row items-start gap-10 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 relative bg-white overflow-hidden rounded-b-[2rem] lg:rounded-[2rem] shadow-2xl -mt-20 lg:mt-0 pt-20 lg:pt-0 -mx-4 sm:-mx-6 lg:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-1/2"
      >
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-[50vh] lg:h-[600px] object-contain p-8 mix-blend-multiply"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 w-full lg:w-1/2 px-4 lg:px-0 relative pb-24"
      >
        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-text-primary tracking-tight">
          {name}
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 bg-surface p-4 rounded-2xl border border-gray-800">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 border border-primary/20">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 brightness-200 invert" />
              </div>
              <div className="text-center sm:text-left flex flex-col justify-center h-full">
                <span className="text-xs text-text-secondary uppercase font-bold tracking-wider mb-1">
                  {item.alt.replace(' icon', '')}
                </span>
                <span className="capitalize text-lg font-semibold text-text-primary">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-surface rounded-2xl p-6 border border-gray-800 mb-6">
                    <h3 className="text-xl font-bold text-text-primary mb-4">Instructions</h3>
                    <ol className="list-decimal list-outside ml-4 space-y-4 text-text-secondary">
                    {instructions.map((step, index) => (
                        <li key={index} className="pl-2">{step}</li>
                    ))}
                    </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sticky Action Button for mobile */}
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-md border-t border-gray-800 lg:relative lg:bg-transparent lg:border-none lg:p-0 z-40 pb-safe pb-4">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-primary text-background font-bold py-4 px-6 rounded-full hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-lg"
          >
            {showInstructions ? (
                <>Hide Instructions <ChevronUp className="w-5 h-5" /></>
            ) : (
                <>Show Instructions <ChevronDown className="w-5 h-5" /></>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Detail;
