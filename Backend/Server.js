const express = require('express');
const db = require('./DatabaseConnection')
const cors = require("cors");
const router = require('./Routes/Routes')
const apiurl=process.env.FRONTEND_URL||process.env.PORT


const app = express();
app.use(cors())
app.use(express.json());

app.use('', router)

app.listen(apiurl, () => {
    console.log(`Server listening ${apiurl}`)
})


