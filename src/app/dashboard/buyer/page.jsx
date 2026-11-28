import React from "react";
import { Card, Button } from "@heroui/react";
import { ShoppingBag, Heart, Package } from "lucide-react";
import Link from "next/link";
import BuyerOrdersPage from "./my-orders/page";
import { Search } from "lucide-react";
import { BiMoney } from "react-icons/bi";
import { getUserSession } from "@/lib/core/session";
import { getBuyerStats } from "@/lib/api/orders";

export default async function BuyerDashboardOverview() {
  // 1. Fetch user and their stats securely on the server
  const user = await getUserSession();
  const dbStats = await getBuyerStats(user?.id);
  // console.log("dbstats", dbStats);

  const stats = [
    {
      id: 1,
      title: "Total Orders",
      value: dbStats.totalOrders,
      icon: ShoppingBag,
    },
    {
      id: 2,
      title: "Wishlist Items",
      value: dbStats.totalWishlist,
      icon: Heart,
    },
    {
      id: 3,
      title: "Recent Purchases (30d)",
      value: dbStats.recentPurchases,
      icon: Package,
    },
    {
      id: 4,
      title: "Total Money Spent",
      value: `৳ ${dbStats.totalSpent.toLocaleString()}`,
      icon: BiMoney,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border border-white/10 bg-zinc-950">
        <Card.Content className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white capitalize">
              Welcome Back, {user?.name || "Buyer"}
            </h1>
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

      {/* Stats - Updated to lg:grid-cols-4 so all 4 fit nicely */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.id} className="border border-white/10 bg-zinc-950">
              <Card.Content className="p-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0A7C6E]/10">
                    <Icon className="h-6 w-6 text-[#0A7C6E]" />
                  </div>
                  <p className="text-sm my-2 text-gray-400">{stat.title}</p>

                  <h2 className=" text-3xl font-bold text-white">
                    {stat.value}
                  </h2>
                </div>
              </Card.Content>
            </Card>
          );
        })}
      </div>

      {/* Recent Purchases (My Orders Page injected) */}
      <div className="space-y-6">
        <Card className="border border-white/10 bg-zinc-950">
          <Card.Header className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between border-b border-white/5">
            <div className="text-left">
              <h2 className="text-2xl font-semibold text-white">My Orders</h2>
              <p className="mt-1 text-sm text-gray-400">
                View, track, and manage all your recent purchases.
              </p>
            </div>

            {/* Simple search/filter UI */}
            <div className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 md:w-auto">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full"
              />
            </div>
          </Card.Header>

          {/* Injected Orders Page Component */}
          <div className="p-6">
            <BuyerOrdersPage />
          </div>
        </Card>
      </div>
    </div>
  );
}
