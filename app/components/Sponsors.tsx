"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { SponsorData } from "../types/registration";

const sponsors: SponsorData[] = [
  {
    id: 1,
    name: "Green Trek Co.",
    logo: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?w=100&h=100&fit=crop",
    description: "Sustainable hiking gear for nature enthusiasts",
  },
  {
    id: 2,
    name: "Nature's Path",
    logo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop",
    description: "Organic trail snacks and supplements",
  },
  {
    id: 3,
    name: "Wild Compass",
    logo: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=100&h=100&fit=crop",
    description: "Navigation tools and outdoor equipment",
  },
];

export default function Sponsors() {
  const [currentSponsor, setCurrentSponsor] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSponsor((prev) => {
        const next = prev + direction;
        if (next >= sponsors.length - 1) {
          setDirection(-1);
          return sponsors.length - 1;
        }
        if (next <= 0) {
          setDirection(1);
          return 0;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [direction]);

  return (
    <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
        Our Sponsors
      </h2>
      
      <div className="relative h-48">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.id}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{
              opacity: currentSponsor === index ? 1 : 0,
              x: currentSponsor === index ? 0 : direction > 0 ? -100 : 100,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="flex items-center justify-center space-x-4">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-green-700">
                  {sponsor.name}
                </h3>
                <p className="text-gray-600">{sponsor.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-2 mt-4">
        {sponsors.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSponsor(index);
              setDirection(index > currentSponsor ? 1 : -1);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSponsor === index ? "bg-green-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}