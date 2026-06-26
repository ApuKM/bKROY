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
import Link from "next/link";
import { MdBorderColor } from "react-icons/md";
import { SiWish } from "react-icons/si";
import { BadgeCent } from "lucide-react";
import { getUserSession } from "@/lib/sessions/session";

export async function Sidebar() {
  const user = await getUserSession();

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
      href: "/dashboard/buyer/payments",
      label: "Payment History",
    },
    {
      icon: PersonPencil,
      href: "/dashboard/seeker/profile",
      label: "Profile Management",
    },
    {
      icon: CreditCard,
      href: "/dashboard/buyer/billing",
      label: "Billing",
    },
    {
      icon: Gear,
      href: "/dashboard/buyer/settings",
      label: "Settings",
    },
  ];

  const sellerNavItems = [
    { icon: Plus, href: "/dashboard/seller/add-product", label: "Add Product" },
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
    { icon: PersonPencil, href: "/dashboard/seller", label: "Profile" },
    { icon: Gear, href: "/dashboard/seller/settings", label: "Settings" },
  ];

  const navLinksMap = {
    buyer: buyerNavItems,
    seller: sellerNavItems,
  };

  const roleKey = user?.role === "seller" ? "seller" : "buyer";
  const navItems = navLinksMap[roleKey];

  const navContent = (
    <nav className="flex flex-col gap-1 ">
      {navItems.map((item) => (
        <Link href={item.href} key={item.label}>
          <button
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all w-full text-zinc-300 hover:bg-zinc-800 cursor-pointer"
            type="button"
          >
            {/* 3. The icon renders normally with the updated type */}
            <item.icon className="size-5 text-zinc-300" />
            {item.label}
          </button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <div className="hidden lg:border-r border-zinc-800 lg:block lg:h-full">
        {navContent}
      </div>
      <Drawer >
        <Button className={"lg:hidden bg-zinc-800 text-zinc-300"} variant="tertiary">
          <Bars />
        </Button>
        <Drawer.Backdrop variant="blur">
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-black/80">
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
