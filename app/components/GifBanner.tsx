"use client";

import { motion } from "framer-motion";

export default function GifBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-[300px] mb-8 rounded-xl overflow-hidden shadow-lg"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/70" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl font-bold mb-2"
        >
          Nature Walk Experience
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg text-green-50"
        >
          Join us for a memorable journey through pristine forests
        </motion.p>
      </div>
    </motion.div>
  );
}