import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbURI = process.env.DB_URI;

const database = async () => {
    if (!dbURI) {
        throw new Error("dbURI is not defined");
    }

    try {
        await mongoose.connect(dbURI);
        console.log(`connected to Database`);
    } catch (err) {
        console.error("Failed to connect to the database", err);
        throw new Error("Database connection failed");
    }
};

export default database;