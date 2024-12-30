"use client";

import { motion } from "framer-motion";
import { Film } from "lucide-react";

export default function GifPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 p-6 border-2 border-dashed border-green-300 rounded-lg bg-green-50 flex flex-col items-center justify-center"
    >
      <img src="/animation.gif" alt="" className="object-fill" />
    </motion.div>
  );
}