import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Target, Accessibility, ChevronDown, ChevronUp } from "lucide-react";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div>Loading details...</div>;
  }

  // Use Lucide icons instead of external images for a cleaner app look
  const extraDetail = [
    { icon: <Accessibility className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />, name: bodyParts[0], label: "Body Part" },
    { icon: <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />, name: targetMuscles[0], label: "Target Muscle" },
    { icon: <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />, name: equipments[0], label: "Equipment" },
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
      className="flex flex-col lg:flex-row w-full bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section - Full Bleed on Mobile */}
      <motion.div
        variants={itemVariants}
        className="w-full lg:w-1/2 bg-surface flex items-center justify-center relative overflow-hidden shadow-2xl lg:rounded-3xl"
        style={{ minHeight: "40vh" }}
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full"></div>
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full max-h-[60vh] object-contain relative z-10 p-4 mix-blend-screen"
        />
        {/* Gradient fade to background at the bottom for mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent lg:hidden z-20"></div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 z-30 -mt-6 lg:mt-0 relative"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="px-3 py-1 bg-surface border border-border rounded-full text-xs font-bold text-text-primary capitalize shadow-sm">
              {bodyParts[0]}
            </span>
            <span className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs font-bold text-primary capitalize shadow-sm">
              {targetMuscles[0]}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold capitalize text-text-primary tracking-tight leading-tight">
            {name}
          </h1>
        </div>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
          {extraDetail.map((item) => (
            <div key={item.name} className="flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-3 p-4 bg-surface rounded-2xl border border-border shadow-sm">
              <div className="bg-background border border-border rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0 shadow-inner">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-text-muted font-medium uppercase tracking-wider">{item.label}</span>
                <span className="capitalize text-lg sm:text-xl font-bold text-text-primary">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions Section - Styled like an app drawer/accordion */}
        <div className="mt-2 bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between p-5 bg-surface hover:bg-surface-hover transition-colors focus:outline-none"
          >
            <span className="text-lg font-bold text-text-primary">Instructions</span>
            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-primary">
              {showInstructions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="p-5 pt-0 border-t border-border mt-2">
                  <ol className="space-y-4 text-text-secondary">
                    {instructions.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed text-[15px] sm:text-base">{step}</span>
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
