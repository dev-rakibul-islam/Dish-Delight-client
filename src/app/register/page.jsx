import { Container } from "@/components/common/Container";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register | Dish Delight",
};

export default function RegisterPage() {
  return (
    <div className="py-10">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <RegisterForm />
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Why join
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Craft dishes with clarity
          </h1>
          <p className="text-lg text-slate-600">
            Get instant access to add-product and manage-product dashboards,
            complete with inline validation, toast feedback, and consistent
            typography across viewports.
          </p>
        </div>
      </Container>
    </div>
  );
}
