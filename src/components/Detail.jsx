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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row p-4 md:p-5 items-center gap-8 lg:gap-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center p-4">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black capitalize text-text-primary tracking-tight mb-4">
            {name}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Exercises keep you strong.{" "}
            <span className="capitalize font-semibold text-text-primary">{name}</span> is one of the
            best exercises to target your{" "}
            <span className="font-semibold text-primary">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row items-center gap-6 p-4 rounded-2xl bg-surface border border-gray-800 shadow-sm">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 filter brightness-200" />
              </div>
              <span className="capitalize text-xl font-bold text-text-primary">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Instructions Section */}
        <div className="mt-4 bg-surface rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between p-6 bg-surface hover:bg-gray-800 transition-colors duration-300"
          >
            <span className="text-xl font-bold text-text-primary">Instructions</span>
            <div className="text-primary bg-primary/10 p-2 rounded-full">
              {showInstructions ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-6 pb-6"
              >
                <ol className="list-decimal list-outside ml-4 space-y-3 text-text-secondary">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-2 leading-relaxed">{step}</li>
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
