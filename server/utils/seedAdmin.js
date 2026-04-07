import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@hospital.com" });
    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const adminUser = await User.create({
      name: "Admin",
      email: "admin@hospital.com",
      password: "admin123", // Ye automatically encrypt ho jayega
      role: "admin",
    });

    console.log("Admin user created:", adminUser.email);
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();