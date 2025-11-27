import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ManageProductsTable } from "@/components/products/ManageProductsTable";
import { authOptions } from "@/lib/authOptions";
import { API_BASE_URL } from "@/lib/config";

export const metadata = {
  title: "Manage Products | Dish Delight",
};

async function getManagedItems(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    console.warn("Unable to load managed items", error);
    return [];
  }
}

export default async function ManageProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?callbackUrl=/manage-products");
  }

  const token = session.accessToken;
  if (!token) {
    redirect("/login?callbackUrl=/manage-products");
  }

  const managedItems = await getManagedItems(token);

  return (
    <div className="py-10">
      <Container className="space-y-8">
        <SectionHeading
          align="left"
          eyebrow="Workspace"
          title="Manage your dishes"
          description="View, edit, and manage only your products. Other users cannot see or modify your items."
        />
        <ManageProductsTable
          initialItems={managedItems}
          token={token}
          userId={session.user.id}
        />
      </Container>
    </div>
  );
}
