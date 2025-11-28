"use client";

import { motion } from "framer-motion";

const doorVariants = {
  initial: { rotateY: 0 },
  animate: {
    rotateY: [0, -85, -85, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

const lightVariants = {
  initial: { opacity: 0.3 },
  animate: {
    opacity: [0.3, 1, 1, 0.3],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [20, 0, 0, 20],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-slate-900 via-slate-950 to-black px-6 py-10 perspective">
      <div className="flex flex-col items-center gap-8">
        {/* Door Container */}
        <div style={{ perspective: "1000px" }} className="relative h-96 w-64">
          {/* Door Frame */}
          <div className="absolute inset-0 rounded-2xl border-4 border-slate-700 bg-slate-950 shadow-2xl overflow-hidden">
            {/* Left Door */}
            <motion.div
              variants={doorVariants}
              initial="initial"
              animate="animate"
              style={{ originX: 0, originY: 0.5 }}
              className="absolute left-0 top-0 h-full w-1/2 bg-linear-to-r from-slate-800 to-slate-700 border-r-2 border-slate-600"
            >
              {/* Door Details */}
              <div className="relative h-full w-full">
                {/* Door Handle */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
                {/* Door Panels */}
                <div className="absolute inset-4 border-2 border-slate-600 rounded-lg opacity-60" />
                <div className="absolute inset-6 border border-slate-500 rounded-md opacity-40" />
              </div>
            </motion.div>

            {/* Right Door */}
            <motion.div
              variants={doorVariants}
              initial="initial"
              animate="animate"
              style={{ originX: 1, originY: 0.5 }}
              className="absolute right-0 top-0 h-full w-1/2 bg-linear-to-l from-slate-800 to-slate-700 border-l-2 border-slate-600"
            >
              {/* Door Details */}
              <div className="relative h-full w-full">
                {/* Door Handle */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
                {/* Door Panels */}
                <div className="absolute inset-4 border-2 border-slate-600 rounded-lg opacity-60" />
                <div className="absolute inset-6 border border-slate-500 rounded-md opacity-40" />
              </div>
            </motion.div>

            {/* Light Glow from Inside */}
            <motion.div
              variants={lightVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-linear-to-b from-orange-500/30 via-yellow-500/20 to-transparent"
            />
          </div>

          {/* Door Frame Shadow */}
          <div className="absolute -inset-2 rounded-2xl bg-black/30 blur-xl -z-10" />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500 mb-2">
              Welcome to
            </p>
            <h1 className="text-3xl font-black bg-linear-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Dish Delight
            </h1>
          </motion.div>

          {/* Animated Dots */}
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="w-2 h-2 rounded-full bg-yellow-500"
              />
            ))}
          </div>

          <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">
            Opening delicious experiences
          </p>
        </div>
      </div>
    </div>
  );
}
