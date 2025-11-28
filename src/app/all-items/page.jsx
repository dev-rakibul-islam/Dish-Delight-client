import { Suspense } from "react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { getPublicItems } from "@/lib/api";
import { ItemsExplorer } from "@/components/catalog/ItemsExplorer";
import { ItemsLoading } from "@/components/catalog/ItemsLoading";

export const metadata = {
  title: "All Items | Dish Delight",
};

export default async function AllItemsPage() {
  const items = await getPublicItems();
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <div className="space-y-12 py-10">
      <Container className="space-y-8">
        <SectionHeading
          align="left"
          eyebrow="All services"
          title="Explore every plated experience"
          description="Search, filter, and deep dive into the dishes powering Dish Delight. Each card keeps descriptions concise with ellipses and CTA-ready layouts."
        />
        <Suspense fallback={<DesktopLoadingOnly />}>
          <ItemsExplorer initialItems={items} categories={categories} />
        </Suspense>
      </Container>
    </div>
  );
}

function DesktopLoadingOnly() {
  return (
    <div className="hidden md:block">
      <ItemsLoading />
    </div>
  );
}
