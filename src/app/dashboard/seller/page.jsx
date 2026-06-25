import React from "react";
import { Card } from "@heroui/react";
import { ShoppingBag, Clock, Package, BadgeCent } from "lucide-react";
import SalesAnalytics from "@/components/dashboard/SalesAnalytics";
import { Button } from "@heroui/react";

const stats = [
  {
    id: 1,
    title: "Total Products",
    value: 48,
    icon: Package,
  },
  {
    id: 2,
    title: "Total Sales",
    value: 326,
    icon: ShoppingBag,
  },
  {
    id: 3,
    title: "Total Revenue",
    value: "$12,540",
    icon: BadgeCent,
  },
  {
    id: 4,
    title: "Pending Orders",
    value: 14,
    icon: Clock,
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
              Manage your Products, Orders & Sales
            </p>
          </div>
          <Button className="bg-[#0A7C6E] text-white hover:bg-[#08685d]">
            Browse Marketplace
          </Button>
        </Card.Content>
      </Card>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.id} className="border border-white/10 bg-zinc-950">
              <Card.Content className="p-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A7C6E]/10">
                    <Icon className="h-7 w-7 text-[#0A7C6E]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">{stat.title}</p>

                    <h2 className="mt-2 text-4xl font-bold text-white">
                      {stat.value}
                    </h2>
                  </div>
                </div>
              </Card.Content>
            </Card>
          );
        })}
      </div>
      {/* Charts */}
      <SalesAnalytics />
    </div>
  );
}
