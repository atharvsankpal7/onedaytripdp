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
    reset,
  } = useForm<RegistrationFormData>();

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("नोंदणी अयशस्वी (Registration failed)");

      setModalState({
        isOpen: true,
        type: "success",
        message:
          "निसर्ग भ्रमंतीसाठी नोंदणी केल्याबद्दल धन्यवाद. आम्ही लवकरच अधिक माहितीसह संपर्क साधू. (Thank you for registering for the Nature Walk. We'll contact you soon with further details.)",
      });
      toast.success("नोंदणी यशस्वी! (Registration successful!)");
      reset(); // Clear the form after successful registration
    } catch (error) {
      setModalState({
        isOpen: true,
        type: "error",
        message:
          "आम्ही आपली नोंदणी प्रक्रिया करू शकलो नाही. कृपया पुन्हा प्रयत्न करा किंवा समस्या कायम राहिल्यास सहाय्यासाठी संपर्क साधा. (We couldn't process your registration. Please try again or contact support if the problem persists.)",
      });
      toast.error(
        "नोंदणी अयशस्वी. कृपया पुन्हा प्रयत्न करा. (Registration failed. Please try again.)"
      );
      reset(); // Clear the form after failed registration as well
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
          जानाई ते शिरसाई, निसर्गातून पायी प्रवास
        </h1>

        <NatureWalkIllustration />

        <p className="text-sm text-red-600 mb-4">
          * तारांकित क्षेत्रे भरणे आवश्यक आहे (Fields marked with * are
          required)
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              संपूर्ण नाव (Full Name) *
            </label>
            <input
              {...register("fullName", {
                required: "नाव आवश्यक आहे (Full name is required)",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="संपूर्ण नाव"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <ContactInput
            label="संपर्क क्रमांक (Contact Number) *"
            name="primaryContact"
            register={register}
            errors={errors}
            required
          />

          <ContactInput
            label="व्हाट्सअॅप क्रमांक (WhatsApp Number) *"
            name="whatsappNumber"
            register={register}
            errors={errors}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              कुटुंब सदस्य संख्या (Number of Family Members) *
            </label>
            <div className="relative">
              <input
                type="number"
                {...register("familyMembers", {
                  required:
                    "कुटुंब सदस्य संख्या आवश्यक आहे (Number of family members is required)",
                  min: {
                    value: 1,
                    message:
                      "किमान 1 सदस्य असणे आवश्यक आहे (Minimum 1 member required)",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="1"
                min="1"
              />
            </div>
            {errors.familyMembers && (
              <p className="text-red-500 text-sm">
                {errors.familyMembers.message}
              </p>
            )}
            <p className="text-sm text-gray-500">
              स्वतःसह एकूण सदस्य संख्या नमूद करा (Include total count including
              yourself)
            </p>
          </div>

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
            {isSubmitting
              ? "नोंदणी होत आहे... (Registering...)"
              : "सहभागी व्हा "}
          </motion.button>
        </form>
      </div>

      <FeedbackModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        type={modalState.type}
        title={
          modalState.type === "success"
            ? "नोंदणी यशस्वी! (Registration Successful!)"
            : "नोंदणी अयशस्वी (Registration Failed)"
        }
        message={modalState.message}
      />
    </motion.div>
  );
}
