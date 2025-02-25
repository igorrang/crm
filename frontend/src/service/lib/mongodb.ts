import mongoose from "mongoose";
import { CustomError, ECustomError } from "../utils/Errors";

let mongodb: typeof mongoose | null = null;

export const connectMongoDB = async (forceUri?: string) => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection; // Retorna a conexão existente
    }

    try {
        await mongoose.connect(forceUri || String(process.env.MONGODB_URI));
        return mongoose.connection; // Retorna a conexão após a conexão bem-sucedida
    } catch (error) {
        throw new CustomError(ECustomError.CONNECT_TO_MONGO_EREROR, 'Error connecting to MongoDB');
    }
};

export const dropMongoDB = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }
};