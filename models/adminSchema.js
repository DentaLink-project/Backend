import mongoose from "mongoose";
import User from "./userSchema";

const Admin = User.discriminator("admin", new mongoose.Schema({}, { timestamps: true }));

export default Admin;