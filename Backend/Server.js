const express = require('express');
const db = require('./DatabaseConnection');
const cors = require('cors');
const router = require('./Routes/Routes');


const PORT = process.env.PORT;

const app = express();


const FRONTEND_URL = 'http://localhost:3000';
app.use(cors({ origin: FRONTEND_URL })); 

app.use(express.json());

app.use('', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
