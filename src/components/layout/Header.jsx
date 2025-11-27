"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiLogOut,
  FiPlusCircle,
  FiPackage,
  FiShoppingCart,
} from "react-icons/fi";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/all-items", label: "All Services" },
  { href: "/contact", label: "Contact" },
];

const authLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

const protectedLinks = [
  {
    href: "/add-product",
    label: "Add Product",
    icon: <FiPlusCircle className="text-tertiary" aria-hidden />,
  },
  {
    href: "/manage-products",
    label: "Manage Products",
    icon: <FiPackage className="text-tertiary" aria-hidden />,
  },
];

const Logo = () => (
  <Link
    href="/"
    className="flex items-center gap-2 text-lg font-semibold tracking-tight text-gray-900"
  >
    <span className="rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white flex items-center justify-center">
      <FiShoppingCart size={16} />
    </span>
    <div className="flex flex-col leading-tight text-sm">
      <span className="text-gray-900">Dish Delight</span>
      <span className="text-gray-600 text-xs">Flavors, crafted with care</span>
    </div>
  </Link>
);

const NavLink = ({ href, label, isActive, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      "text-sm font-medium transition",
      isActive
        ? "text-gray-900 font-semibold"
        : "text-gray-600 hover:text-gray-900"
    )}
  >
    {label}
  </Link>
);

const MobilePanel = ({ isOpen, onClose, pathname, session }) => (
  <div
    className={cn(
      "pointer-events-none md:hidden",
      isOpen ? "pointer-events-auto opacity-100" : "opacity-0"
    )}
  >
    <div className="fixed inset-x-4 top-24 z-40 rounded-3xl border border-white/30 bg-white/10 p-5 shadow-lg backdrop-blur-xl transition-all duration-200">
      <div className="flex flex-col gap-4">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.href}
            {...link}
            isActive={pathname === link.href}
            onClick={onClose}
          />
        ))}
      </div>
      <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
        {session?.user ? (
          <>
            <p className="text-xs uppercase tracking-widest text-gray-600">
              Quick actions
            </p>
            {protectedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-900"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                onClose();
                signOut({ callbackUrl: "/" });
              }}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-900"
            >
              <FiLogOut className="inline" aria-hidden />
              <span className="ml-2">Sign Out</span>
            </button>
          </>
        ) : (
          authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block rounded-2xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-900"
            >
              {link.label}
            </Link>
          ))
        )}
      </div>
    </div>
  </div>
);

const UserDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md backdrop-blur-lg"
      >
        <span className="text-xs uppercase tracking-widest text-gray-600">
          Welcome
        </span>
        <span>{user?.name}</span>
        <FiChevronDown className="text-gray-600" aria-hidden />
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-60 rounded-3xl border border-white/30 bg-white/10 p-4 shadow-lg backdrop-blur-xl">
          <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-600">{user?.email}</p>
          <div className="mt-3 space-y-2 text-sm font-semibold text-gray-900">
            {protectedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-2xl px-3 py-2 text-gray-900 hover:bg-gray-100"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left text-red-600 hover:bg-red-50"
            >
              <FiLogOut />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full  bg-white/95 shadow-md backdrop-blur-3xl">
      <Container className="relative flex h-18 items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                isActive={pathname === link.href}
              />
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {session?.user ? (
            <>
              <UserDropdown user={session.user} />
            </>
          ) : (
            authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold tracking-wide text-gray-600 transition hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))
          )}
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-gray-900 shadow-md backdrop-blur-lg">
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </div>
        </button>
      </Container>
      <MobilePanel
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        session={session}
      />
    </header>
  );
}
