"use client";

import { motion } from "framer-motion";
import { Trees, Mountain, Bird, Sun } from "lucide-react";

export default function NatureWalkIllustration() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-40 mb-8 overflow-hidden"
    >
      {/* Sun */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-2 right-8"
      >
        <Sun className="w-12 h-12 text-yellow-500" />
      </motion.div>

      {/* Birds */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-8 left-4"
      >
        <Bird className="w-6 h-6 text-gray-600" />
      </motion.div>

      {/* Mountains */}
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-0 w-full flex justify-center space-x-4"
      >
        <Mountain className="w-24 h-24 text-green-700" />
        <Mountain className="w-32 h-32 text-green-800" />
        <Mountain className="w-24 h-24 text-green-700" />
      </motion.div>

      {/* Trees */}
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-0 w-full flex justify-around"
      >
        <Trees className="w-16 h-16 text-green-600" />
        <Trees className="w-20 h-20 text-green-500" />
        <Trees className="w-16 h-16 text-green-600" />
        <Trees className="w-18 h-18 text-green-500" />
      </motion.div>
    </motion.div>
  );
}