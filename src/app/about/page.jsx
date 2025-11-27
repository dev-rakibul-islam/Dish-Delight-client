import Image from "next/image";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";

const values = [
  {
    title: "Simple to use",
    description:
      "No complicated training or tech knowledge needed. If you can use email, you can manage your menu.",
  },
  {
    title: "Works everywhere",
    description:
      "Your menu looks great on phones, tablets, and computers. Your customers can browse however they want.",
  },
  {
    title: "Your control",
    description:
      "Only you can add or change your dishes. Your menu stays exactly how you want it. No surprises.",
  },
];

const milestones = [
  {
    title: "Who we are",
    detail:
      "We're a team of developers who love food and restaurants. We built this because we wanted to help small restaurants show off their menus online.",
  },
  {
    title: "How it works",
    detail:
      "You sign up, add your dishes with photos and descriptions, and your customers can see your menu right away. That's the core of what we built.",
  },
  {
    title: "Why it matters",
    detail:
      "A good online menu brings in more customers. We made it simple so you can focus on cooking great food, not managing technology.",
  },
];

export const metadata = {
  title: "About | Dish Delight",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-10">
      <section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
              our story
            </p>
            <h1 className="text-4xl font-semibold text-slate-900">
              A simple menu platform for restaurants.
            </h1>
            <p className="text-lg text-slate-600">
              We started Dish Delight to help restaurant owners like you get
              your menu online without the hassle. No coding. No confusion. Just
              upload your dishes and start sharing them with customers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button as="link" variant="secondary" href="/all-items">
                Explore dishes
              </Button>
              <Button as="link" variant="secondary" href="/contact">
                Work with us
              </Button>
            </div>
          </div>
          <div className="surface-card p-6">
            <Image
              src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80"
              alt="Team collaboration"
              width={900}
              height={700}
              className="h-full rounded-3xl object-cover"
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="what we believe"
            title="Restaurant owners deserve simple tools"
            description="That's why we made everything straightforward. No overcomplicated features. Just what you need to show off your food."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="How we built it"
            title="Built for restaurant owners"
            description="Every decision we made was focused on making your life easier."
            align="left"
          />
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.title}
                className="frosted-panel flex flex-col gap-2 p-6 md:flex-row md:items-center md:gap-6"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-slate-900">
                    {milestone.title}
                  </p>
                  <p className="text-sm text-slate-600">{milestone.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
