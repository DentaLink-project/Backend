import mongoose from "mongoose";
import User from "./userSchema.js";

const Admin = User.discriminator("Admin", new mongoose.Schema({}, { timestamps: true }));

export default Admin;