"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import type { RegistrationFormData } from "../types/registration";
import ContactInput from "./form/ContactInput";
import MedicalConditions from "./form/MedicalConditions";
import NatureWalkIllustration from "./illustrations/NatureWalkIllustration";
import GifPlaceholder from "./form/GifPlaceholder";
import FeedbackModal from "./modals/FeedbackModal";

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({
    isOpen: false,
    type: "success",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormData>();

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Registration failed");

      setModalState({
        isOpen: true,
        type: "success",
        message:
          "Thank you for registering for the Nature Walk. We'll contact you soon with further details.",
      });
      toast.success("Registration successful!");
    } catch (error) {
      setModalState({
        isOpen: true,
        type: "error",
        message:
          "We couldn't process your registration. Please try again or contact support if the problem persists.",
      });
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4 md:p-8"
    >
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600" />

        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Nature Walk Registration
        </h1>

        <NatureWalkIllustration />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("fullName", {
                required: "Full name is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="John Middle Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <ContactInput
            label="Primary Contact Number"
            name="primaryContact"
            register={register}
            errors={errors}
            required
          />

          <ContactInput
            label="Secondary Contact Number (Optional)"
            name="secondaryContact"
            register={register}
            errors={errors}
          />

          <ContactInput
            label="WhatsApp Number"
            name="whatsappNumber"
            register={register}
            errors={errors}
            required
          />

          <MedicalConditions register={register} watch={watch} />
          <GifPlaceholder />

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-4 bg-green-600 text-white rounded-md font-medium ${
              isSubmitting
                ? "opacity-75 cursor-not-allowed"
                : "hover:bg-green-700"
            }`}
          >
            {isSubmitting ? "Registering..." : "Register for Nature Walk"}
          </motion.button>
        </form>
      </div>

      <FeedbackModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        type={modalState.type}
        title={
          modalState.type === "success"
            ? "Registration Successful!"
            : "Registration Failed"
        }
        message={modalState.message}
      />
    </motion.div>
  );
}
