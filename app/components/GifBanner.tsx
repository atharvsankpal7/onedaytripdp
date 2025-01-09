"use client";

import { motion } from "framer-motion";

export default function GifBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full max-w-full aspect-video mb-8 rounded-xl overflow-hidden shadow-lg"
    >
      {/* Instead of background image, use <img> */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/banner.jpg" // Image path from the public directory
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Optional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent" />
    </motion.div>
  );
}
