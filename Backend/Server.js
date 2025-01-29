const express = require('express');
const db = require('./DatabaseConnection');
const cors = require('cors');
const router = require('./Routes/Routes');


const PORT = process.env.PORT;

const app = express();


const FRONTEND_URL = 'http://localhost:3000';
const FRONTEND_URL_PRODUCTION = process.env.FRONTEND_URL_PRODUCTION;
app.use(cors({
    origin: [FRONTEND_URL, FRONTEND_URL_PRODUCTION],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow the Authorization header
    credentials: true,  // If you're using cookies or authentication
}));

app.use(express.json());

app.use('', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
