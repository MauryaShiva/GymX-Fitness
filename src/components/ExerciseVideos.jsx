import React, { useState } from "react"; // 1. Import useState
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircleOutline, Close } from "@mui/icons-material";

// ✅ New component for the embedded video player modal
const VideoPlayerModal = ({ videoId, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative bg-surface rounded-lg shadow-2xl w-full max-w-3xl aspect-video">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 bg-white rounded-full p-1 text-background hover:bg-gray-200"
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
          className="rounded-lg"
        ></iframe>
      </div>
    </motion.div>
  );
};

const ExerciseVideos = ({ exerciseVideos, name }) => {
  // ✅ 2. State to keep track of the video to play
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  if (!exerciseVideos || exerciseVideos.length === 0) {
    return (
      <div className="mt-12 lg:mt-24 px-5 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-400">
          Loading videos...
        </h2>
      </div>
    );
  }

  return (
    <>
      {/* ✅ 3. AnimatePresence allows the modal to have an exit animation */}
      <AnimatePresence>
        {selectedVideoId && (
          <VideoPlayerModal
            videoId={selectedVideoId}
            onClose={() => setSelectedVideoId(null)}
          />
        )}
      </AnimatePresence>

      <motion.section
        className="w-full mt-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl lg:text-4xl font-extrabold text-left mb-8 md:mb-12 text-white tracking-tight leading-tight">
          Watch <span className="text-primary capitalize">{name}</span> tutorials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl mx-auto">
          {exerciseVideos.slice(0, 3).map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedVideoId(item.video.videoId)}
              className="group flex flex-col w-full bg-surface rounded-2xl overflow-hidden shadow-lg border border-gray-800 text-left"
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              {/* Video Thumbnail wrapper for 16:9 aspect ratio */}
              <div className="relative w-full pt-[56.25%] overflow-hidden bg-surface-hover">
                <img
                  src={item.video.thumbnails[0].url}
                  alt={item.video.title}
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm shadow-xl transform scale-90 group-hover:scale-110 transition-transform duration-300">
                    <PlayCircleOutline sx={{ fontSize: 32, color: "white" }} />
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <h3
                  className="text-lg font-bold text-gray-100 line-clamp-2 leading-snug group-hover:text-primary transition-colors"
                  title={item.video.title}
                >
                  {item.video.title}
                </h3>
                <p className="text-sm text-gray-400 mt-3 font-medium flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center text-xs font-bold text-gray-300">
                    {item.video.channelName.charAt(0)}
                  </span>
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
