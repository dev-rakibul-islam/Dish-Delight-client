"use client";

import { motion } from "framer-motion";

const skeletonVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function ItemsLoading() {
  return (
    <div className="space-y-6">
      {/* Filter Bar Skeleton */}
      <div className="rounded-3xl border border-white/30 bg-white/10 p-6 shadow-sm backdrop-blur-lg">
        <div className="grid gap-4 border-b border-slate-100 pb-6 md:grid-cols-3">
          {/* Search Input Skeleton */}
          <div className="md:col-span-2">
            <div className="text-sm font-semibold text-slate-700 mb-2">
              Search dishes
            </div>
            <motion.div
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              className="h-10 w-full rounded-2xl bg-slate-200"
            />
          </div>
          {/* Category Select Skeleton */}
          <div>
            <div className="text-sm font-semibold text-slate-700 mb-2">
              Category
            </div>
            <motion.div
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              className="h-10 w-full rounded-2xl bg-slate-200"
            />
          </div>
        </div>

        {/* Results Info Skeleton */}
        <div className="mt-6">
          <motion.div
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
            className="h-4 w-24 rounded-lg bg-slate-200"
          />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1,
              }}
              className="rounded-2xl bg-slate-200 overflow-hidden"
            >
              {/* Image Skeleton */}
              <div className="h-40 md:h-48 w-full bg-slate-300" />

              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                {/* Title Skeleton */}
                <div className="h-4 w-3/4 rounded-lg bg-slate-300" />

                {/* Description Skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-full rounded-lg bg-slate-300" />
                  <div className="h-3 w-4/5 rounded-lg bg-slate-300" />
                </div>

                {/* Price & Button Skeleton */}
                <div className="flex items-center justify-between pt-2">
                  <div className="h-4 w-20 rounded-lg bg-slate-300" />
                  <div className="h-8 w-16 rounded-full bg-slate-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
