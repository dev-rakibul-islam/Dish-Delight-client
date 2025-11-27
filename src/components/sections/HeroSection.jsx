"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { sectionFade } from "@/components/common/motionVariants";

export function HeroSection() {
  return (
    <motion.section
      className="relative overflow-hidden"
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1600&q=80"
          alt="Elegant dining table"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/50 via-white/30 to-white/60" />
      </div>
      <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
            Food & Restaurant
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Your menu. Online. Simple.
          </h1>
          <p className="text-lg text-slate-600">
            Share your dishes with customers. Add photos, descriptions, and
            prices. Your menu updates instantly. That's it.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button as="link" variant="secondary" href="/all-items">
              Explore menu
            </Button>
            <Button as="link" variant="secondary" href="/about">
              Learn more
            </Button>
          </div>
          {/* <div className="grid gap-6 sm:grid-cols-3">
            {["100% control", "Mobile ready", "Live in minutes"].map((stat) => (
              <div
                key={stat}
                className="rounded-2xl border border-white/30 bg-white/10 p-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-lg"
              >
                {stat}
              </div>
            ))}
          </div> */}
        </div>
        <div className="relative h-96 rounded-4xl border border-white/30 bg-white/10 shadow-md backdrop-blur-lg">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
            alt="Hero meal"
            fill
            className="rounded-4xl object-cover"
          />
          {/* <div className="absolute bottom-6 right-6 flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-slate-800 shadow-xl backdrop-blur-lg">
            <span className="h-3 w-3 rounded-full bg-orange-500" />
            Fresh menu
          </div> */}
        </div>
      </Container>
    </motion.section>
  );
}
