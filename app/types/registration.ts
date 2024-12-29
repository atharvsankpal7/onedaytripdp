export interface RegistrationFormData {
  fullName: string;
  primaryContact: string;
  secondaryContact?: string;
  whatsappNumber: string;
  medicalConditions?: string;
}

export interface SponsorData {
  id: number;
  name: string;
  logo: string;
  description: string;
}