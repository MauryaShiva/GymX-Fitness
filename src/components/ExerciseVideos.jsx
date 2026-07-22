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
        <h2 className="text-2xl sm:text-3xl font-bold text-text-secondary">
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
        className="mt-8 lg:mt-12 px-0 md:px-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-8 text-white tracking-tight">
          Watch <span className="text-primary capitalize">{name}</span> tutorials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {exerciseVideos.slice(0, 3).map((item, index) => (
            // ✅ 4. Changed the <a> tag to a <button> to trigger the modal
            <button
              key={index}
              onClick={() => setSelectedVideoId(item.video.videoId)}
              className="group block w-full bg-surface rounded-2xl shadow-lg border border-gray-800 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/20 text-left"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.video.thumbnails[0].url}
                  alt={item.video.title}
                  loading="lazy"
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <PlayCircleOutline sx={{ fontSize: 64, color: "white" }} />
                </div>
              </div>
              <div className="p-5">
                <h3
                  className="text-lg font-bold text-white line-clamp-2 leading-tight mb-2"
                  title={item.video.title}
                >
                  {item.video.title}
                </h3>
                <p className="text-sm text-gray-400 font-medium">
                  {item.video.channelName}
                </p>
              </div>
            </button>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default ExerciseVideos;
