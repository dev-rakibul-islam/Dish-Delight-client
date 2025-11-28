"use client";

import { motion } from "framer-motion";

const skeletonVariants = {
  initial: { opacity: 0.6, backgroundColor: "#e2e8f0" },
  animate: {
    opacity: [0.6, 1, 0.6],
    backgroundColor: ["#e2e8f0", "#cbd5e1", "#e2e8f0"],
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
      <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm backdrop-blur-lg">
        <div className="grid gap-4 border-b border-slate-200 pb-6 md:grid-cols-3">
          {/* Search Input Skeleton */}
          <div className="md:col-span-2">
            <div className="text-sm font-semibold text-slate-600 mb-2">
              Search dishes
            </div>
            <motion.div
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              className="h-10 w-full rounded-2xl"
            />
          </div>
          {/* Category Select Skeleton */}
          <div>
            <div className="text-sm font-semibold text-slate-600 mb-2">
              Category
            </div>
            <motion.div
              variants={skeletonVariants}
              initial="initial"
              animate="animate"
              className="h-10 w-full rounded-2xl"
            />
          </div>
        </div>

        {/* Results Info Skeleton */}
        <div className="mt-6">
          <motion.div
            variants={skeletonVariants}
            initial="initial"
            animate="animate"
            className="h-4 w-24 rounded-lg"
          />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1,
              }}
              className="rounded-2xl overflow-hidden border border-slate-200"
            >
              {/* Image Skeleton */}
              <motion.div
                variants={skeletonVariants}
                className="h-40 md:h-48 w-full"
              />

              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                {/* Title Skeleton */}
                <motion.div
                  variants={skeletonVariants}
                  className="h-4 w-3/4 rounded-lg"
                />

                {/* Description Skeleton */}
                <div className="space-y-2">
                  <motion.div
                    variants={skeletonVariants}
                    className="h-3 w-full rounded-lg"
                  />
                  <motion.div
                    variants={skeletonVariants}
                    className="h-3 w-4/5 rounded-lg"
                  />
                </div>

                {/* Price & Button Skeleton */}
                <div className="flex items-center justify-between pt-2">
                  <motion.div
                    variants={skeletonVariants}
                    className="h-4 w-20 rounded-lg"
                  />
                  <motion.div
                    variants={skeletonVariants}
                    className="h-8 w-16 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
