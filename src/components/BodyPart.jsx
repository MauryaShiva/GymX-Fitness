import React from "react";
import Icon from "../assets/icons/gym.png";
import { motion } from "framer-motion";

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  return (
    <motion.button
      type="button"
      className={`flex flex-col items-center justify-center bg-surface w-64 h-64 cursor-pointer gap-10 rounded-3xl shadow-lg border-b-4 transition-colors ${
        bodyPart === item ? "border-primary bg-surface" : "border-transparent"
      }`}
      onClick={() => {
        setBodyPart(item);
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="bg-primary/10 p-6 rounded-full">
        <img
          src={Icon}
          alt="dumbbell"
          className="w-12 h-12 filter brightness-200"
        />
      </div>
      <span className="text-2xl font-bold text-text-primary capitalize tracking-wide">
        {item}
      </span>
    </motion.button>
  );
};

export default BodyPart;
