// app/orders/OrderListClient.tsx
"use client";

import React, { useState } from "react";
import { Card, Avatar, Button } from "@heroui/react";
import { Search, MapPin, FileText, XCircle } from "lucide-react";
import Link from "next/link";
import { AlertDialog } from "@heroui/react";
import { deleteAnOrder } from "@/lib/actions/orders";

export default function OrderListClient({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  console.log(orders);
  // Helper function to style status badges dynamically based on your new DB statuses
  const getStatusStyles = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "processing":
      case "pending":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "paid":
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  // Optimistic UI update for cancellation
  const handleCancelOrder = async (orderId) => {
    console.log("Deleting order:", orderId);
    const res = await deleteAnOrder(orderId);
    console.log("res from delete", res)
    if (res.deletedCount > 0) {
      toast.success("Order deleted succesfully");
    }
  };

  return (
    <Card.Content className="p-6 pt-0">
      <div className="space-y-4">
        {orders.map((item) => {
          // Fallbacks for missing product data in the current schema
          // (Ideally, populate these fields from the database)
          const productName =
            item.product?.name || `Product ID: ${item.productId}`;
          const productPrice = item.product?.price || "N/A";
          const productImage = item.product?.images?.[0];
          const orderDate = item.createdAt
            ? new Date(item.createdAt).toLocaleDateString()
            : "Unknown Date";

          return (
            <div
              key={item._id}
              className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-5 lg:flex-row lg:items-center lg:justify-between"
            >
              {/* Product Info Left Side */}
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 shrink-0 rounded-xl">
                  <Avatar.Image src={productImage} alt={productName} />
                  <Avatar.Fallback>{productName.charAt(0)}</Avatar.Fallback>
                </Avatar>

                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-white">
                      {productName}
                    </h3>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusStyles(
                        item.orderStatus,
                      )}`}
                    >
                      {item.orderStatus}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400">
                    Seller:{" "}
                    <span className="text-gray-300">
                      {item.sellerInfo.name}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Order #{item._id.slice(-6).toUpperCase()} • Placed on{" "}
                    {orderDate}
                  </p>
                </div>
              </div>

              {/* Pricing & Actions Right Side */}
              <div className="flex flex-col items-start gap-4 lg:items-end">
                <p className="text-xl font-semibold text-[#0A7C6E]">
                  {productPrice !== "N/A" ? `৳${productPrice}` : "Price N/A"}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {/* View Details Button */}
                  <Link href={`/products/${item.productId}`}>
                    <Button
                      variant="bordered"
                      className="border-white/10 text-white hover:bg-white/5"
                      size="sm"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                  </Link>

                  {/* Track Order Button */}
                  <Button
                    className={`${
                      item.orderStatus === "cancelled"
                        ? "bg-gray-800 text-gray-500 opacity-50"
                        : "bg-[#0A7C6E] text-white hover:bg-[#08685d]"
                    }`}
                    size="sm"
                    disabled={item.orderStatus === "cancelled"}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Track Status
                  </Button>

                  {/* Cancel Order Button */}
                  {(item.orderStatus === "processing" ||
                    item.orderStatus === "pending") && (
                    <AlertDialog>
                      <Button variant="danger-soft" size="sm">
                        Cancel
                      </Button>

                      <AlertDialog.Backdrop className="bg-black/70 backdrop-blur-sm">
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827] text-white shadow-2xl">
                            <AlertDialog.CloseTrigger className="text-zinc-400 hover:text-white" />

                            <AlertDialog.Header className="items-center text-center">
                              <AlertDialog.Icon
                                status="danger"
                                className="bg-red-500/15 text-red-400"
                              />

                              <AlertDialog.Heading className="mt-4 text-xl font-semibold text-white">
                                Cancel Order?
                              </AlertDialog.Heading>

                              <p className="mt-2 text-sm leading-6 text-zinc-400">
                                This action cannot be undone. The order will be
                                permanently removed from your marketplace.
                              </p>
                            </AlertDialog.Header>

                            <AlertDialog.Footer className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-5">
                              <Button
                                slot="close"
                                variant="danger"
                                size="sm"
                                onClick={() => handleCancelOrder(item._id)}
                                className="border-white/10 text-zinc-300 hover:bg-white/5"
                              >
                                Delete
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card.Content>
  );
}
