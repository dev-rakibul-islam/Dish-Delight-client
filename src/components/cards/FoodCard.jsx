import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { cardEntrance } from "@/components/common/motionVariants";

function isValidUrl(url) {
  if (!url || typeof url !== "string") return false;
  try {
    new URL(url);
    return url.startsWith("http://") || url.startsWith("https://");
  } catch {
    return false;
  }
}

export function FoodCard({ item, layout = "vertical" }) {
  if (!item) return null;
  const { id, image, name, summary, price, category } = item;

  const validImage = isValidUrl(image)
    ? image
    : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

  return (
    <motion.article
      layout
      variants={cardEntrance}
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: true, amount: 0.25 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900",
        layout === "horizontal" ? "md:flex-row" : "h-full"
      )}
    >
      {/* Image Section */}
      <div
        className={cn(
          "relative overflow-hidden",
          layout === "horizontal" ? "md:w-2/5 h-64 md:h-auto" : "h-72 w-full"
        )}
      >
        <Image
          src={validImage}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

        {/* Category Tag */}
        <motion.span
          className="absolute left-5 top-5 rounded-full bg-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/30"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
        >
          {category}
        </motion.span>

        {/* Price Badge - Floating */}
        <div className="absolute bottom-5 right-5 z-10">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-110 dark:bg-zinc-800 dark:text-white">
            <span className="text-lg font-black tracking-tighter">
              ${price?.toFixed ? price.toFixed(0) : price}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        className={cn(
          "flex flex-1 flex-col justify-between p-6 relative",
          layout === "horizontal" && "md:w-3/5"
        )}
      >
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-orange-500/5 blur-3xl transition-all group-hover:bg-orange-500/10" />

        <div className="space-y-4 relative z-10">
          <h3 className="font-serif text-2xl font-bold text-zinc-800 transition-colors group-hover:text-orange-600 dark:text-zinc-100 leading-tight">
            {name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
            {summary}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 relative z-10">
          <Link
            href={`/item/${id}`}
            className="group/btn relative flex items-center gap-3 overflow-hidden rounded-full bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 dark:bg-white dark:text-zinc-900 dark:hover:bg-orange-500 dark:hover:text-white w-full justify-center"
          >
            <span className="relative z-10">View Details</span>
            <FiArrowUpRight className="relative z-10 text-lg transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
