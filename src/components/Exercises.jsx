import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import ExerciseCard from "./ExerciseCard.jsx";
import allExercisesData from "../data/exercises.json";

// Create a dark theme for MUI Pagination
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#03dac6', // Tailwind's primary color
    },
    background: {
      default: '#121212',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const Exercises = ({ exercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(9); // Fixed exercises per page

  // Calculate the index range for the current page
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };

  useEffect(() => {
    // Whenever exercises change (e.g., due to search/filter), reset to page 1
    setCurrentPage(1);
  }, [exercises]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div id="exercises" className="w-full mt-12 p-5 lg:p-20">
        <h3 className="text-3xl lg:text-4xl font-bold mb-12 text-text-primary tracking-tight">
          Showing Results
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 justify-center items-center">
          <AnimatePresence mode="popLayout">
            {currentExercises.map((exercise, index) => (
              <motion.div
                key={exercise.exerciseId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="w-full flex justify-center"
              >
                <ExerciseCard exercise={exercise} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {exercises.length > 9 && (
          <div className="mt-20 flex justify-center pb-safe">
            <Pagination
              color="primary"
              shape="rounded"
              defaultPage={1}
              count={Math.ceil(exercises.length / exercisesPerPage)}
              page={currentPage}
              onChange={paginate}
              size={window.innerWidth < 768 ? "medium" : "large"}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#ffffff',
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: '#03dac6',
                  color: '#121212',
                  fontWeight: 'bold',
                }
              }}
            />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Exercises;
