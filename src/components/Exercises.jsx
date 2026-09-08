import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import allExercisesData from "../data/exercises.json";
import ExerciseCard from "./ExerciseCard.jsx";
import Loader from "./Loader.jsx";

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

  const baseBtn = "w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all duration-200 flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-sm active:scale-95";
  const active = "bg-primary text-white font-bold shadow-md shadow-primary/30";
  const idle = "bg-surface border border-border text-text-secondary hover:bg-surface-hover hover:text-text-primary";

  return (
    <nav aria-label="Pagination" className="w-full flex justify-center pb-8">
      <ul className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {/* Prev */}
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-4 h-10 md:h-12 rounded-xl bg-surface border border-border text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all shadow-sm active:scale-95 font-medium"
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
            <li className="px-1 text-text-muted select-none">…</li>
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
            <li className="px-1 text-text-muted select-none">…</li>
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
              className="px-4 h-10 md:h-12 rounded-xl bg-surface border border-border text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all shadow-sm active:scale-95 font-medium"
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
    <section id="exercises" className="mt-8 md:mt-12 p-4 md:p-5 w-full">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 md:mb-10 text-text-primary capitalize border-l-4 border-primary pl-4">
        Showing Results for: <span className="text-primary font-extrabold">{bodyPart}</span>
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={bodyPart + currentPage}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 min-h-[500px] w-full justify-items-center sm:justify-items-stretch"
        >
          {currentExercises.length ? (
            currentExercises.map((exercise) => (
              <motion.div variants={itemVariants} key={exercise.exerciseId} className="w-full max-w-sm sm:max-w-none">
                <ExerciseCard exercise={exercise} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">No exercises found</h3>
              <p className="text-text-muted max-w-md">Try searching for a different muscle group, equipment, or exercise name.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 lg:mt-20 flex justify-center">
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
