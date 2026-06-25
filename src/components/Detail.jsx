import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Dumbbell, Target, Wrench } from "lucide-react";

const Detail = ({ exerciseDetail }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const { bodyParts, gifUrl, name, targetMuscles, equipments, instructions } =
    exerciseDetail;

  if (!bodyParts || !targetMuscles || !equipments) {
    return <div className="text-white">Loading details...</div>;
  }

  const extraDetail = [
    { icon: <Dumbbell className="w-6 h-6 text-primary" />, name: bodyParts[0], label: "Body Part" },
    { icon: <Target className="w-6 h-6 text-secondary" />, name: targetMuscles[0], label: "Target Muscle" },
    { icon: <Wrench className="w-6 h-6 text-yellow-500" />, name: equipments[0], label: "Equipment" },
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
      className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 md:hidden" />
        <div className="bg-surface rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
          <img
            src={gifUrl}
            alt={name}
            loading="lazy"
            className="w-full h-auto aspect-square object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2"
      >
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold capitalize text-white tracking-tight mb-4">
            {name}
          </h1>
          <p className="text-base lg:text-lg text-gray-400 leading-relaxed">
            Exercises keep you strong. <span className="capitalize text-gray-200 font-semibold">{name}</span> is one of the best exercises to target your <span className="text-gray-200 font-semibold">{targetMuscles[0]}</span>. It will help you improve your mood and gain energy.
          </p>
        </div>

        <div className="flex flex-col gap-4 bg-surface p-6 rounded-2xl border border-gray-800">
          {extraDetail.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{item.label}</p>
                <p className="capitalize text-lg text-gray-200 font-medium">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-primary text-background font-bold py-4 px-6 rounded-xl hover:bg-primary/90 transition duration-300 flex items-center justify-between shadow-lg shadow-primary/20"
          >
            <span className="text-lg">Step-by-Step Instructions</span>
            <motion.div
              animate={{ rotate: showInstructions ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown />
            </motion.div>
          </button>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <ol className="mt-4 space-y-4 text-gray-300 bg-surface p-6 rounded-2xl border border-gray-800">
                  {instructions.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-primary font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="leading-relaxed pt-1">{step}</p>
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
