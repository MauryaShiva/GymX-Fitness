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
    return null;
  }

  const extraDetail = [
    { icon: BodyPartImage, name: bodyParts[0], alt: "body part icon", label: "Body Part" },
    { icon: TargetImage, name: targetMuscles[0], alt: "target muscle icon", label: "Target" },
    { icon: EquipmentImage, name: equipments[0], alt: "equipment icon", label: "Equipment" },
  ];

  return (
    <div className="flex flex-col w-full bg-background -mx-4 md:-mx-8">
      {/* Hero Image Section - Full width on mobile */}
      <div className="relative w-full aspect-square md:aspect-[21/9] lg:aspect-[21/9] bg-surface overflow-hidden">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover md:object-contain mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:hidden" />
      </div>

      {/* Content Section */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto w-full -mt-10 md:mt-8 relative z-10">
        <div className="bg-surface/80 backdrop-blur-xl md:bg-transparent rounded-3xl p-6 md:p-0 shadow-2xl md:shadow-none border border-border md:border-none">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black capitalize text-text-primary tracking-tight mb-4">
            {name}
          </h1>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-3xl">
            Exercises keep you strong. <span className="capitalize font-bold text-text-primary">{name}</span> is one of the
            best exercises to target your <span className="font-bold text-text-primary">{targetMuscles[0]}</span>.
            It will help you improve your mood and gain energy.
          </p>

          {/* Tags Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {extraDetail.map((item) => (
              <div key={item.name} className="flex items-center gap-4 bg-surface-hover p-4 rounded-2xl border border-border">
                <div className="bg-primary/20 rounded-xl w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <img src={item.icon} alt={item.alt} className="w-7 h-7 filter brightness-200" />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase font-bold tracking-wider mb-1">{item.label}</p>
                  <p className="capitalize text-lg font-semibold text-text-primary">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Expandable Instructions */}
          <div className="bg-surface-hover rounded-2xl border border-border overflow-hidden">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-border/50"
            >
              <span className="text-xl font-bold text-text-primary">Step-by-step Instructions</span>
              {showInstructions ? (
                <ChevronUp className="w-6 h-6 text-primary" />
              ) : (
                <ChevronDown className="w-6 h-6 text-primary" />
              )}
            </button>

            <AnimatePresence>
              {showInstructions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-6">
                    <ol className="space-y-4">
                      {instructions.map((step, index) => (
                        <li key={index} className="flex gap-4">
                          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                            {index + 1}
                          </span>
                          <span className="text-text-secondary pt-1 leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
