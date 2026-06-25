"use client";

import React from "react";
import { Card } from "@heroui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const monthlySalesData = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1800 },
  { month: "Mar", sales: 2400 },
  { month: "Apr", sales: 2100 },
  { month: "May", sales: 3200 },
  { month: "Jun", sales: 4100 },
];

const topProductsData = [
  { product: "iPhone 13 Pro", sales: 42 },
  { product: "Gaming Monitor", sales: 28 },
  { product: "MacBook Air", sales: 22 },
  { product: "Canon DSLR", sales: 18 },
  { product: "Office Chair", sales: 15 },
];

export default function SalesAnalytics() {
  return (
    <section className="space-y-8 pt-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Sales Analytics</h1>
        <p className="mt-2 text-gray-400">
          Track your revenue, sales trends, and top-performing products.
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 ">
        {/* Monthly Sales Trend */}
        <Card className="xl:col-span-2 border border-white/10 bg-zinc-950">
          <Card.Header className="px-6 pt-6">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Monthly Sales Trend
              </h2>
              <p className="text-sm text-gray-400">
                Revenue generated over the last 6 months.
              </p>
            </div>
          </Card.Header>

          <Card.Content className="p-6">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

                  <XAxis dataKey="month" stroke="#a1a1aa" />

                  <YAxis stroke="#a1a1aa" />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #27272a",
                      borderRadius: "12px",
                    }}
                    labelStyle={{
                      color: "#fff",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#0A7C6E"
                    strokeWidth={3}
                    dot={{
                      fill: "#0A7C6E",
                      r: 5,
                    }}
                    activeDot={{
                      r: 7,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card.Content>
        </Card>

        {/* Top Products */}
        <Card className="border border-white/10 bg-zinc-950">
          <Card.Header className="px-6 pt-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Top Products</h2>

              <p className="text-sm text-gray-400">Best-selling products.</p>
            </div>
          </Card.Header>

          <Card.Content className="p-6">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProductsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

                  <XAxis type="number" stroke=" #3f3f46" />

                  <YAxis
                    dataKey="product"
                    type="category"
                    width={100}
                    stroke="#a1a1aa"
                  />

                  <Tooltip
                    cursor={{
                      fill: "rgba(10, 124, 110, 0.12)",
                    }}
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #27272a",
                      borderRadius: "12px",
                    }}
                  />

                  <Bar dataKey="sales" fill="#0A7C6E" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Content>
        </Card>
      </div>
    </section>
  );
}
