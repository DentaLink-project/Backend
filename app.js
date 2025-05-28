import express from 'express';
import database from './db.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerDocs from './swaggerConfig.js';
import userRoutes from './routes/userRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import toolRoutes from './routes/toolRoutes.js';
import exchangeRoutes from './routes/exchangeRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import aiToolRoutes from './routes/aiToolRoutes.js';


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
app.use('/api/tools', toolRoutes);
app.use('/api/exchanges', exchangeRoutes)
app.use('/api/admin', adminRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/profile', profileRoutes); 
app.use('/api/cart', cartRoutes);
app.use('/api/ai-tool', aiToolRoutes);



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
