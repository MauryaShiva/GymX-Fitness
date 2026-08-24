import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircleOutline, Close } from "@mui/icons-material";
import Loader from "./Loader.jsx";

// ✅ New component for the embedded video player modal
const VideoPlayerModal = ({ videoId, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-4xl aspect-video border border-gray-800">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 bg-surface rounded-full p-2 text-text-primary hover:text-primary shadow-lg border border-gray-700 transition-colors"
          aria-label="Close video player"
        >
          <Close />
        </button>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-2xl"
        ></iframe>
      </div>
    </motion.div>
  );
};

const ExerciseVideos = ({ exerciseVideos, name }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  if (!exerciseVideos || exerciseVideos.length === 0) {
    return (
      <div className="mt-12 lg:mt-24 px-5 text-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {selectedVideoId && (
          <VideoPlayerModal
            videoId={selectedVideoId}
            onClose={() => setSelectedVideoId(null)}
          />
        )}
      </AnimatePresence>

      <div id="exercise-videos" className="w-full mt-4 md:mt-8 p-4">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-text-primary">
          Watch <span className="text-primary capitalize">{name}</span> exercise
          videos
        </h2>

        <div className="flex flex-col lg:flex-row flex-wrap justify-start items-center lg:items-start gap-8 lg:gap-12 w-full">
          {exerciseVideos.slice(0, 3).map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedVideoId(item.video.videoId)}
              className="flex flex-col w-full max-w-[350px] gap-4 group text-left focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-surface shadow-lg">
                <img
                  src={item.video.thumbnails[0].url}
                  alt={item.video.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
                   <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                     <PlayCircleOutline sx={{ fontSize: 40, color: "#121212" }} />
                   </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 px-2">
                <h3
                  className="text-lg lg:text-xl font-semibold text-text-primary line-clamp-2 leading-tight"
                  title={item.video.title}
                >
                  {item.video.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {item.video.channelName}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExerciseVideos;
