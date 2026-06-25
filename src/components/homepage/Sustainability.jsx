"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Card,
  Chip,
  Avatar,
  Button,
  ProgressBar,
  Label,
} from "@heroui/react";
import { Recycle } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import { Leaf } from "lucide-react";
import { ArrowRight } from "lucide-react";


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stats = [
  {
    id: 1,
    label: "Waste reduced",
    value: 78,
    suffix: "%",
    note: "Second-hand purchases keep usable items out of landfill.",
  },
  {
    id: 2,
    label: "Product lifespan extended",
    value: 64,
    suffix: "%",
    note: "One more owner means one more useful life.",
  },
  {
    id: 3,
    label: "New production avoided",
    value: 82,
    suffix: "%",
    note: "Buying used can reduce demand for new manufacturing.",
  },
];

const points = [
  {
    id: 1,
    icon: <Recycle className="text-lg text-[#0A7C6E]" />,
    title: "Reuse first",
    text: "Items stay in circulation longer instead of being discarded early.",
  },
  {
    id: 2,
    icon: <FiTrash2 className="text-lg text-[#0A7C6E]" />,
    title: "Less landfill waste",
    text: "Every resale helps reduce what ends up thrown away.",
  },
  {
    id: 3,
    icon: <Leaf className="text-lg text-[#0A7C6E]" />,
    title: "Lower impact shopping",
    text: "Choosing used items is a simple way to shop more responsibly.",
  },
];

export default function SustainabilityImpactSection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(10,124,110,0.16),transparent_45%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.22 }}
        className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-12"
      >
        {/* Left: image */}
        <motion.div variants={itemVariants} className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -left-4 -top-4 z-10 rounded-full border border-[#0A7C6E]/20 bg-[#0A7C6E]/10 px-4 py-2 text-sm font-medium text-[#0A7C6E] backdrop-blur">
              ♻️ 120K+ items reused
            </div>

            <Card className="overflow-hidden border border-white/10 bg-zinc-950/90 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
              <Card.Content className="relative aspect-4/5 w-full p-0">
                <Image
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
                  alt="People shopping second-hand items in a marketplace"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-12 ring-2 ring-[#0A7C6E]/30">
                        <Avatar.Image
                          src="https://i.pravatar.cc/150?img=32"
                          alt="Happy buyer"
                        />
                        <Avatar.Fallback>BK</Avatar.Fallback>
                      </Avatar>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          Sustainable buying, made easy
                        </p>
                        <p className="text-xs text-gray-400">
                          Save money while reducing waste.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </motion.div>

        {/* Right: content */}
        <motion.div variants={itemVariants} className="lg:col-span-6">
          <Card className="border border-white/10 bg-zinc-950/90 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur">
            <Card.Header className="flex flex-col gap-4 border-b border-white/5 p-6">
              <Chip
                variant="flat"
                className="border border-[#0A7C6E]/20 bg-[#0A7C6E]/10 text-[#0A7C6E]"
              >
                Sustainability Impact
              </Chip>

              <div>
                <Card.Title className="text-3xl font-bold tracking-tight leading-8 text-white md:text-4xl">
                  Every second-hand purchase helps{" "}
                  <span className="text-[#0A7C6E]">reduce waste</span>.
                </Card.Title>
                <Card.Description className="mt-3 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
                  Bkroy gives products a second life. Instead of throwing useful
                  items away, buyers and sellers keep them in circulation, cut
                  waste, and support a more circular economy.
                </Card.Description>
              </div>
            </Card.Header>

            <Card.Content className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    <ProgressBar value={item.value} className="gap-2">
                      <Label className="flex items-center justify-between text-sm text-gray-200">
                        <span>{item.label}</span>
                        <ProgressBar.Output />
                      </Label>

                      <ProgressBar.Track className="h-3 rounded-full bg-white/5">
                        <ProgressBar.Fill className="rounded-full bg-[#0A7C6E]" />
                      </ProgressBar.Track>
                    </ProgressBar>

                    <p className="mt-3 text-xs leading-5 text-gray-400">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {points.map((point) => (
                  <motion.div
                    key={point.id}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-4 rounded-2xl border border-white/5 bg-white/0.03 p-4"
                  >
                    <div className="mt-0.5 flex size-11 items-center justify-center rounded-xl bg-[#0A7C6E]/10">
                      {point.icon}
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-400">
                        {point.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-2xl border border-[#0A7C6E]/20 bg-[#0A7C6E]/10 p-4">
                <p className="text-sm leading-6 text-gray-200">
                  Buying used is one of the easiest ways to make a real impact:
                  less waste, fewer emissions from new production, and more
                  value from items already in the world.
                </p>
              </div>
            </Card.Content>

            <Card.Footer className="flex flex-col gap-3 border-t border-white/5 p-6 sm:flex-row">
              <Button
                className="w-full bg-[#0A7C6E] text-white hover:bg-[#08685d] sm:w-auto"
              >
                Shop sustainably
                <ArrowRight />
              </Button>

              <Button
                variant="bordered"
                className="w-full border-white/15 text-white sm:w-auto"
              >
                Learn more
              </Button>
            </Card.Footer>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}