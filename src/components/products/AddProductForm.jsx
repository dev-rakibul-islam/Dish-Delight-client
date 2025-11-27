"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/common/Button";
import { FormGroup } from "@/components/forms/FormGroup";
import {
  TextAreaField,
  TextField,
  SelectField,
} from "@/components/forms/input";
import { clientCreateProduct } from "@/lib/api";

const priorities = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

export function AddProductForm({ token }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      priority: "medium",
      availableDate: new Date().toISOString().substring(0, 10),
    },
  });

  const onSubmit = async (values) => {
    try {
      // Use axios-based clientCreateItem with auto auth token
      await clientCreateProduct(values);

      toast.success("Dish added successfully! Redirecting...");

      // Reset form
      reset();

      // Navigate to manage-products after a short delay
      setTimeout(() => {
        router.push("/manage-products");
      }, 1000);
    } catch (error) {
      console.error("Add product error:", error);
      toast.error(error.message || "Failed to add dish");
    }
  };

  if (!token) {
    return (
      <p className="text-sm text-red-500">
        Missing session token. Please re-authenticate.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl border border-white/30 bg-white/10 p-8 shadow-sm backdrop-blur-lg"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <FormGroup label="Title" error={errors.name?.message}>
          <TextField
            placeholder="Truffle Pasta Ribbons"
            {...register("name", { required: "Title is required" })}
          />
        </FormGroup>
        <FormGroup label="Image URL" hint="Optional">
          <TextField placeholder="https://" {...register("image")} />
        </FormGroup>
      </div>
      <FormGroup label="Short description" error={errors.summary?.message}>
        <TextField
          placeholder="One-liner for cards"
          {...register("summary", {
            required: "Short description is required",
          })}
        />
      </FormGroup>
      <FormGroup label="Full description" error={errors.description?.message}>
        <TextAreaField
          rows={5}
          placeholder="Share cooking notes, plating guidance, or sourcing details."
          {...register("description", { required: "Description is required" })}
        />
      </FormGroup>
      <div className="grid gap-6 md:grid-cols-3">
        <FormGroup label="Price" error={errors.price?.message}>
          <TextField
            type="number"
            step="0.01"
            placeholder="24.00"
            {...register("price", { required: "Price is required" })}
          />
        </FormGroup>
        <FormGroup label="Priority">
          <SelectField {...register("priority")}>
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </SelectField>
        </FormGroup>
        <FormGroup label="Available date">
          <TextField type="date" {...register("availableDate")} />
        </FormGroup>
      </div>
      <FormGroup label="Category" error={errors.category?.message}>
        <TextField
          placeholder="salad, entree, dessert..."
          {...register("category", { required: "Category is required" })}
        />
      </FormGroup>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add dish"}
      </Button>
    </form>
  );
}
