const express = require('express');
const db = require('./DatabaseConnection');
const cors = require('cors');
const router = require('./Routes/Routes');

// Use process.env.PORT for backend port (Render will provide this automatically)
const PORT = process.env.PORT || 5000;  // Default to 5000 for local development

const app = express();

// CORS configuration (you can add your frontend URL here if needed)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';  // Default to localhost for development
app.use(cors({ origin: FRONTEND_URL }));  // Allow the frontend to make requests

app.use(express.json());  // Parse JSON requests

app.use('', router);  // Use routes from the 'Routes' module

// Start the server listening on the correct port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
