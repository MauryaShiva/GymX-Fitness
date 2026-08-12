import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Assuming you have a data file for the weekly plan
import { weeklyPlan } from "../data/weeklyPlan";
// Using lucide-react for clean, modern icons. Make sure to install it: npm install lucide-react
import {
  Dumbbell,
  HeartPulse,
  Zap,
  Coffee,
  Wind,
  Repeat,
  CalendarCheck,
} from "lucide-react";

// An object to map workout focus to a specific icon for visual flair
const focusIcons = {
  "Full Body": <Dumbbell className="w-5 h-5 mr-2" />,
  "Upper Body": <HeartPulse className="w-5 h-5 mr-2" />,
  "Lower Body": <Zap className="w-5 h-5 mr-2" />,
  Cardio: <Wind className="w-5 h-5 mr-2" />,
  Core: <Repeat className="w-5 h-5 mr-2" />,
  "Active Recovery": <CalendarCheck className="w-5 h-5 mr-2" />,
  "Rest Day": <Coffee className="w-5 h-5 mr-2" />,
};

const HomeWorkouts = () => {
  const currentDay = new Intl.DateTimeFormat("en-US", { weekday: "long" })
    .format(new Date())
    .toLowerCase();
  const [selectedDay, setSelectedDay] = useState(currentDay);

  const selectedWorkout = weeklyPlan[selectedDay];
  const videoIds = selectedWorkout?.videos || [];

  return (
    // ✅ Added a subtle background gradient for more visual depth
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="pt-4 md:pt-24 min-h-screen px-4 md:px-6 lg:px-12 pb-safe bg-background text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* ✅ Centered the header text for a more impactful title section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Weekly Home Plan
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Your personalized weekly workout schedule. Select a day to view your
            video routines.
          </p>
        </div>

        {/* Day Selector - Enhanced with gradients, shadows, and hover effects */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
          {Object.values(weeklyPlan).map((dayPlan) => {
            const isSelected = selectedDay === dayPlan.day.toLowerCase();
            return (
              <motion.button
                key={dayPlan.day}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(dayPlan.day.toLowerCase())}
                className={`p-4 rounded-xl text-left transition-colors focus:outline-none ${
                  isSelected
                    ? "bg-primary text-white shadow-lg shadow-primary/20 ring-2 ring-primary"
                    : "bg-surface-light border border-gray-800 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
                }`}
              >
                <p className="font-bold text-lg">{dayPlan.day}</p>
                <div
                  className={`flex items-center text-xs md:text-sm mt-1 ${
                    isSelected ? "text-white" : "text-gray-400"
                  }`}
                >
                  {/* ✅ Added icons next to the workout focus */}
                  {focusIcons[dayPlan.focus] || (
                    <Dumbbell className="w-4 h-4 mr-1" />
                  )}
                  {dayPlan.focus}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Daily Workout Video Display */}
        <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6 capitalize">
            {selectedDay}'s Focus:{" "}
            <span className="text-primary">{selectedWorkout.focus}</span>
          </h2>
          {videoIds.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {videoIds.map((videoId, index) => (
                <motion.div
                  key={videoId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="aspect-video bg-surface rounded-xl shadow-xl overflow-hidden border border-gray-800 group"
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube Workout Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-xl w-full h-full"
                  ></iframe>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-light border border-gray-800 rounded-2xl p-8 text-center h-64 md:h-80 flex flex-col justify-center items-center shadow-lg"
            >
              <Coffee size={56} className="text-primary mb-4" />
              <p className="text-2xl md:text-4xl font-bold text-white">
                {selectedWorkout.focus}
              </p>
              <p className="text-gray-400 mt-2 text-base md:text-lg">
                Recovery is key to progress. Enjoy your day off!
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
