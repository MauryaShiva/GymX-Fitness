import React, { useState } from "react";
// ✅ Import 'motion' and 'AnimatePresence' for animations
import { motion, AnimatePresence } from "framer-motion";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  // ✅ Add state to manage showing/hiding the instructions
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

  // Animation variants for a staggered fade-in effect
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
    // ✅ Main container designed as a mobile-first app screen
    <motion.div
      className="flex flex-col lg:flex-row items-center lg:items-start w-full bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* App-style large hero GIF section */}
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative">
        <div className="w-full bg-surface aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center md:rounded-b-[40px] lg:rounded-br-[40px] lg:rounded-bl-none overflow-hidden shadow-2xl relative">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover bg-white mix-blend-screen"
          />
          {/* Gradient fade to blend into background */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent hidden lg:block"></div>
        </div>
      </motion.div>

      {/* ✅ Text Content & Details */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 px-5 py-8 lg:p-12"
      >
        <div className="flex flex-wrap gap-2 mb-2">
          {bodyParts.map((bp, i) => (
             <span key={i} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/30">
               {bp}
             </span>
          ))}
        </div>

        <h1 className="text-4xl lg:text-6xl font-extrabold capitalize text-text-primary tracking-tight leading-none">
          {name}
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed">
          <span className="capitalize font-semibold text-text-primary">{name}</span> is an excellent exercise to target your{" "}
          <span className="font-semibold text-secondary">{targetMuscles[0]}</span>. Consistent training will help improve your strength, mood, and overall energy.
        </p>

        {/* Feature grid layout for better mobile scanning */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-3 p-4 bg-surface rounded-2xl border border-gray-800">
              <div className="bg-primary/10 rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt={item.alt} className="w-8 h-8 opacity-80 filter invert" />
              </div>
              <div>
                <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">{item.alt.replace(' icon', '')}</p>
                <p className="capitalize text-lg font-bold text-text-primary">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Interactive Instructions Section with Sticky-like Feel */}
        <div className="mt-8 relative">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-primary text-background font-extrabold text-lg py-4 px-6 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition duration-300"
          >
            {showInstructions ? "Hide Instructions" : "View Instructions"}
          </motion.button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 p-6 bg-surface rounded-3xl border border-gray-800 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4 text-text-primary">How to perform:</h3>
                  <ol className="space-y-4">
                    {instructions.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                        <span className="text-text-secondary leading-relaxed pt-1">
                          {step}
                        </span>
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
