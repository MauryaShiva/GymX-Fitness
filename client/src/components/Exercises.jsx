import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const baseBtn = "w-10 h-10 rounded-md transition-colors duration-200";
  const active = "bg-primary text-background font-bold";
  const idle = "bg-surface text-text-secondary hover:bg-gray-700";

  return (
    <nav aria-label="Pagination">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {/* Prev */}
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-3 h-10 rounded-md bg-surface hover:bg-gray-700"
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
            <li className="px-2 select-none">…</li>
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
            <li className="px-2 select-none">…</li>
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
              className="px-3 h-10 rounded-md bg-surface hover:bg-gray-700"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

// ✅ UPDATED Exercises component
const Exercises = ({ exercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  // ✅ UPDATED: useEffect now only resets pagination when the filtered list changes.
  // It no longer performs the filtering itself.
  useEffect(() => {
    setCurrentPage(1);
  }, [exercises]);

  // Pagination slice logic remains the same
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
    <section id="exercises" className="mt-12 p-5">
      <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-text-primary capitalize">
        Showing Results for: <span className="text-primary">{bodyPart}</span>
      </h2>

      <AnimatePresence>
        <motion.div
          key={bodyPart}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 min-h-[500px]"
        >
          {currentExercises.length ? (
            currentExercises.map((exercise) => (
              <motion.div variants={itemVariants} key={exercise.exerciseId}>
                <ExerciseCard exercise={exercise} />
              </motion.div>
            ))
          ) : (
            <p className="text-text-secondary col-span-3 text-center self-center">
              No exercises found for this category.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-16 lg:mt-24 flex justify-center">
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
