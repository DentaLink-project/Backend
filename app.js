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

// Debug logging middleware
app.use((req, res, next) => {
    console.log('\n=== Incoming Request ===');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Origin:', req.headers.origin);
    console.log('======================\n');

    // Log response headers
    const oldSend = res.send;
    res.send = function (data) {
        console.log('\n=== Outgoing Response ===');
        console.log('Status:', res.statusCode);
        console.log('Headers:', JSON.stringify(res.getHeaders(), null, 2));
        console.log('======================\n');
        return oldSend.apply(res, arguments);
    };
    next();
});

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        console.log('CORS Origin Check:', origin);
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            console.log('No origin provided, allowing request');
            return callback(null, true);
        }
        // Allow all origins for now
        console.log('Allowing origin:', origin);
        callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    maxAge: 86400, // 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', (req, res) => {
    console.log('\n=== Preflight Request ===');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('========================\n');
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Max-Age', '86400');
    res.sendStatus(204);
});

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
    console.error('\n=== Error ===');
    console.error('Error Message:', err.message);
    console.error('Stack:', err.stack);
    console.error('Request URL:', req.url);
    console.error('Request Method:', req.method);
    console.error('Request Headers:', JSON.stringify(req.headers, null, 2));
    console.error('================\n');

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
            console.log('CORS is configured with the following options:', corsOptions);
        });
    } catch (err) {
        console.error("Server failed to start", err);
        process.exit(1);
    }
}

startServer();
