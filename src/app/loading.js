"use client";

import { motion } from "framer-motion";
import { loaderBar } from "@/components/common/motionVariants";

const loaderBars = [0, 1, 2];

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950/80 px-6 py-10">
      <div className="flex items-end gap-3 rounded-3xl bg-white/5 px-8 py-6 shadow-2xl shadow-slate-950/80 backdrop-blur">
        {loaderBars.map((index) => (
          <motion.span
            key={index}
            custom={index * 0.1}
            variants={loaderBar}
            initial="initial"
            animate="animate"
            className="block h-12 w-3 rounded-full bg-linear-to-b from-primary/90 to-secondary/90"
          />
        ))}
        <span className="ml-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-300">
          Loading
        </span>
      </div>
    </div>
  );
}
