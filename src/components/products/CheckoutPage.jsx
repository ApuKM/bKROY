"use client";

import { Avatar } from "@heroui/react";
import { toast } from "@heroui/react";
import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShoppingBag,
  FiShield,
  FiCreditCard,
} from "react-icons/fi";

export default function CheckoutPageClient({ buyer, product }) {
  // Initializing state with your provided data structure
  const [formData, setFormData] = useState({
    name: buyer.name,
    email: buyer?.email,
    location: buyer?.location || "",
    phone: buyer?.phone || null,
    paymentMethod: "bkash", // Default standard payment option
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This is where your buyer's userId is passed alongside the order payload
    const orderPayload = {
      buyerInfo: {
        userId: buyer?.id,
        name: formData.name,
        email: formData.email,
        location: formData.location,
        phone: formData.phone,
      },
      sellerInfo: {
        userId: product?.sellerInfo?.userId,
        name: product?.sellerInfo?.name,
        email: product?.sellerInfo?.email,
      },
      productId: product?._id,
      paymentStatus: "paid",
      orderStatus: "processing",
    };

    try {
      // Replace this log with your actual API route call (e.g., axios.post('/api/orders', orderPayload))
      console.log("Order Processed Successfully for User ID:", orderPayload);
      toast.success(`Order placed successfully for : ${product?.name}!`);
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] py-12 px-4 font-sans text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Checkout</h1>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {/* --- Left Column: Buyer & Shipping Info Form --- */}
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-2xl border border-zinc-800 bg-[#18181b] p-6 shadow-xl">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold border-b border-zinc-800 pb-3">
                <FiUser className="text-[#0A7C6E]" /> Delivery Information
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-400">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3.5 text-zinc-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none transition-all focus:border-[#0A7C6E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-400">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3.5 text-zinc-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none transition-all focus:border-[#0A7C6E]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-zinc-400">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3.5 text-zinc-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none transition-all focus:border-[#0A7C6E]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-zinc-400">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3.5 text-zinc-500" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none transition-all focus:border-[#0A7C6E]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Selection Box */}
            <div className="rounded-2xl border border-zinc-800 bg-[#18181b] p-6 shadow-xl">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold border-b border-zinc-800 pb-3">
                <FiCreditCard className="text-[#0A7C6E]" /> Payment Method
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${formData.paymentMethod === "bkash" ? "border-[#0A7C6E] bg-[#0A7C6E]/5" : "border-zinc-800 bg-zinc-900/30"}`}
                >
                  <span className="font-medium text-sm">
                    Digital (bKash/Nagad)
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={formData.paymentMethod === "bkash"}
                    onChange={handleInputChange}
                    className="accent-[#0A7C6E]"
                  />
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${formData.paymentMethod === "cod" ? "border-[#0A7C6E] bg-[#0A7C6E]/5" : "border-zinc-800 bg-zinc-900/30"}`}
                >
                  <span className="font-medium text-sm">Cash on Delivery</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="accent-[#0A7C6E]"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* --- Right Column: Order Summary (Sticky Sidebar) --- */}
          <div className="space-y-6">
            <div className="sticky top-6 rounded-2xl border border-zinc-800 bg-[#18181b] p-6 shadow-xl">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold border-b border-zinc-800/60 pb-3">
                <FiShoppingBag className="text-[#0A7C6E]" /> Order Summary
              </h2>

              {/* Product Representation Details */}
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-zinc-900/40 p-3 border border-zinc-800/50">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-[#0A7C6E]/10 flex items-center justify-center text-xs text-[#0A7C6E] font-bold">
                  <Avatar>
                    <Avatar.Image
                      alt="John Doe"
                      src={product?.Image?.[0]}
                    />
                    <Avatar.Fallback>PI</Avatar.Fallback>
                  </Avatar>
                </div>
                <div className="overflow-hidden">
                  <h4 className="truncate text-sm font-medium text-white">
                    {product?.title}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Seller: {product?.sellerInfo?.name}
                  </p>
                </div>
                <div className="ml-auto text-sm font-semibold text-zinc-300">
                  ৳ {product?.price}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-3 border-b border-zinc-800 pb-4 text-sm text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">৳ {product?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-white">৳ 120</span>
                </div>
              </div>

              <div className="my-4 flex justify-between text-base font-bold text-white">
                <span>Grand Total</span>
                <span className="text-[#0A7C6E]">৳ {product?.price + 120}</span>
              </div>

              {/* Submit Button passing user details inside handler */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-xl bg-[#0A7C6E] py-4 font-bold text-white transition-all hover:bg-[#08685d] disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_0_15px_rgba(10,124,110,0.2)]"
              >
                {isSubmitting ? "Processing Order..." : "Confirm & Place Order"}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-zinc-500">
                <FiShield className="text-green-500" /> Buyer protection plan
                active.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
