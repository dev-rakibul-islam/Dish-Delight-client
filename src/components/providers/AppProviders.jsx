"use client";

import { Toaster } from "react-hot-toast";
import { AuthSessionProvider } from "./SessionProvider";

export function AppProviders({ children }) {
  return (
    <AuthSessionProvider>
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
    </AuthSessionProvider>
  );
}
