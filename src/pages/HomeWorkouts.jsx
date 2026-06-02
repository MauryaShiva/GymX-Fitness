import React, { useState } from "react";
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
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen px-4 md:px-6 lg:px-12 pb-24 md:pb-12 bg-gray-950 text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Centered the header text for a more impactful title section */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-white mb-3 md:mb-4 tracking-tight">
            Weekly Home Plan
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            Your personalized weekly workout schedule. Select a day to view your
            video routines.
          </p>
        </div>

        {/* Day Selector - Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-7 gap-3 md:gap-4 mb-12 md:mb-16 pb-4 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
          {Object.values(weeklyPlan).map((dayPlan) => {
            const isSelected = selectedDay === dayPlan.day.toLowerCase();
            return (
              <button
                key={dayPlan.day}
                onClick={() => setSelectedDay(dayPlan.day.toLowerCase())}
                className={`min-w-[140px] lg:min-w-0 flex-shrink-0 snap-start p-3 md:p-4 rounded-xl text-left transition-all duration-300 transform md:hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 ${
                  isSelected
                    ? "bg-red-600 text-white shadow-lg shadow-red-500/20 md:scale-105 ring-2 ring-red-500"
                    : "bg-gray-900 border border-gray-800 hover:bg-gray-800 hover:border-gray-700"
                }`}
              >
                <p className="font-bold text-base md:text-lg">{dayPlan.day}</p>
                <div
                  className={`flex items-center text-xs md:text-sm mt-1 truncate ${
                    isSelected ? "text-red-100" : "text-gray-400"
                  }`}
                >
                  {focusIcons[dayPlan.focus] || (
                    <Dumbbell className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2 flex-shrink-0" />
                  )}
                  <span className="truncate">{dayPlan.focus}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Daily Workout Video Display */}
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 capitalize">
            {selectedDay}'s Focus:{" "}
            <span className="text-red-500">{selectedWorkout.focus}</span>
          </h2>
          {videoIds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {videoIds.map((videoId, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={videoId}
                  className="aspect-video bg-gray-900 rounded-xl md:rounded-2xl shadow-xl overflow-hidden border border-gray-800"
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube Workout Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12 text-center flex flex-col justify-center items-center shadow-lg">
              <Coffee size={48} className="text-red-500 mb-4 md:mb-6 md:w-16 md:h-16" />
              <p className="text-2xl md:text-4xl font-extrabold text-white mb-2">
                {selectedWorkout.focus}
              </p>
              <p className="text-gray-400 text-base md:text-lg max-w-md">
                Recovery is key to progress. Take time to stretch, hydrate, and enjoy your day off!
              </p>
            </div>
          )}
        </motion.div>
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
