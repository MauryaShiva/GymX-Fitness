import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weeklyPlan } from "../data/weeklyPlan";
import {
  Dumbbell,
  HeartPulse,
  Zap,
  Coffee,
  Wind,
  Repeat,
  CalendarCheck,
} from "lucide-react";

const focusIcons = {
  "Full Body": <Dumbbell className="w-5 h-5 mr-2" />,
  "Upper Body": <HeartPulse className="w-5 h-5 mr-2" />,
  "Lower Body": <Zap className="w-5 h-5 mr-2" />,
  Cardio: <Wind className="w-5 h-5 mr-2" />,
  Core: <Repeat className="w-5 h-5 mr-2" />,
  "Active Recovery": <CalendarCheck className="w-5 h-5 mr-2" />,
  "Rest Day": <Coffee className="w-5 h-5 mr-2" />,
};

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  out: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

const HomeWorkouts = () => {
  const currentDay = new Intl.DateTimeFormat("en-US", { weekday: "long" })
    .format(new Date())
    .toLowerCase();
  const [selectedDay, setSelectedDay] = useState(currentDay);

  const selectedWorkout = weeklyPlan[selectedDay];
  const videoIds = selectedWorkout?.videos || [];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="bg-background text-text-primary min-h-screen pt-4 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Weekly Home Plan
          </h1>
          <p className="text-base lg:text-lg text-text-secondary max-w-2xl mx-auto">
            Your personalized weekly workout schedule. Select a day to view your
            video routines.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-12 sm:mb-16">
          {Object.values(weeklyPlan).map((dayPlan) => {
            const isSelected = selectedDay === dayPlan.day.toLowerCase();
            return (
              <button
                key={dayPlan.day}
                onClick={() => setSelectedDay(dayPlan.day.toLowerCase())}
                className={`p-3 rounded-xl text-left transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary ${
                  isSelected
                    ? "bg-primary text-background shadow-lg scale-[1.02]"
                    : "bg-surface border border-gray-800 hover:border-gray-600 hover:bg-gray-800"
                }`}
              >
                <p className={`font-bold text-base ${isSelected ? "text-background" : "text-white"}`}>{dayPlan.day}</p>
                <div
                  className={`flex items-center text-xs mt-1 ${
                    isSelected ? "text-background/80" : "text-text-secondary"
                  }`}
                >
                  {focusIcons[dayPlan.focus] || (
                    <Dumbbell className="w-4 h-4 mr-1" />
                  )}
                  <span className="truncate">{dayPlan.focus}</span>
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 capitalize flex items-center gap-3">
              <span>{selectedDay}'s Focus:</span>
              <span className="text-primary bg-primary/10 px-4 py-1 rounded-full text-xl sm:text-2xl lg:text-3xl">
                {selectedWorkout.focus}
              </span>
            </h2>

            {videoIds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {videoIds.map((videoId, index) => (
                  <motion.div
                    key={videoId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="aspect-video bg-surface rounded-2xl shadow-xl overflow-hidden border border-gray-800 group"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube Workout Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                    ></iframe>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface border border-gray-800 rounded-3xl p-8 sm:p-12 text-center flex flex-col justify-center items-center shadow-2xl max-w-2xl mx-auto"
              >
                <div className="bg-primary/20 p-6 rounded-full mb-6">
                  <Coffee size={48} className="text-primary" />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  {selectedWorkout.focus}
                </p>
                <p className="text-text-secondary text-lg max-w-md">
                  Recovery is key to progress. Enjoy your well-deserved day off!
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HomeWorkouts;