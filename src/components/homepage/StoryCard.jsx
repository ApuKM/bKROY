"use client";

import React from "react";
import { motion } from "motion/react";
import { Avatar, Chip, Card } from "@heroui/react";
import { FiStar } from "react-icons/fi";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25, // one card after another
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const StoryCard = ({ stories }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {stories.map((story) => (
        <motion.div
          key={story.id}
          variants={cardVariants}
          whileHover={{
            y: -8,
          }}
          className="h-full"
        >
          <Card className="h-full bg-zinc-950 border border-white/10 transition-colors duration-300 hover:border-[#0A7C6E]/40 hover:shadow-[0_0_30px_rgba(10,124,110,0.15)]">
            <Card.Header className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <Avatar.Image alt="Buyer/Seller image" src={story.avatar} />
                  <Avatar.Fallback>B/S</Avatar.Fallback>
                </Avatar>

                <div>
                  <h4 className="font-semibold">{story.name}</h4>
                  <p className="text-xs text-gray-500">{story.location}</p>
                </div>
              </div>

              <Chip
                size="sm"
                variant="flat"
                className={
                  story.type === "Seller"
                    ? "bg-[#0A7C6E]/15 text-[#0A7C6E]"
                    : "bg-blue-500/15 text-blue-400"
                }
              >
                {story.type}
              </Chip>
            </Card.Header>

            <Card.Content className="flex flex-col flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">{story.title}</h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {story.description}
                </p>
              </div>

              <motion.div
                className="flex items-center gap-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[...Array(story.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: {
                        opacity: 0,
                        scale: 0,
                        rotate: -90,
                      },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                      },
                    }}
                    transition={{
                      delay: 0.3 + i * 0.08,
                      duration: 0.3,
                    }}
                  >
                    <FiStar className="fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-auto rounded-xl border border-white/5 bg-white/5 p-3"
              >
                <p className="mb-1 text-xs text-gray-500">
                  Successful Transaction
                </p>

                <p className="font-medium">{story.transaction}</p>
              </motion.div>
            </Card.Content>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StoryCard;
