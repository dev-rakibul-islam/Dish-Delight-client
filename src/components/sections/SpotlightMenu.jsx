"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { FoodCard } from "@/components/cards/FoodCard";
import { sectionFade } from "@/components/common/motionVariants";

export function SpotlightMenu({ items }) {
  if (!items.length) return null;

  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Spotlight menu"
          title="Polished cards with hover micro-interactions"
          description="Every dish carries balanced spacing, truncated summaries, and immediate CTA access."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button as="link" href="/all-items" className="gap-2">
            Browse full collection
            <FiArrowRight />
          </Button>
        </div>
      </Container>
    </motion.section>
  );
}
