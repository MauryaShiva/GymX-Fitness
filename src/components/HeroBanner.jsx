import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";

// ✅ 1. Using your exact local image imports as provided.
import myHeroImage from "../assets/images/my-gym-background.jpg";
import image1 from "../assets/images/my-gym-background1.jpg";
import image2 from "../assets/images/my-gym-background2.jpg";
import image3 from "../assets/images/my-gym-background3.jpg";
import image4 from "../assets/images/my-gym-background4.jpg";
import image5 from "../assets/images/my-gym-background5.jpg";
import image6 from "../assets/images/my-gym-background6.jpg";
import image7 from "../assets/images/my-gym-background7.jpg";
import image8 from "../assets/images/my-gym-background8.jpg";

// ✅ 2. Using your image array.
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

  // This effect will cycle through the images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-center p-6 overflow-hidden">
      {/* Image Slider with improved "Ken Burns" animation */}
      <AnimatePresence>
        <motion.img
          key={currentImageIndex}
          src={allImages[currentImageIndex]}
          // ✅ 3. Applied the smoother "Ken Burns" animation effect
          initial={{ opacity: 0, scale: 1.2 }} // Start slightly zoomed in and faded out
          animate={{
            opacity: 1,
            scale: 1, // Animate to normal scale
            transition: { duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }, // Slower, smoother fade-in
          }}
          exit={{
            opacity: 0,
            scale: 1.1, // Zoom out slightly on exit
            transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }, // Smooth fade-out
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay remains the same */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* All your text and button content remains the same */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="font-semibold text-white text-lg md:text-xl mb-2 drop-shadow-xl">
          Your Fitness Journey Starts Here
        </p>
        <h1 className="my-4 font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-tight drop-shadow-2xl">
          Train Hard <br /> Stay Consistent
        </h1>
        <p className="mb-10 text-base sm:text-lg text-white max-w-2xl drop-shadow-xl">
          Build the best version of you. Unlock your potential with personalized
          workouts and expert guidance.
        </p>
        <motion.a
          href="#exercises"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 30px rgba(59, 130, 246, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-6 py-3 sm:px-10 sm:py-5 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-lg sm:text-xl rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Explore Workouts
          <ArrowForward />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
