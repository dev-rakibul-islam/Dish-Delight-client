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

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const onSubmit = async (values) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      toast.error(result.error || "Unable to login");
      return;
    }

    toast.success("Welcome back! Redirecting...");
    router.push("/");
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
          Welcome back
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Access your curated workspace
        </h1>
        <p className="text-sm text-slate-500">
          Sign in with email or continue with Google to unlock protected dishes.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <FormGroup label="Email" error={errors.email?.message}>
          <TextField
            type="email"
            placeholder="chef@dishdelight.com"
            {...register("email", { required: "Email is required" })}
          />
        </FormGroup>
        <FormGroup label="Password" error={errors.password?.message}>
          <TextField
            type="password"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
          />
        </FormGroup>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
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
          New to Dish Delight?{" "}
          <Link href="/register" className="font-semibold text-primary">
            Create an account
          </Link>
        </p>
      </div>
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-slate-900">
              Continue with Google?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Dish Delight will open Google’s login dialog so you can
              authenticate. You will be redirected back to the dashboard after
              signing in.
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
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
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
