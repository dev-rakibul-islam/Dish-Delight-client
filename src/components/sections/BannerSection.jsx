"use client";

import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

export function BannerSection() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=2000&q=80"
          alt="Chef preparing a dish"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-br from-slate-900/90 via-slate-900/50 to-transparent" />
      </div>
      <Container className="relative z-10 flex min-h-[420px] flex-col justify-center gap-6 py-20 text-white">
        <p className="text-xs uppercase tracking-[0.4em] text-orange-300">
          Seasonal banner
        </p>
        <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Celebrate each season with a banner-worthy spread.
        </h2>
        <p className="max-w-3xl text-base text-white/80 sm:text-lg">
          Whether you are highlighting specials or showcasing new items, this
          full-width backdrop keeps the focus on your culinary stories while
          keeping every device covered edge to edge.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button as="link" href="/all-items">
            Explore the menu
          </Button>
          <Button as="link" variant="secondary" href="/contact">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
