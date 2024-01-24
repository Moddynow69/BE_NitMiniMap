import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);
    if(isConnected) {
    }
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}