import Link from "next/link";
import { Container } from "@/components/common/Container";

const footerLinks = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "All Services", href: "/all-items" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Add Product", href: "/add-product" },
      { label: "Manage Products", href: "/manage-products" },
      { label: "Login", href: "/login" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/40 bg-slate-950 text-white">
      <Container className="flex flex-col gap-8 py-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm space-y-4">
          <p className="text-2xl font-semibold">Dish Delight</p>
          <p className="text-sm text-slate-300">
            Elevated food management crafted with balanced typography, soft
            gradients, and frictionless UX.
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Dish Delight. All rights reserved.
          </p>
        </div>
        <div className="grid flex-1 gap-8 sm:grid-cols-2">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                {section.title}
              </p>
              <ul className="space-y-2 text-sm text-slate-200">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Connect
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
