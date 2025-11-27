import { HeroSection } from "@/components/sections/HeroSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { SpotlightMenu } from "@/components/sections/SpotlightMenu";
import { JourneySection } from "@/components/sections/JourneySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { getPublicItems } from "@/lib/api";

const featureHighlights = [
  {
    title: "Easy menu updates",
    copy: "Add new dishes, update prices, and manage inventory all in one place.",
    metric: "Live in seconds",
  },
  {
    title: "Your own control",
    copy: "Only you can add and manage your dishes. Keep your menu exactly how you want it.",
    metric: "100% yours",
  },
  {
    title: "Customer browsing",
    copy: "Your customers see all your dishes with photos, descriptions, and prices.",
    metric: "Always updated",
  },
  {
    title: "Mobile friendly",
    copy: "Works great on phones, tablets, and computers. Your customers can browse anywhere.",
    metric: "All devices",
  },
];

const journeyMilestones = [
  {
    label: "Sign up",
    description:
      "Create your account and get started in minutes. No complicated setup required.",
  },
  {
    label: "Add dishes",
    description:
      "Upload photos, write descriptions, and set prices for your signature dishes.",
  },
  {
    label: "Go live",
    description:
      "Your menu is ready. Share it with your customers and watch them explore.",
  },
];

const testimonials = [
  {
    quote:
      "Finally, a simple way to show our customers what we're cooking. We updated our menu in under 10 minutes.",
    author: "Sarah Johnson",
    role: "Owner, The Daily Cafe",
  },
  {
    quote:
      "Our team loves how easy it is to manage. No tech knowledge needed. We just upload photos and go.",
    author: "James Chen",
    role: "Head Chef, Urban Eats",
  },
  {
    quote:
      "Our customers keep coming back. Having an up-to-date menu with photos makes a real difference.",
    author: "Maria Rodriguez",
    role: "Manager, Mesa Verde",
  },
];

export default async function HomePage() {
  const items = await getPublicItems();
  const spotlight = items.slice(0, 6);

  return (
    <div className="space-y-24 pb-16">
      <HeroSection />
      <FeatureGrid highlights={featureHighlights} />
      <SpotlightMenu items={spotlight} />
      <JourneySection milestones={journeyMilestones} />
      <TestimonialsSection testimonials={testimonials} />
    </div>
  );
}
