import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, ChevronDown, ChevronUp } from "lucide-react";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(true);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div>Loading details...</div>;
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part", label: "Body Part" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle", label: "Target Muscle" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment", label: "Equipment" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 rounded-3xl overflow-hidden bg-surface border border-gray-800 shadow-2xl relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover mix-blend-screen opacity-90"
        />
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md uppercase tracking-wider">
            {bodyParts[0]}
          </span>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold capitalize text-text-primary tracking-tight mb-4">
            {name}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Master the <span className="capitalize text-primary font-semibold">{name}</span>.
            This exercise is highly effective for targeting your <span className="text-white font-medium">{targetMuscles[0]}</span>.
            Consistent training will improve your strength, stability, and overall fitness.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="bg-surface border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-colors">
              <div className="bg-background rounded-full w-14 h-14 flex items-center justify-center p-3">
                <img src={item.icon} alt={item.alt} className="w-full h-full object-contain filter invert opacity-80" />
              </div>
              <div className="text-center">
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">{item.label}</p>
                <p className="capitalize text-text-primary font-semibold text-lg leading-tight">{item.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-surface border border-gray-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full p-5 flex justify-between items-center bg-gray-800/50 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <PlayCircle className="text-primary w-6 h-6" />
              <span className="text-xl font-bold text-text-primary">Execution Guide</span>
            </div>
            {showInstructions ? <ChevronUp className="text-text-secondary" /> : <ChevronDown className="text-text-secondary" />}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ol className="p-5 space-y-4">
                  {instructions.map((step, index) => (
                    <li key={index} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-text-secondary pt-1 leading-relaxed">
                        {step}
                      </p>
                    </li>
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
