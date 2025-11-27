import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { getItemById } from "@/lib/api";
import { formatDate, priceFormatter } from "@/utils/validators";

// Helper to validate URL
function isValidUrl(url) {
  if (!url || typeof url !== "string") return false;
  try {
    new URL(url);
    return url.startsWith("http://") || url.startsWith("https://");
  } catch {
    return false;
  }
}

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    const item = await getItemById(id);
    if (!item) return { title: "Item | Dish Delight" };
    return { title: `${item.name} | Dish Delight` };
  } catch (error) {
    return { title: "Item | Dish Delight" };
  }
}

export default async function ItemDetailsPage({ params }) {
  let item;
  try {
    const { id } = await params;
    item = await getItemById(id);
  } catch (error) {
    item = null;
  }

  if (!item) {
    notFound();
  }

  return (
    <div className="py-10">
      <Container className="space-y-8">
        <Button
          as="link"
          variant="secondary"
          href="/all-items"
          className="w-fit"
        >
          &larr; Back to all dishes
        </Button>
        <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <div className="relative h-96 overflow-hidden rounded-3xl">
              <Image
                src={
                  isValidUrl(item.image)
                    ? item.image
                    : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                }
                alt={item.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                {item.category}
              </p>
              <h1 className="text-4xl font-semibold text-slate-900">
                {item.name}
              </h1>
              <p className="text-lg text-slate-600">{item.summary}</p>
              <p className="text-base text-slate-600">{item.description}</p>
            </div>
          </div>
          <aside className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Details</h2>
            <dl className="mt-4 space-y-4 text-sm text-slate-600">
              <MetaRow
                label="Price"
                value={priceFormatter.format(item.price)}
              />
              <MetaRow label="Priority" value={item.priority} />
              <MetaRow
                label="Available"
                value={formatDate(item.availableDate)}
              />
              {item.ownerEmail && (
                <MetaRow label="Created by" value={item.ownerEmail} />
              )}
            </dl>
            <div className="mt-6 space-y-3">
              <Button
                as="link"
                variant="secondary"
                href="/add-product"
                className="w-full border"
              >
                Add another dish
              </Button>
              <Link
                href="/manage-products"
                className="block text-center rounded-3xl p-2 items-center justify-center border text-sm font-semibold text-slate-500 hover:text-primary"
              >
                Manage products
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-400">{label}</dt>
      <dd className="font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
