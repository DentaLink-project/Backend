import express from 'express';
import database from './db.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerDocs from './swaggerConfig.js';
import userRoutes from './routes/userRoutes.js';
import patientRoutes from './routes/patientRoutes.js'
import exchangeRout from './routes/exchangeRoutes.js'
import profileRoutes from './routes/profileRoutes.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/exchanges', exchangeRout)
app.use('/api/profiles' , profileRoutes)



swaggerDocs(app);

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
