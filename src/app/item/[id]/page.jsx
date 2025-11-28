import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { getItemById } from "@/lib/api";
import { formatDate, priceFormatter } from "@/utils/validators";
import { FiArrowLeft, FiShare2, FiHeart } from "react-icons/fi";

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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 py-8 md:py-12 lg:py-16">
      <Container>
        {/* Back Button */}
        <Link
          href="/all-items"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-all duration-300 hover:text-primary md:mb-12"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to all dishes
        </Link>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">
          {/* Left Side - Image Section */}
          <div className="flex flex-col gap-6">
            {/* Main Image Container */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-72 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src={
                    isValidUrl(item.image)
                      ? item.image
                      : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs sm:text-sm font-bold text-primary shadow-lg">
                    {item.category}
                  </span>
                </div>
                {/* Action Buttons Overlay */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-3">
                  <button className="p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110">
                    <FiHeart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </button>
                  <button className="p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110">
                    <FiShare2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </button>
                </div>
              </div>
            </div>

            {/* Image Info Pills - Mobile View */}
            <div className="grid grid-cols-3 gap-3 lg:hidden">
              <div className="glass-panel p-4 text-center">
                <p className="text-xs text-slate-500 mb-1">Priority</p>
                <p className="text-lg font-bold text-primary">
                  {item.priority}
                </p>
              </div>
              <div className="glass-panel p-4 text-center">
                <p className="text-xs text-slate-500 mb-1">Price</p>
                <p className="text-lg font-bold text-secondary">
                  {priceFormatter.format(item.price)}
                </p>
              </div>
              <div className="glass-panel p-4 text-center">
                <p className="text-xs text-slate-500 mb-1">Available</p>
                <p className="text-xs font-bold text-slate-900">
                  {formatDate(item.availableDate).split(",")[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Content Section */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Title & Description */}
            <div className="space-y-4 lg:space-y-6">
              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary mb-3">
                  Premium Dish
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-4">
                  {item.name}
                </h1>
              </div>

              {/* Summary */}
              <p className="text-lg sm:text-xl text-slate-700 font-semibold leading-relaxed">
                {item.summary}
              </p>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Details Section */}
            <div className="glass-panel p-6 sm:p-8 space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Item Details
              </h2>

              <div className="space-y-4">
                {/* Price - Prominent */}
                <div className="flex items-center justify-between p-4 bg-linear-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10">
                  <span className="text-sm font-semibold text-slate-600">
                    Price
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-primary">
                    {priceFormatter.format(item.price)}
                  </span>
                </div>

                {/* Other Details */}
                <div className="grid grid-cols-2 gap-4">
                  <DetailCard label="Priority" value={item.priority} />
                  <DetailCard
                    label="Available"
                    value={formatDate(item.availableDate).split(",")[0]}
                  />
                </div>

                {/* Owner Info */}
                {item.ownerEmail && (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                      {item.ownerEmail[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Created by</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {item.ownerEmail}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                as="link"
                variant="primary"
                href="/add-product"
                className="flex-1 py-4 text-base"
              >
                + Add another dish
              </Button>
              <Link
                href="/manage-products"
                className="flex items-center justify-center flex-1 px-6 py-4 bg-white border-2 border-slate-200 rounded-full font-bold text-slate-900 hover:border-primary hover:text-primary transition-all duration-300 text-base"
              >
                Manage products
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
      <p className="text-xs sm:text-sm text-slate-500 font-medium mb-2">
        {label}
      </p>
      <p className="text-base sm:text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}
