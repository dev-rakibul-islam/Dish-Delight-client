"use client";

import { useMemo, useState } from "react";
import { FoodCard } from "@/components/cards/FoodCard";

const normalizeText = (value) =>
  value === null || value === undefined ? "" : String(value).toLowerCase();

export function ItemsExplorer({ initialItems, categories }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return initialItems.filter((item) => {
      const matchesQuery = normalized
        ? normalizeText(item.name).includes(normalized) ||
          normalizeText(item.category).includes(normalized) ||
          normalizeText(item.summary).includes(normalized)
        : true;
      const matchesCategory = category ? item.category === category : true;
      return matchesQuery && matchesCategory;
    });
  }, [initialItems, query, category]);

  const showReset = Boolean(query || category);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white md:bg-white/10 p-6 shadow-sm md:backdrop-blur-lg">
      <div className="grid gap-4 border-b border-slate-200 pb-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-slate-700">
            Search dishes
          </label>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, category, or flavor"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Category
          </label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:outline-none"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
        <span>{filteredItems.length} results</span>
        {showReset && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("");
            }}
            className="text-primary"
          >
            Reset filters
          </button>
        )}
      </div>
      {filteredItems.length ? (
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-10 text-center text-sm text-slate-500">
          Nothing matches your filters yet.
        </div>
      )}
    </div>
  );
}
