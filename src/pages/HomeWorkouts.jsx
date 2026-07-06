import React, { useState } from "react";
import { motion } from "framer-motion";
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

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

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
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen px-4 md:px-6 lg:px-12 pb-safe bg-background text-text-primary mt-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Weekly Plan
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Your personalized weekly workout schedule.
          </p>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar pb-4 gap-4 mb-10 snap-x">
          {Object.values(weeklyPlan).map((dayPlan) => {
            const isSelected = selectedDay === dayPlan.day.toLowerCase();
            return (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={dayPlan.day}
                onClick={() => setSelectedDay(dayPlan.day.toLowerCase())}
                className={`snap-center flex-shrink-0 w-36 p-4 rounded-2xl text-left transition-all duration-300 focus:outline-none ${
                  isSelected
                    ? "bg-primary text-background shadow-lg shadow-primary/20"
                    : "bg-surface border border-gray-800 text-text-primary"
                }`}
              >
                <p className="font-bold text-lg">{dayPlan.day}</p>
                <div
                  className={`flex items-center text-xs mt-1 ${
                    isSelected ? "text-background/80" : "text-text-secondary"
                  }`}
                >
                  {focusIcons[dayPlan.focus] || (
                    <Dumbbell className="w-4 h-4 mr-1" />
                  )}
                  {dayPlan.focus}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6 capitalize px-2">
            Focus: <span className="text-primary">{selectedWorkout?.focus}</span>
          </h2>

          {videoIds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {videoIds.map((videoId, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={videoId}
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface border border-gray-800 rounded-3xl p-8 text-center h-64 flex flex-col justify-center items-center shadow-lg"
            >
              <Coffee size={48} className="text-primary mb-4" />
              <p className="text-2xl font-bold text-white mb-2">
                {selectedWorkout?.focus}
              </p>
              <p className="text-text-secondary">
                Recovery is key. Enjoy your day off!
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
