import { MongoClient } from 'mongodb';
import { RegistrationFormData } from '@/app/types/registration';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function createRegistration(data: RegistrationFormData) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('registrations');

    const registrationData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(registrationData);
    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function getRegistrations() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('registrations');
    
    return await collection.find({}).toArray();
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export default clientPromise;