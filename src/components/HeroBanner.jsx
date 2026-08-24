import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

// Using exact local image imports
import myHeroImage from "../assets/images/my-gym-background.jpg";
import image1 from "../assets/images/my-gym-background1.jpg";
import image2 from "../assets/images/my-gym-background2.jpg";
import image3 from "../assets/images/my-gym-background3.jpg";
import image4 from "../assets/images/my-gym-background4.jpg";
import image5 from "../assets/images/my-gym-background5.jpg";
import image6 from "../assets/images/my-gym-background6.jpg";
import image7 from "../assets/images/my-gym-background7.jpg";
import image8 from "../assets/images/my-gym-background8.jpg";

const allImages = [
  myHeroImage,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
];

const HeroBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentImageIndex}
          src={allImages[currentImageIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5, ease: "easeOut" },
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 1.5, ease: "easeIn" },
          }}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-0"></div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-4 w-full max-w-4xl pt-safe-top"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <h2 className="text-primary font-bold text-lg md:text-2xl tracking-widest uppercase mb-4 md:mb-6 flex items-center gap-2">
           <span className="w-8 md:w-12 h-[2px] bg-primary"></span>
           Fitness Club
           <span className="w-8 md:w-12 h-[2px] bg-primary"></span>
        </h2>

        <h1 className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary leading-[1.1] drop-shadow-2xl mb-6 tracking-tight">
          Sweat, Smile <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">
            And Repeat
          </span>
        </h1>

        <p className="mb-10 text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
          Build the best version of you. Check out the most effective exercises personalized to your goals.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const exercisesSection = document.getElementById("exercises");
            if (exercisesSection) {
              exercisesSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="group flex items-center gap-3 bg-primary text-background font-bold text-lg md:text-xl py-4 px-8 md:px-10 rounded-full shadow-[0_0_20px_rgba(3,218,198,0.3)] hover:shadow-[0_0_30px_rgba(3,218,198,0.5)] transition-all duration-300"
        >
          Explore Exercises
          <Play className="w-5 h-5 fill-current transform group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
