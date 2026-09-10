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
    <div className="pt-24 min-h-screen px-6 lg:px-12 pb-12 bg-gradient-to-b from-gray-900 to-black text-white">
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
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
          {Object.values(weeklyPlan).map((dayPlan) => {
            const isSelected = selectedDay === dayPlan.day.toLowerCase();
            return (
              <button
                key={dayPlan.day}
                onClick={() => setSelectedDay(dayPlan.day.toLowerCase())}
                // ✅ Enhanced styling for buttons:
                // - Added a subtle border and shadow for a "card" feel.
                // - Improved hover and selected states for better interactivity.
                className={`p-4 rounded-xl text-left transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${
                  isSelected
                    ? "bg-red-600 text-white shadow-lg scale-105 ring-2 ring-red-500"
                    : "bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-red-500"
                }`}
              >
                <p className="font-bold text-lg">{dayPlan.day}</p>
                <div
                  className={`flex items-center text-sm mt-1 ${
                    isSelected ? "text-red-100" : "text-gray-400"
                  }`}
                >
                  {/* ✅ Added icons next to the workout focus */}
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
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 capitalize">
            {selectedDay}'s Focus:{" "}
            <span className="text-red-500">{selectedWorkout.focus}</span>
          </h2>
          {videoIds.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {videoIds.map((videoId, index) => (
                // ✅ Added a fade-in animation to the video cards
                <div
                  key={videoId}
                  className="aspect-video bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 transform hover:scale-105 transition-transform duration-300"
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
            // ✅ Revamped the "Rest Day" card to be more visually appealing
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 text-center h-80 flex flex-col justify-center items-center shadow-lg">
              <Coffee size={64} className="text-red-500 mb-4" />
              <p className="text-4xl font-bold text-white">
                {selectedWorkout.focus}
              </p>
              <p className="text-gray-400 mt-2 text-lg">
                Recovery is key to progress. Enjoy your day off!
              </p>
            </div>
          )}
        </div>
      </div>
      {/* ✅ Added a keyframes animation for the fade-in effect */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HomeWorkouts;
