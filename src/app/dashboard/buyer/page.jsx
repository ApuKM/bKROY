import React from "react";
import { Card, Avatar, Button } from "@heroui/react";
import { ShoppingBag, Heart, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import BuyerOrdersPage from "./my-orders/page";
import { Search } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Total Orders",
    value: 24,
    icon: ShoppingBag,
  },
  {
    id: 2,
    title: "Wishlist Items",
    value: 17,
    icon: Heart,
  },
  {
    id: 3,
    title: "Recent Purchases",
    value: 8,
    icon: Package,
  },
];

export default function BuyerDashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}{" "}
      <Card className="border border-white/10 bg-zinc-950">
        <Card.Content className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          {" "}
          <div>
            {" "}
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="mt-2 text-gray-400">
              Track your orders, wishlist items, and recent purchases.
            </p>
          </div>
          <Link href={"/products"}>
            <Button className="bg-[#0A7C6E] text-white hover:bg-[#08685d]">
              Browse Marketplace
            </Button>
          </Link>
        </Card.Content>
      </Card>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.id} className="border border-white/10 bg-zinc-950">
              <Card.Content className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.title}</p>

                    <h2 className="mt-2 text-4xl font-bold text-white">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A7C6E]/10">
                    <Icon className="h-7 w-7 text-[#0A7C6E]" />
                  </div>
                </div>
              </Card.Content>
            </Card>
          );
        })}
      </div>
      {/* Recent Purchases */}
      <div className="space-y-6">
        <Card className="border border-white/10 bg-zinc-950">
          <Card.Header className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="text-left">
              <h2 className="text-2xl font-semibold text-white">My Orders</h2>
              <p className="mt-1 text-sm text-gray-400">
                View, track, and manage all your recent purchases.
              </p>
            </div>

            {/* Optional: Add a simple search/filter UI for the dedicated page */}
            <div className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 md:w-auto">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </Card.Header>
          <BuyerOrdersPage />
        </Card>
      </div>
    </div>
  );
}
