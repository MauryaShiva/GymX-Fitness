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
    return <div className="p-4 text-text-secondary text-center">Loading details...</div>;
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyParts[0], label: "Body Part", alt: "body part icon" },
    { icon: TargetImage, name: targetMuscles[0], label: "Target Muscle", alt: "target muscle icon" },
    { icon: EquipmentImage, name: equipments[0], label: "Equipment", alt: "equipment icon" },
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
      className="flex flex-col w-full -mx-4 sm:mx-0 sm:rounded-3xl overflow-hidden bg-background sm:bg-surface border-b sm:border border-border shadow-none sm:shadow-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Image Section */}
      <motion.div variants={itemVariants} className="w-full relative aspect-square sm:aspect-video bg-white">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent sm:from-surface h-full w-full pointer-events-none"></div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 w-full p-6 sm:p-10 -mt-10 relative z-10"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold capitalize text-text-primary tracking-tight">
            {name}
          </h1>
          <p className="text-base text-text-secondary leading-relaxed max-w-3xl">
            Exercises keep you strong. <span className="capitalize text-text-primary font-medium">{name}</span> is one of the
            best exercises to target your <span className="text-primary font-medium">{targetMuscles[0]}</span>. It will
            help you improve your mood and gain energy.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex items-center gap-4 bg-surface sm:bg-background/50 border border-border p-4 rounded-2xl">
              <div className="bg-primary/10 rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 opacity-80" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">{item.label}</span>
                <span className="capitalize text-lg text-text-primary font-medium">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions Section with Sticky Action Feel */}
        <div className="mt-4 pb-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-3 bg-surface border border-border text-text-primary font-semibold py-4 px-6 rounded-2xl hover:bg-surface/80 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span>{showInstructions ? "Hide Instructions" : "Step-by-Step Instructions"}</span>
            {showInstructions ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8">
                  <ol className="list-decimal list-inside space-y-4 text-text-secondary text-base leading-relaxed">
                    {instructions.map((step, index) => (
                      <li key={index} className="pl-2">
                        <span className="text-text-primary">{step}</span>
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
