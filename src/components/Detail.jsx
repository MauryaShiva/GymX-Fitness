import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Activity, Dumbbell, ChevronDown, ChevronUp } from "lucide-react";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div>Loading details...</div>;
  }

  const extraDetail = [
    { icon: Activity, name: bodyParts[0], label: "Body Part", color: "text-primary", bg: "bg-primary/20" },
    { icon: Target, name: targetMuscles[0], label: "Target Muscle", color: "text-secondary", bg: "bg-secondary/20" },
    { icon: Dumbbell, name: equipments[0], label: "Equipment", color: "text-blue-400", bg: "bg-blue-400/20" },
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
      className="flex flex-col lg:flex-row bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero GIF Section - Full width on mobile */}
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative">
        <div className="aspect-[4/5] lg:aspect-square w-full bg-white lg:rounded-r-[3rem] overflow-hidden sticky top-0">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {/* Gradient for mobile to blend into content */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent lg:hidden"></div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col w-full lg:w-1/2 px-6 pt-6 lg:pt-12 lg:px-16"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold capitalize text-text-primary tracking-tight mb-4">
          {name}
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8">
          Exercises keep you strong.{" "}
          <span className="capitalize font-semibold text-text-primary">{name}</span> is one of the
          best exercises to target your{" "}
          <span className="font-semibold text-text-primary">{targetMuscles[0]}</span>. It will
          help you improve your mood and gain energy.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {extraDetail.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex sm:flex-col items-center sm:items-start p-4 bg-surface rounded-2xl border border-gray-800 gap-4 sm:gap-2">
                <div className={`rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-wider">{item.label}</p>
                  <span className="capitalize text-lg font-bold text-text-primary">
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Instructions Section */}
        <div className="mt-auto pb-4">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full flex items-center justify-between bg-surface border border-gray-800 text-text-primary font-bold py-4 px-6 rounded-2xl hover:bg-gray-800 transition duration-300"
          >
            <span>Step-by-Step Instructions</span>
            {showInstructions ? <ChevronUp /> : <ChevronDown />}
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <ol className="list-decimal list-outside ml-5 mt-6 space-y-4 text-text-secondary">
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
