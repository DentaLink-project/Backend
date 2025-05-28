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

// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    maxAge: 86400 // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/exchanges', exchangeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/ai-tool', aiToolRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Swagger documentation
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
