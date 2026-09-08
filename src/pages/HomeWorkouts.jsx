import React, { useState } from "react";
import { motion } from "framer-motion";
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="pt-24 min-h-screen px-4 sm:px-6 lg:px-12 pb-24 md:pb-12 bg-background text-text-primary"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-text-primary mb-4 tracking-tight">
            Weekly Home Plan
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
            Your personalized weekly workout schedule. Select a day to view your
            video routines.
          </p>
        </div>

        {/* Day Selector - Horizontal scroll on mobile for native app feel */}
        <div className="flex overflow-x-auto hide-scrollbar sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-12 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {Object.values(weeklyPlan).map((dayPlan) => {
            const isSelected = selectedDay === dayPlan.day.toLowerCase();
            return (
              <button
                key={dayPlan.day}
                onClick={() => setSelectedDay(dayPlan.day.toLowerCase())}
                className={`flex-shrink-0 w-40 sm:w-auto p-4 rounded-2xl text-left transition-all duration-300 transform sm:hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background active:scale-95 ${
                  isSelected
                    ? "bg-primary text-white shadow-lg shadow-primary/30 ring-1 ring-primary"
                    : "bg-surface border border-border hover:bg-surface-hover text-text-primary"
                }`}
              >
                <p className="font-bold text-lg">{dayPlan.day}</p>
                <div
                  className={`flex items-center text-sm mt-1 truncate ${
                    isSelected ? "text-white/90" : "text-text-secondary"
                  }`}
                >
                  {focusIcons[dayPlan.focus] || (
                    <Dumbbell className="w-5 h-5 mr-2" />
                  )}
                  {dayPlan.focus}
                </div>
              </button>
            );
          })}
        </div>

        {/* Daily Workout Video Display */}
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-text-primary mb-6 md:mb-8 capitalize">
            {selectedDay}'s Focus:{" "}
            <span className="text-primary">{selectedWorkout?.focus}</span>
          </h2>

          {videoIds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {videoIds.map((videoId, index) => (
                <motion.div
                  key={videoId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="aspect-video bg-surface rounded-2xl shadow-lg overflow-hidden border border-border group"
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube Workout Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-2xl w-full h-full"
                  ></iframe>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface border border-border rounded-3xl p-8 md:p-12 text-center flex flex-col justify-center items-center shadow-lg relative overflow-hidden"
              style={{ minHeight: "300px" }}
            >
              {/* Decorative background circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>

              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-inner mb-6 relative z-10 border border-border">
                <Coffee size={40} className="text-primary" />
              </div>
              <p className="text-3xl md:text-4xl font-extrabold text-text-primary relative z-10">
                {selectedWorkout?.focus || "Rest Day"}
              </p>
              <p className="text-text-secondary mt-3 text-lg md:text-xl max-w-md relative z-10">
                Recovery is key to progress. Enjoy your day off and recharge for tomorrow!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HomeWorkouts;
