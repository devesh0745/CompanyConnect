const express=require('express');
const router=express.Router();

const userController=require('../../controller/userController');

//Routes for sign-up and sign-in.
router.post('/sign-up', userController.createUser);
router.post('/sign-in',userController.createSession);

module.exports=router;