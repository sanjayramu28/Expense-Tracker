const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Expenses = new Schema({

    Userid:{
        type:String,
        ref:'UserCredentials',
        required:true,
        default:""
        // unique:true
    },
    Category: {
        type: String,
        required: true
    },
    amountSpent: {
        type: Number,
        required: true,
        min: 0        
    },
    SpentOn: {
        type: Date,
        default: Date.now
    }
});

const UserCred = new Schema({
    UserEmail: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('UserCredentials', UserCred);
const Expense = mongoose.model('expenses', Expenses);

module.exports = { Expense, User };
