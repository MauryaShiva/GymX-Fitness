import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import allExercisesData from "../data/exercises.json";
import ExerciseCard from "./ExerciseCard.jsx";
import Loader from "./Loader.jsx";

// This component remains exactly the same as your original.
const CustomPagination = ({
  exercisesPerPage,
  totalExercises,
  paginate,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalExercises / exercisesPerPage);

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  const baseBtn = "w-10 h-10 rounded-md transition-colors duration-200 text-sm md:text-base";
  const active = "bg-primary text-white font-bold shadow-lg shadow-primary/20";
  const idle = "bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary border border-border";

  return (
    <nav aria-label="Pagination">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {/* Prev */}
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-3 md:px-4 h-10 rounded-md bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary border border-border transition-colors duration-200 text-sm md:text-base"
            >
              Prev
            </button>
          </li>
        )}

        {/* First + ellipsis */}
        {startPage > 1 && (
          <>
            <li>
              <button
                onClick={() => paginate(1)}
                className={`${baseBtn} ${currentPage === 1 ? active : idle}`}
              >
                1
              </button>
            </li>
            <li className="px-2 select-none text-text-muted">…</li>
          </>
        )}

        {/* Middle window */}
        {pageNumbers.map((n) => (
          <li key={n}>
            <button
              onClick={() => paginate(n)}
              className={`${baseBtn} ${currentPage === n ? active : idle}`}
            >
              {n}
            </button>
          </li>
        ))}

        {/* Ellipsis + Last */}
        {endPage < totalPages && (
          <>
            <li className="px-2 select-none text-text-muted">…</li>
            <li>
              <button
                onClick={() => paginate(totalPages)}
                className={`${baseBtn} ${
                  currentPage === totalPages ? active : idle
                }`}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Next */}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-3 md:px-4 h-10 rounded-md bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary border border-border transition-colors duration-200 text-sm md:text-base"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

const Exercises = ({ exercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [exercises]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    document
      .getElementById("exercises")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (!exercises) {
    return <Loader fullScreen={false} />;
  }

  return (
    <section id="exercises" className="mt-8 md:mt-12 p-5">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-text-primary capitalize">
        Showing Results for: <span className="text-primary">{bodyPart}</span>
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={bodyPart + currentPage}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 min-h-[500px]"
        >
          {currentExercises.length ? (
            currentExercises.map((exercise) => (
              <motion.div variants={itemVariants} key={exercise.exerciseId}>
                <ExerciseCard exercise={exercise} />
              </motion.div>
            ))
          ) : (
            <p className="text-text-secondary col-span-1 sm:col-span-2 lg:col-span-3 text-center self-center text-lg">
              No exercises found for this category.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 md:mt-16 lg:mt-24 flex justify-center">
        {exercises.length > exercisesPerPage && (
          <CustomPagination
            exercisesPerPage={exercisesPerPage}
            totalExercises={exercises.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </section>
  );
};

export default Exercises;
