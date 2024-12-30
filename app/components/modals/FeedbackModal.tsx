"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  type,
  title,
  message
}: FeedbackModalProps) {
  const icon = type === 'success' ? (
    <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
  ) : (
    <XCircle className="w-12 h-12 text-red-500 mb-4" />
  );

  const buttonClass = type === 'success' 
    ? "bg-green-600 hover:bg-green-700"
    : "bg-red-600 hover:bg-red-700";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full m-4"
          >
            <div className="flex flex-col items-center text-center">
              {icon}
              <h2 className={`text-2xl font-bold mb-4 ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {title}
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <button
                onClick={onClose}
                className={`w-full py-2 px-4 text-white rounded-md transition-colors ${buttonClass}`}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}