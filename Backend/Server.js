const express = require('express');
const db = require('./DatabaseConnection');
const cors = require("cors");
const router = require('./Routes/Routes');

// Use process.env.PORT to bind the backend to the appropriate port
const PORT = process.env.PORT || 5000;  // Default to 5000 for local development

// If you have the frontend URL for CORS purposes, you can use it here
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';  // Default to localhost for development

const app = express();

// Enable CORS with the frontend URL
app.use(cors({
    origin: FRONTEND_URL,  // Allow only frontend URL to make requests to the backend
}));

// Middleware
app.use(express.json());

// API Routes
app.use('', router);

// Start the server, binding to the correct port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
