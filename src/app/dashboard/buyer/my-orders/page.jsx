"use client";

import React, { useState } from "react";
import { Card, Avatar, Button } from "@heroui/react";
import { Search, MapPin, FileText, XCircle } from "lucide-react";

// Mock data reflecting the different order statuses
const initialOrders = [
  {
    id: 1,
    orderNumber: "ORD-938271",
    name: "iPhone 13 Pro",
    price: "$650",
    image:
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1200&auto=format&fit=crop",
    seller: "Ayesha Rahman",
    date: "Oct 24, 2023",
    status: "Accepted", // Can be cancelled
  },
  {
    id: 2,
    orderNumber: "ORD-938272",
    name: "Gaming Monitor",
    price: "$210",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop",
    seller: "Tanvir Ahmed",
    date: "Oct 28, 2023",
    status: "Pending", // Can be cancelled
  },
  {
    id: 3,
    orderNumber: "ORD-938273",
    name: "Canon DSLR Camera",
    price: "$450",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    seller: "Kamrul Islam",
    date: "Oct 20, 2023",
    status: "Cancelled", // Cannot be cancelled
  },
];

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);

  // Helper function to style status badges dynamically
  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Accepted":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  // Mock cancel handler
  const handleCancelOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order,
      ),
    );
  };

  return (
    <Card.Content className="p-6 pt-0">
      <div className="space-y-4">
        {orders.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-5 lg:flex-row lg:items-center lg:justify-between"
          >
            {/* Product Info Left Side */}
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 shrink-0 rounded-xl">
                <Avatar.Image src={item.image} alt={item.name} />
                <Avatar.Fallback>{item.name.charAt(0)}</Avatar.Fallback>
              </Avatar>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-medium text-white">
                    {item.name}
                  </h3>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-sm text-gray-400">
                  Seller: <span className="text-gray-300">{item.seller}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Order #{item.orderNumber} • Placed on {item.date}
                </p>
              </div>
            </div>

            {/* Pricing & Actions Right Side */}
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <p className="text-xl font-semibold text-[#0A7C6E]">
                ৳{item.price}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {/* View Details Button (Always Visible) */}
                <Button
                  variant="bordered"
                  className="border-white/10 text-white hover:bg-white/5"
                  size="sm"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Details
                </Button>

                {/* Track Order Button (Disabled if Cancelled) */}
                <Button
                  className={`${
                    item.status === "Cancelled"
                      ? "bg-gray-800 text-gray-500 opacity-50"
                      : "bg-[#0A7C6E] text-white hover:bg-[#08685d]"
                  }`}
                  size="sm"
                  disabled={item.status === "Cancelled"}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Track Status
                </Button>

                {/* Cancel Order Button (Conditional: Only show if Pending or Accepted) */}
                {(item.status === "Pending" || item.status === "Accepted") && (
                  <Button
                    variant="light"
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    size="sm"
                    onClick={() => handleCancelOrder(item.id)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination/Load More Footer for Dedicated Page */}
      <div className="mt-8 flex justify-center">
        <Button
          variant="bordered"
          className="border-white/10 text-gray-300 hover:bg-white/5"
        >
          Load More Orders
        </Button>
      </div>
    </Card.Content>
  );
}
