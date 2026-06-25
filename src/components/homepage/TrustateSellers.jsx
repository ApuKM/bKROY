"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, Avatar, Button, Chip } from "@heroui/react";
import { Star, BadgeCheck, ArrowRight, Package } from "lucide-react";

const TOP_SELLERS = [
  {
    id: 1,
    name: "Ayesha Rahman",
    username: "@ayesha_r",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 4.9,
    reviews: 142,
    isVerified: true,
    memberSince: "2022",
    topCategories: ["Smartphones", "Laptops"],
    itemsSold: 89,
  },
  {
    id: 2,
    name: "Kamrul Islam",
    username: "@kamrul_tech",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 4.8,
    reviews: 98,
    isVerified: true,
    memberSince: "2023",
    topCategories: ["Cameras", "Accessories"],
    itemsSold: 54,
  },
  {
    id: 3,
    name: "Nadia Sultana",
    username: "@nadia_vintage",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 5.0,
    reviews: 215,
    isVerified: true,
    memberSince: "2021",
    topCategories: ["Furniture", "Books"],
    itemsSold: 320,
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    username: "@tanvir_deals",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    rating: 4.7,
    reviews: 67,
    isVerified: true,
    memberSince: "2023",
    topCategories: ["Gaming", "Monitors"],
    itemsSold: 41,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function TrustedSellers() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 bg-black text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center max-w-3xl mx-auto"
      >
        {" "}
        <div className="max-w-3xl mx-auto text-center">
          {" "}
          <div className="mb-4 inline-flex items-center rounded-full border border-[#0A7C6E]/20 bg-[#0A7C6E]/10 px-4 py-1.5 text-sm font-medium text-[#0A7C6E]">
            Trusted Sellers{" "}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white md:text-5xl">
            Meet Our Top-Rated Sellers
          </h2>
          <p className="mt-4 text-gray-400">
            Shop with confidence on bKROY. Discover highly-rated community
            members with proven track records of selling quality second-hand
            products.
          </p>
        </div>
        <Button className="bg-transparent text-[#0A7C6E] hover:bg-[#0A7C6E]/10">
          <span>View All Sellers</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>

      {/* Sellers Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        {TOP_SELLERS.map((seller) => (
          <motion.div
            key={seller.id}
            variants={cardVariants}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="h-full"
          >
            <Card className="h-full border border-white/10 bg-zinc-950 transition-all duration-300 hover:border-[#0A7C6E]/40 hover:shadow-[0_0_30px_rgba(10,124,110,0.15)]">
              {/* Header */}
              <Card.Header className="flex items-start justify-between p-5">
                <div className="relative">
                  <Avatar className="size-16 ring-2 ring-[#0A7C6E]/30">
                    <Avatar.Image src={seller.avatar} alt={seller.name} />
                    <Avatar.Fallback>{seller.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>

                  {seller.isVerified && (
                    <div className="absolute -bottom-1 -right-1 rounded-full bg-black p-1">
                      <motion.div
                        animate={{
                          scale: [1, 1.08, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <BadgeCheck
                          className="size-5 text-[#0A7C6E]"
                          fill="currentColor"
                        />
                      </motion.div>
                    </div>
                  )}
                </div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Chip size="sm" className="bg-[#0A7C6E]/10 text-[#0A7C6E]">
                    <div className="flex items-center gap-1">
                      <Star className="size-3 fill-current" />
                      <span>
                        {seller.rating} ({seller.reviews})
                      </span>
                    </div>
                  </Chip>
                </motion.div>
              </Card.Header>

              {/* Content */}
              <Card.Content className="flex flex-1 flex-col px-5 pb-5">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {seller.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {seller.username} • Since {seller.memberSince}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
                  <Package className="size-4" />
                  <span>
                    <strong className="text-white">{seller.itemsSold}</strong>{" "}
                    items sold
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {seller.topCategories.map((category) => (
                    <Chip
                      key={category}
                      size="sm"
                      className="border border-white/10 bg-white/5 text-gray-300"
                    >
                      {category}
                    </Chip>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <Button className="w-full bg-[#0A7C6E] text-white hover:bg-[#08685d]">
                    View Profile
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
