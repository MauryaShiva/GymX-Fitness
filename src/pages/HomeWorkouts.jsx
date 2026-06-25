import React, { useState } from "react";
// Assuming you have a data file for the weekly plan
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
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="pt-4 min-h-screen px-4 lg:px-12 pb-nav-safe bg-background text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Weekly Home Plan
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto px-4">
            Your personalized schedule. Select a day to view routines.
          </p>
        </div>

        {/* Day Selector - Scrollable horizontally on mobile */}
        <div className="flex overflow-x-auto pb-6 gap-3 snap-x hide-scrollbar mb-8 md:grid md:grid-cols-7 md:gap-4 md:overflow-visible md:pb-0">
          {Object.values(weeklyPlan).map((dayPlan) => {
            const isSelected = selectedDay === dayPlan.day.toLowerCase();
            return (
              <button
                key={dayPlan.day}
                onClick={() => setSelectedDay(dayPlan.day.toLowerCase())}
                className={`snap-center shrink-0 w-40 md:w-auto p-4 rounded-2xl text-left transition-all duration-300 focus:outline-none ${
                  isSelected
                    ? "bg-primary text-background shadow-lg shadow-primary/20 scale-[1.02]"
                    : "bg-surface border border-gray-800 text-gray-300 hover:border-gray-600"
                }`}
              >
                <p className="font-bold text-lg">{dayPlan.day}</p>
                <div
                  className={`flex items-center text-sm mt-2 ${
                    isSelected ? "text-background/80" : "text-gray-500"
                  }`}
                >
                  {focusIcons[dayPlan.focus] || (
                    <Dumbbell className="w-4 h-4 mr-1.5" />
                  )}
                  {dayPlan.focus}
                </div>
              </button>
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
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 capitalize px-2">
              {selectedDay}'s Focus:{" "}
              <span className="text-primary">{selectedWorkout.focus}</span>
            </h2>
            {videoIds.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {videoIds.map((videoId, index) => (
                  <motion.div
                    key={videoId}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-video bg-surface rounded-2xl shadow-xl overflow-hidden border border-gray-800"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube Workout Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-2xl"
                    ></iframe>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-surface border border-gray-800 rounded-3xl p-8 text-center h-64 flex flex-col justify-center items-center shadow-lg">
                <Coffee size={48} className="text-primary mb-4" />
                <p className="text-3xl font-bold text-white mb-2">
                  {selectedWorkout.focus}
                </p>
                <p className="text-gray-400 text-base">
                  Recovery is key to progress. Enjoy your day off!
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeWorkouts;
