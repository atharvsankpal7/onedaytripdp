import Database from 'better-sqlite3';
import { RegistrationFormData } from '@/app/types/registration';

const db = new Database('registration.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    primaryContact TEXT NOT NULL,
    secondaryContact TEXT,
    whatsappNumber TEXT NOT NULL,
    medicalConditions TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const createRegistration = (data: RegistrationFormData) => {
  const stmt = db.prepare(`
    INSERT INTO registrations (
      fullName, primaryContact, secondaryContact, whatsappNumber, medicalConditions
    ) VALUES (?, ?, ?, ?, ?)
  `);

  return stmt.run(
    data.fullName,
    data.primaryContact,
    data.secondaryContact || null,
    data.whatsappNumber,
    data.medicalConditions || null
  );
};

export default db;