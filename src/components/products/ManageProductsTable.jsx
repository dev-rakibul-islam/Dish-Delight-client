"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  FiTrash2,
  FiExternalLink,
  FiEdit2,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { Button } from "@/components/common/Button";
import { formatDate, priceFormatter } from "@/utils/validators";
import {
  clientDeleteProduct,
  clientGetMyProducts,
  clientUpdateProduct,
} from "@/lib/api";

export function ManageProductsTable({ initialItems, token, userId }) {
  const [items, setItems] = useState(initialItems);
  const [loadingId, setLoadingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-refetch when page is focused/revisited
  useEffect(() => {
    const handleFocus = async () => {
      setIsRefreshing(true);
      try {
        const freshItems = await clientGetMyProducts();
        setItems(freshItems);
      } catch (error) {
        console.warn("Failed to refresh items:", error);
      } finally {
        setIsRefreshing(false);
      }
    };

    // Refetch on window focus
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [token]);

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this dish? This action cannot be undone."
      )
    )
      return;
    setLoadingId(id);
    try {
      await clientDeleteProduct(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setExpandedId(null);
      toast.success("Dish deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete");
    } finally {
      setLoadingId(null);
    }
  };

  const handleSave = async () => {
    if (!editingId) return;

    setIsSaving(true);
    try {
      await clientUpdateProduct(editingId, editForm);

      // Update local state
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...editForm } : item
        )
      );

      setEditingId(null);
      setEditForm({});
      toast.success("Dish updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update dish");
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      summary: item.summary,
      category: item.category,
      price: item.price,
      priority: item.priority,
      availableDate:
        item.availableDate?.substring(0, 10) ||
        new Date().toISOString().substring(0, 10),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  if (!token) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
        <p className="text-sm font-semibold text-red-600">
          ⚠️ Missing session token. Please sign in again.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/30 bg-white/10 p-6 shadow-sm backdrop-blur-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Your dishes</h2>
          <p className="text-sm text-slate-500">
            {items.length} {items.length === 1 ? "dish" : "dishes"} • Only you
            can view, edit, and delete your products
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={async () => {
              setIsRefreshing(true);
              try {
                const freshItems = await clientGetMyProducts();
                setItems(freshItems);
                toast.success("Items refreshed");
              } catch (error) {
                toast.error("Failed to refresh");
              } finally {
                setIsRefreshing(false);
              }
            }}
            disabled={isRefreshing}
            className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
          <Button as="link" href="/add-product">
            + Add dish
          </Button>
        </div>
      </div>
      {items.length ? (
        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-100 overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-1">
                    {item.summary}
                  </p>
                </div>
                <div className="flex items-center gap-6 mr-4">
                  <span className="text-sm font-medium text-slate-700">
                    {priceFormatter.format(item.price)}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 px-2 py-1 bg-slate-100 rounded">
                    {item.category}
                  </span>
                </div>
                <FiChevronDown
                  className={`transition-transform ${
                    expandedId === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === item.id && (
                <div className="border-t border-slate-100 px-4 py-4 bg-slate-50 space-y-4">
                  {editingId === item.id ? (
                    // Edit Form
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">
                          Dish Name
                        </label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">
                          Summary
                        </label>
                        <input
                          type="text"
                          value={editForm.summary}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              summary: e.target.value,
                            })
                          }
                          className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700">
                            Category
                          </label>
                          <input
                            type="text"
                            value={editForm.category}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                category: e.target.value,
                              })
                            }
                            className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700">
                            Price
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.price}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                price: parseFloat(e.target.value),
                              })
                            }
                            className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={cancelEdit}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="flex-1 px-3 py-2 bg-primary text-black border rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSaving ? "Saving..." : "Save changes"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Details
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Full Description
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          {item.description || "No description provided"}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase">
                            Priority
                          </p>
                          <p className="mt-1 font-medium capitalize text-slate-900">
                            {item.priority}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase">
                            Available
                          </p>
                          <p className="mt-1 font-medium text-slate-900">
                            {formatDate(item.availableDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase">
                            Created
                          </p>
                          <p className="mt-1 font-medium text-slate-900">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Link
                          href={`/item/${item.id}`}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-2"
                        >
                          <FiExternalLink size={16} />
                          View Public
                        </Link>
                        <button
                          onClick={() => startEdit(item)}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-2"
                        >
                          <FiEdit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={loadingId === item.id}
                          className="flex-1 px-3 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <FiTrash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-10 text-center">
          <p className="text-sm font-semibold text-slate-600">No dishes yet</p>
          <p className="text-sm text-slate-500 mt-1">
            Start creating by adding your first hero dish
          </p>
          <Button as="link" href="/add-product" className="mt-4">
            Add your first dish
          </Button>
        </div>
      )}
    </div>
  );
}
