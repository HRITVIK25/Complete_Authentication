import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("error connecting to MongoDB: ",error);
        process.exit(1); // failure 0 is success 1 is failure
    }
}