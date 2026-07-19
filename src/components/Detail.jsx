import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";

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
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle", label: "Target" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment", label: "Equipment" },
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
      className="flex flex-col w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Image Section - Edge to edge on mobile */}
      <div className="-mx-4 md:mx-0 md:rounded-3xl overflow-hidden bg-white relative aspect-[4/3] md:aspect-video md:max-h-[600px] shadow-xl">
        <motion.img
          variants={itemVariants}
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 md:hidden"></div>
      </div>

      <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-6">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-primary/20 text-primary border border-primary/30 text-sm font-bold rounded-full capitalize py-1 px-4">
              {bodyParts[0]}
            </span>
            <span className="bg-secondary/20 text-secondary border border-secondary/30 text-sm font-bold rounded-full capitalize py-1 px-4">
              {targetMuscles[0]}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold capitalize text-text-primary tracking-tight">
            {name}
          </h1>
          <p className="text-lg text-text-secondary mt-4 max-w-3xl leading-relaxed">
            Exercises keep you strong. <span className="capitalize text-text-primary font-semibold">{name}</span> is one of the best exercises to target your <span className="text-primary font-semibold">{targetMuscles[0]}</span>. It will help you improve your mood and gain energy.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 my-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="bg-surface rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 border border-gray-800 shadow-sm">
              <div className="bg-background rounded-full w-14 h-14 flex items-center justify-center p-3 shadow-inner">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 object-contain filter brightness-200" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                <p className="capitalize text-sm md:text-base font-bold text-text-primary">{item.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions Section */}
        <div className="bg-surface rounded-3xl border border-gray-800 overflow-hidden shadow-lg mt-4">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between p-6 bg-surface hover:bg-gray-800/50 transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <PlayCircle className="text-primary w-6 h-6" />
              <h3 className="text-xl font-bold text-text-primary">Step-by-Step Instructions</h3>
            </div>
            {showInstructions ? (
              <ChevronUp className="text-gray-400 w-6 h-6" />
            ) : (
              <ChevronDown className="text-gray-400 w-6 h-6" />
            )}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 pt-0 space-y-6">
                  {instructions.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-text-secondary leading-relaxed pt-1 flex-1">
                        {step}
                      </p>
                    </div>
                  ))}
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
