import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Adding recommended options for stability
        const conn = await mongoose.connect(process.env.MONGODB_URL);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Exit process with failure if connection fails
        process.exit(1);
    }
};

// Optional: Listen for connection errors after initial connection
   mongoose.connection.on('error', err => {
    console.error('Mongoose connection error:', err);
});

export default connectDB;