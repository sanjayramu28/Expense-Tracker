const express=require('express');
const { GetExpenses,putdata,DeleteData, register, login, authMiddleware } = require('./Home');




const router=express.Router();

router.get('/',authMiddleware,GetExpenses)
router.post('/Add',authMiddleware,putdata)
router.delete('/Remove-Expense/:id',authMiddleware,DeleteData)
router.post('/Register',register)
router.post('/login',login)

module.exports=router