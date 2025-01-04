require('dotenv').config()
const express = require('express')

const app=express();


const mongoose=require('mongoose');

const connectingtoDb=async ()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI)

    // console.log("Mongodb Connected")
    }
    catch(e){
        console.log("error",e)
    }
}


connectingtoDb()
// Expense()