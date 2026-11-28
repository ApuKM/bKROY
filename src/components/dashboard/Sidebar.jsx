"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  PersonPencil,
  CreditCard,
  Gear,
  Bars,
  Plus,
  Briefcase,
  PencilToLine,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";
import { MdBorderColor } from "react-icons/md";
import { SiWish } from "react-icons/si";
import { BadgeCent } from "lucide-react";

// Navigation configuration
function getNavItems(role, userId) {
  const buyerNavItems = [
    {
      icon: MdBorderColor,
      href: "/dashboard/buyer/my-orders",
      label: "My Orders",
    },
    {
      icon: SiWish,
      href: "/dashboard/buyer/wish-list",
      label: "Wishlist",
    },
    {
      icon: BadgeCent,
      href: `/dashboard/buyer/payment-history`,
      label: "Payment History",
    },
    {
      icon: PersonPencil,
      href: "/dashboard/seeker/profile",
      label: "Profile Management",
    },
    {
      icon: Gear,
      href: "/dashboard/buyer/settings",
      label: "Settings",
    },
  ];

  const sellerNavItems = [
    {
      icon: Plus,
      href: "/dashboard/seller/add-product",
      label: "Add Product",
    },
    {
      icon: Briefcase,
      href: "/dashboard/seller/my-products",
      label: "My Products",
    },
    {
      icon: PencilToLine,
      href: "/dashboard/seller/manage-orders",
      label: "Manage Orders",
    },
    {
      icon: PersonPencil,
      href: "/dashboard/seller",
      label: "Profile",
      exact: true,
    },
    {
      icon: CreditCard,
      href: "/dashboard/buyer/billing",
      label: "Billing",
    },
    {
      icon: Gear,
      href: "/dashboard/seller/settings",
      label: "Settings",
    },
  ];

  return role === "seller"
    ? sellerNavItems
    : buyerNavItems;
}

export function Sidebar({ role, userId }) {
  const pathname = usePathname();

  const navItems = getNavItems(role, userId);

  // Check active route
  const isActive = (item) => {
    if (item.exact) {
      return pathname === item.href;
    }

    return (
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
    );
  };

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`
              flex items-center gap-3 rounded-xl
              px-3 py-2.5 text-sm transition-all
              w-full
              ${
                active
                  ? "text-[#0A7C6E] font-semibold"
                  : "text-zinc-300 hover:bg-zinc-800"
              }
            `}
          >
            <Icon className="size-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:h-full lg:border-r border-zinc-800">
        {navContent}
      </div>

      {/* Mobile Sidebar */}
      <Drawer>
        <Button
          className="lg:hidden bg-zinc-800 text-zinc-300"
          variant="tertiary"
        >
          <Bars />
        </Button>

        <Drawer.Backdrop variant="blur">
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-black/80">
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading>
                  Navigation
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}