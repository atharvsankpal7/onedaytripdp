export interface RegistrationFormData {
  fullName: string;
  primaryContact: string;
  whatsappNumber: string;
  familyMembers: number;
  medicalConditions?: string;
}

export interface SponsorData {
  id: number;
  name: string;
  logo: string;
  description: string;
}