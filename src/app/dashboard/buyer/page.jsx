import React from "react";
import { Card, Avatar, Button } from "@heroui/react";
import { ShoppingBag, Heart, Package, ArrowRight } from "lucide-react";

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

const recentPurchases = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    price: "$650",
    image:
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1200&auto=format&fit=crop",
    seller: "Ayesha Rahman",
  },
  {
    id: 2,
    name: "Gaming Monitor",
    price: "$210",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop",
    seller: "Tanvir Ahmed",
  },
  {
    id: 3,
    name: "Canon DSLR Camera",
    price: "$450",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    seller: "Kamrul Islam",
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
          <Button className="bg-[#0A7C6E] text-white hover:bg-[#08685d]">
            Browse Marketplace
          </Button>
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
      <Card className="border border-white/10 bg-zinc-950">
        <Card.Header className="flex items-center justify-between p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">
              Recent Purchases
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Products you purchased recently.
            </p>
          </div>

          <Button className="bg-transparent text-[#0A7C6E]">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card.Header>

        <Card.Content className="p-6 pt-0">
          <div className="space-y-4">
            {recentPurchases.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 rounded-xl">
                    <Avatar.Image src={item.image} alt={item.name} />
                    <Avatar.Fallback>{item.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>

                  <div>
                    <h3 className="font-medium text-white">{item.name}</h3>

                    <p className="text-sm text-gray-400">
                      Seller: {item.seller}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <p className="font-semibold text-[#0A7C6E]">{item.price}</p>

                  <Button className="bg-[#0A7C6E] text-white hover:bg-[#08685d]">
                    View Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
