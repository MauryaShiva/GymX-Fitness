import React, { useState } from "react";
import { motion } from "framer-motion";
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

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3
};

const HomeWorkouts = () => {
  const currentDay = new Intl.DateTimeFormat("en-US", { weekday: "long" })
    .format(new Date())
    .toLowerCase();
  const [selectedDay, setSelectedDay] = useState(currentDay);

  const selectedWorkout = weeklyPlan[selectedDay];
  const videoIds = selectedWorkout?.videos || [];

  return (
    // ✅ Wrapped in motion.div for page transitions
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen pt-4 pb-20 md:pb-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* ✅ Centered the header text for a more impactful title section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Weekly Plan
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Your personalized weekly workout schedule. Select a day to view your
            video routines.
          </p>
        </div>

        {/* Day Selector - Enhanced with horizontal scroll on mobile for better fit */}
        <div className="flex overflow-x-auto pb-4 mb-8 md:mb-16 gap-3 hide-scrollbar px-2 sm:px-0 sm:grid sm:grid-cols-4 lg:grid-cols-7 sm:gap-4">
          {Object.values(weeklyPlan).map((dayPlan) => {
            const isSelected = selectedDay === dayPlan.day.toLowerCase();
            return (
              <button
                key={dayPlan.day}
                onClick={() => setSelectedDay(dayPlan.day.toLowerCase())}
                className={`flex-shrink-0 w-32 sm:w-auto p-4 rounded-2xl text-left transition-all duration-300 active:scale-95 focus:outline-none ${
                  isSelected
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "bg-gray-900 border border-gray-800 text-gray-400 hover:bg-gray-800"
                }`}
              >
                <p className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-200'}`}>{dayPlan.day}</p>
                <div
                  className={`flex items-center text-xs mt-2 font-medium ${
                    isSelected ? "text-red-100" : "text-gray-500"
                  }`}
                >
                  {/* ✅ Added icons next to the workout focus */}
                  {focusIcons[dayPlan.focus] || (
                    <Dumbbell className="w-4 h-4 mr-1.5" />
                  )}
                  <span className="truncate">{dayPlan.focus}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Daily Workout Video Display */}
        <div className="px-2 sm:px-0">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8 capitalize flex items-center gap-2">
            <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-lg text-sm md:text-xl">{selectedDay}</span>
            <span className="text-gray-400 text-xl md:text-3xl font-medium">Focus:</span>
            {selectedWorkout.focus}
          </h2>

          {videoIds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {videoIds.map((videoId, index) => (
                <motion.div
                  key={videoId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="aspect-video bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800 relative group"
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube Workout Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </motion.div>
              ))}
            </div>
          ) : (
            // ✅ Revamped the "Rest Day" card to be more visually appealing
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-8 md:p-12 text-center flex flex-col justify-center items-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="bg-gray-800 p-6 rounded-full mb-6 z-10 border border-gray-700">
                <Coffee size={48} className="text-red-500" />
              </div>
              <p className="text-3xl md:text-5xl font-extrabold text-white mb-4 z-10">
                {selectedWorkout.focus}
              </p>
              <p className="text-gray-400 text-base md:text-xl max-w-md mx-auto z-10 leading-relaxed">
                Recovery is key to progress. Let your muscles rebuild and enjoy your day off!
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default HomeWorkouts;
