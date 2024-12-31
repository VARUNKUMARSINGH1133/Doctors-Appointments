import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        mongoose.connection.on('error', (err) => console.error("Database Connection Error:", err));

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connection established successfully.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
