const DEFAULT_API_BASE = "https://dish-delight-sever.vercel.app";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  DEFAULT_API_BASE;

export const APP_META = {
  title: "Dish Delight",
  description:
    "Dish Delight is a curated food management experience with polished UI, protected workflows, and effortless discovery.",
  keywords: ["nextjs", "food", "restaurant", "dashboard", "nextauth"],
};
