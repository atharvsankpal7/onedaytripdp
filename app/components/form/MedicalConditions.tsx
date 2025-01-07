"use client";

import { AlertCircle } from "lucide-react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { RegistrationFormData } from "@/app/types/registration";
import { commonMedicalConditions } from "@/lib/constants";

interface MedicalConditionsProps {
  register: UseFormRegister<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
}

export default function MedicalConditions({ register, watch }: MedicalConditionsProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        वैद्यकीय स्थिती (Medical Conditions)
      </label>
      <div className="relative">
        <AlertCircle className="absolute left-3 top-3 text-gray-400" size={18} />
        <textarea
          {...register("medicalConditions")}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[100px]"
          placeholder="कृपया कोणत्याही वैद्यकीय स्थितीची यादी करा... (Please list any medical conditions...)"
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {commonMedicalConditions.map((condition) => (
          <button
            key={condition}
            type="button"
            onClick={() => {
              const currentValue = watch("medicalConditions") || "";
              const newValue = currentValue
                ? `${currentValue}, ${condition}`
                : condition;
              register("medicalConditions").onChange({
                target: { value: newValue },
              });
            }}
            className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors"
          >
            {condition}
          </button>
        ))}
      </div>
    </div>
  );
}