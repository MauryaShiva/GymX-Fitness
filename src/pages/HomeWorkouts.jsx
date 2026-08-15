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
      transition={{ duration: 0.3 }}
      className="pt-12 md:pt-24 min-h-screen px-4 sm:px-6 lg:px-12 pb-12 bg-background text-text-primary"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-text-primary mb-4 tracking-tight">
            Weekly Home Plan
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto px-2">
            Your personalized weekly workout schedule. Select a day to view your
            video routines.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4 mb-12 md:mb-16">
          {Object.values(weeklyPlan).map((dayPlan) => {
            const isSelected = selectedDay === dayPlan.day.toLowerCase();
            return (
              <button
                key={dayPlan.day}
                onClick={() => setSelectedDay(dayPlan.day.toLowerCase())}
                className={`p-3 md:p-4 rounded-xl text-left transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background ${
                  isSelected
                    ? "bg-primary text-background shadow-lg scale-105 ring-2 ring-primary"
                    : "bg-surface border border-gray-800 hover:bg-gray-800 hover:border-primary text-text-primary"
                }`}
              >
                <p className="font-bold text-sm md:text-lg">{dayPlan.day}</p>
                <div
                  className={`flex items-center text-xs md:text-sm mt-1 ${
                    isSelected ? "text-background/80" : "text-text-secondary"
                  }`}
                >
                  {focusIcons[dayPlan.focus] || (
                    <Dumbbell className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                  )}
                  {dayPlan.focus}
                </div>
              </button>
            );
          })}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-6 md:mb-8 capitalize text-center md:text-left">
            {selectedDay}'s Focus:{" "}
            <span className="text-primary">{selectedWorkout.focus}</span>
          </h2>
          {videoIds.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {videoIds.map((videoId, index) => (
                <div
                  key={videoId}
                  className="aspect-video bg-surface rounded-xl shadow-xl overflow-hidden border border-gray-800 transform hover:scale-[1.02] transition-transform duration-300"
                  style={{
                    animation: `fadeIn 0.5s ease-in-out ${
                      index * 0.1
                    }s forwards`,
                    opacity: 0,
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube Workout Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-xl"
                  ></iframe>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface border border-gray-800 rounded-xl p-8 text-center h-64 md:h-80 flex flex-col justify-center items-center shadow-lg">
              <Coffee size={48} className="text-primary mb-4 md:mb-6 md:w-16 md:h-16" />
              <p className="text-2xl md:text-4xl font-bold text-text-primary">
                {selectedWorkout.focus}
              </p>
              <p className="text-text-secondary mt-2 text-base md:text-lg">
                Recovery is key to progress. Enjoy your day off!
              </p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </motion.div>
  );
};

export default HomeWorkouts;
