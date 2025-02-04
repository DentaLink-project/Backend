import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;
const refreshSecretKey = process.env.REFRESH_SECRET_KEY;


export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, secretKey, { expiresIn: '7d' });
}

export const generateRefreshToken = (userId)=> {
    return jwt.sign({ id: userId }, refreshSecretKey, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey)
    }
    catch (err) {
        return err;
    }
};

export const verifyRefreshToken = (token)=> {
    try {
        return jwt.verify(token, refreshSecretKey);
    } catch (err) {
        return null;
    }
};