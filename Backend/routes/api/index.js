const express=require('express');
const router=express.Router();

//Index route will take to the specific routes.
router.use('/company',require('./company'));
router.use('/user',require('./user'));

module.exports=router;