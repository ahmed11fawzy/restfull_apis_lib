import 'dotenv/config';
import mongoose from 'mongoose';

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.Mongo_Url as string);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};