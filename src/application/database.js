import mongoose from "mongoose";

export const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to MongoDB Atlas!");
   } catch (error) {
      console.error("Error connecting to MongoDB Atlas:", error);
      process.exit(1); // Exit the application on error
   }
};
