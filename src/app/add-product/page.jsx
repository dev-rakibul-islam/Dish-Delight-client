import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AddProductForm } from "@/components/products/AddProductForm";
import { authOptions } from "@/lib/authOptions";

export const metadata = {
  title: "Add Product | Dish Delight",
};

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?callbackUrl=/add-product");
  }

  // Get fresh token from session
  const token = session.accessToken;
  if (!token) {
    redirect("/login?callbackUrl=/add-product");
  }

  return (
    <div className="py-10">
      <Container className="space-y-8">
        <SectionHeading
          align="left"
          eyebrow="Add product"
          title="Publish a new hero dish"
          description="Fill in the details below. We will validate inputs, display toasts, and sync with the Express API protected routes."
        />
        <AddProductForm token={token} />
      </Container>
    </div>
  );
}
