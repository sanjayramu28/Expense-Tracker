const express=require('express');
const db=require('./DatabaseConnection')
const cors = require("cors");
const router=require('./Routes/Routes')


const app=express();
app.use(cors())
app.use(express.json());

app.use('',router)

app.listen(process.env.PORT,()=>{
    console.log(`Server listening ${process.env.PORT}`)
})


