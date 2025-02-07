import jwt from 'jsonwebtoken';
import User from '../models/userSchema';
import { tokenBlacklist } from "../services/authService"; // Import the blacklist

require('dotenv').config();


export function checkAuth(req, res, next) {
    const jwtSecret = process.env.SECRET_KEY ?? "";
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
    }

    const token = authHeader && authHeader.split(' ')[1];

    if (token === undefined) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    if (tokenBlacklist.has(token)) {
        res.status(401).json({ message: "Token has been invalidated" });
        return;
    }

    jwt.verify(token, jwtSecret, async(err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Failed to authenticate token' });
            return;
        }

        const { id } = decoded;
        const user = await User.findById(id);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
        }

        req.user = user;
        next();
    })
}