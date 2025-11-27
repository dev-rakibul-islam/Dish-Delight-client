"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  cardEntrance,
  sectionFade,
  staggeredChildren,
} from "@/components/common/motionVariants";

export function FeatureGrid({ highlights }) {
  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Why Dish Delight"
          title="Everything you need to manage your menu"
          description="We built this for restaurant owners and managers who want to take control of their online presence."
        />
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={staggeredChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {highlights.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardEntrance}
              whileHover="hover"
              className="surface-card flex flex-col gap-4 p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {feature.metric}
                </span>
              </div>
              <p className="text-sm text-slate-600">{feature.copy}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}
