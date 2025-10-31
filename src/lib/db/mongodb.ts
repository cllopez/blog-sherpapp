import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Por favor, define la variable MONGODB_URI en el archivo .env.local');
}

export async function connectDB() {
  try {
    const connection = await mongoose.connect(MONGODB_URI!);
    console.log("✅ Conectado a MongoDB");
    return connection;
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}