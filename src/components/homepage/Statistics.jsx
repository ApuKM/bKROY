"use client"

import { motion } from "motion/react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Statistics = ({ stats }) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} // Triggers just as it enters the viewport
      className="relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4 -mt-16 md:-mt-38 lg:-mt-46"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          variants={cardVariants}
          whileHover={{ y: -5 }} // Subtle lift on hover
          className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl transition-colors hover:bg-[#111]"
        >
          <div className="text-center ">{stat.icon}</div>
          <div className="flex flex-col gap-1 text-center">
            <span className="text-4xl font-semibold tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs text-gray-400">{stat.label}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Statistics;