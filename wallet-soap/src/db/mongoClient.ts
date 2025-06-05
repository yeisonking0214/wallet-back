import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DATABASE_URL!;

let isConnected = false;

export async function connectToMongo(): Promise<typeof mongoose | null> {
    if (isConnected) return mongoose;

    try {
        await mongoose.connect(uri, {});
        isConnected = true;
        console.log('MongoDB conectado con Mongoose');
        return mongoose;
    } catch (error) {
        console.error('Error al conectar a MongoDB con Mongoose:', error);
        return null;
    }
}