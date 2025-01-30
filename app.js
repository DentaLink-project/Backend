const express = require('express');
const database = require('./db');
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

async function startServer() {
    try {
        await database();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error("Server failed to start", err);
        process.exit(1);
    }
}

startServer();