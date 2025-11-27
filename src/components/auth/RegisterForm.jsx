"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/common/Button";
import { FormGroup } from "@/components/forms/FormGroup";
import { TextField } from "@/components/forms/input";
import { API_BASE_URL } from "@/lib/config";

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        const errorText = errorPayload.message || "Unable to register";
        setError("root", { message: errorText });
        toast.error("Registration failed");
        return;
      }

      toast.success("Account created! Signing you in...");
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (loginResult?.error) {
        toast.error(
          "Account created, but sign in failed. Please login manually."
        );
        router.push("/login");
        return;
      }

      router.push("/");
    } catch (error) {
      toast.error("Unexpected error");
    }
  };

  const handleGoogle = () => setShowGoogleModal(true);

  const confirmGoogle = () => {
    setShowGoogleModal(false);
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="rounded-3xl border border-white/30 bg-white/10 p-8 shadow-lg backdrop-blur-xl shadow-slate-900/5">
      <div className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Create account
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Join the Dish Delight studio
        </h1>
        <p className="text-sm text-slate-500">
          Collaborate on curated dishes with protected dashboards and polished
          UI.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <FormGroup label="Full name" error={errors.name?.message}>
          <TextField
            placeholder="Maya Greene"
            {...register("name", { required: "Name is required" })}
          />
        </FormGroup>
        <FormGroup label="Email" error={errors.email?.message}>
          <TextField
            type="email"
            placeholder="maya@atelier.studio"
            {...register("email", { required: "Email is required" })}
          />
        </FormGroup>
        <FormGroup label="Password" error={errors.password?.message}>
          <TextField
            type="password"
            placeholder="Create a strong password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
          />
        </FormGroup>
        {errors.root && (
          <p className="text-sm font-semibold text-red-500">
            {errors.root.message}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <div className="mt-6 space-y-4">
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-primary/40"
        >
          Continue with Google
        </button>
        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Sign in
          </Link>
        </p>
      </div>
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-slate-900">
              Continue with Google?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              We will open Google’s authentication dialog so you can sign in and
              return to the studio. Use the same Google account for future
              access.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmGoogle}
                className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
