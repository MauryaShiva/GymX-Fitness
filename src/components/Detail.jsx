import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListChecks } from "lucide-react";

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
      className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 items-start lg:items-center gap-8 lg:gap-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full max-w-md lg:max-w-xl object-contain mix-blend-multiply"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold capitalize text-white tracking-tight leading-tight">
            {name}
          </h1>
          <p className="text-base lg:text-lg text-text-secondary mt-4 leading-relaxed max-w-2xl">
            Exercises keep you strong.{" "}
            <span className="capitalize font-bold text-white">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-bold text-white">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 sm:gap-6 mt-4">
          {extraDetail.map((item, index) => (
            <div key={index} className="flex items-center gap-4 bg-surface p-4 rounded-2xl border border-gray-800 shadow-sm flex-1">
              <div className="bg-primary/20 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-7 h-7 filter invert brightness-0 sepia hue-rotate-[160deg] saturate-[300%]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">{item.label}</span>
                <span className="capitalize text-lg lg:text-xl font-bold text-white">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Instructions Section */}
        <div className="mt-6 border-t border-gray-800 pt-6">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary text-background font-bold py-4 px-8 rounded-full text-lg hover:scale-105 active:scale-95 transition-transform shadow-lg focus:outline-none"
          >
            <ListChecks className="w-5 h-5" />
            {showInstructions ? "Hide Instructions" : "Read Instructions"}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 bg-surface p-6 rounded-2xl border border-gray-800 shadow-inner">
                  <ol className="list-decimal list-outside ml-5 space-y-4 text-text-secondary text-base lg:text-lg">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2 leading-relaxed text-gray-300">
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