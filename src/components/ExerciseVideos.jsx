import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircleOutline, Close } from "@mui/icons-material";

const VideoPlayerModal = ({ videoId, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-4xl aspect-video border border-gray-800">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:-top-4 md:-right-4 z-10 bg-surface border border-gray-700 rounded-full p-2 text-text-primary hover:text-primary hover:bg-gray-800 transition-colors"
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
        <h2 className="text-2xl sm:text-3xl font-bold text-text-secondary">
          Loading videos...
        </h2>
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

      <motion.section
        className="mt-12 lg:mt-24 px-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl lg:text-5xl font-extrabold text-center mb-12 text-white">
          Watch <span className="text-primary capitalize">{name}</span> Videos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-items-center">
          {exerciseVideos.slice(0, 3).map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedVideoId(item.video.videoId)}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.95 }}
              className="group block w-full max-w-sm bg-surface rounded-2xl shadow-lg overflow-hidden border border-gray-800 text-left"
            >
              <div className="relative">
                <img
                  src={item.video.thumbnails[0].url}
                  alt={item.video.title}
                  loading="lazy"
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircleOutline sx={{ fontSize: 64, color: "#03dac6" }} />
                </div>
              </div>
              <div className="p-5">
                <h3
                  className="text-lg md:text-xl font-bold text-white line-clamp-2"
                  title={item.video.title}
                >
                  {item.video.title}
                </h3>
                <p className="text-sm text-text-secondary mt-2">
                  {item.video.channelName}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default ExerciseVideos;
