"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import {
  cardEntrance,
  sectionFade,
  staggeredChildren,
} from "@/components/common/motionVariants";

export function TestimonialsSection({ testimonials }) {
  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by culinary innovators"
          description="Design-forward operators rely on Dish Delight for consistent experiences and confident stakeholder demos."
        />
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={staggeredChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {testimonials.map((testimonial) => (
            <motion.figure
              key={testimonial.author}
              variants={cardEntrance}
              whileHover="hover"
              className="surface-card flex flex-col gap-4 p-6"
            >
              <p className="text-base text-slate-600">“{testimonial.quote}”</p>
              <figcaption className="text-sm font-semibold text-slate-900">
                {testimonial.author}
                <span className="block text-xs font-normal text-slate-500">
                  {testimonial.role}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
        <motion.div
          className="frosted-panel flex flex-col gap-4 p-6 text-center md:flex-row md:items-center md:justify-between md:text-left"
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div>
            <p className="text-lg font-semibold text-slate-900">
              Ready to curate your own Dish Delight collection?
            </p>
            <p className="text-sm text-slate-600">
              Sign in to unlock protected add/manage tooling and keep your menus
              organized.
            </p>
          </div>
          <Button as="link" href="/login">
            Get started
          </Button>
        </motion.div>
      </Container>
    </motion.section>
  );
}
