import { Container } from "@/components/common/Container";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | Dish Delight",
};

export default function LoginPage() {
  return (
    <div className="py-10">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Sign in
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Return to your protected kitchen OS
          </h1>
          <p className="text-lg text-slate-600">
            Manage food items, launch seasonal menus, and preview cards with
            real data. Use Google or email credentials—both flow through
            NextAuth.
          </p>
        </div>
        <LoginForm />
      </Container>
    </div>
  );
}
