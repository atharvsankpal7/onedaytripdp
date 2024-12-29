"use client";

import { Phone } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegistrationFormData } from "@/app/types/registration";

interface ContactInputProps {
  label: string;
  name: keyof RegistrationFormData;
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  required?: boolean;
}

export default function ContactInput({
  label,
  name,
  register,
  errors,
  required = false,
}: ContactInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          {...register(name)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="+1 234 567 8900"
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
}