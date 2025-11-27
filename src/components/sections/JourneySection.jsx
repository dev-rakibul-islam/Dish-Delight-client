"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  cardEntrance,
  sectionFade,
  staggeredChildren,
} from "@/components/common/motionVariants";

export function JourneySection({ milestones }) {
  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Experience"
          title="From idea to plated spotlight"
          description="Smooth transitions, sticky navigation, and protected submissions let your culinary team stay laser-focused."
        />
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggeredChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {milestones.map((step, index) => (
            <motion.div
              key={step.label}
              variants={cardEntrance}
              whileHover="hover"
              className="rounded-3xl border border-white/30 bg-white/10 p-6 shadow-sm backdrop-blur-lg"
            >
              <div className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                <span className="text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step.label}
              </div>
              <p className="text-base text-slate-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
