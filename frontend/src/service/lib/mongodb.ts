import mongoose,{mongo} from "mongoose";
import{CustomError, ECustomError} from "../../utils/Errors"

var mongodb: typeof mongoose | null = null;

export const connectMongoDB = async (forceUri?: string) => {
    if (mongodb){return}

    try{
        mongodb = await mongoose?.connect(forceUri ? forceUri : String(process.env.MONGODB_URI));
    }catch (error){
        throw new CustomError(ECustomError.CONNECT_TO_MONGO_EREROR, 'error connecting to mongodb')
    }
}

export const dropMongoDB = async () => {
    if(mongodb){
        await mongodb.connection?.dropDatabase();
        await mongodb.connection?.close();
        mongodb = null;
    }
}