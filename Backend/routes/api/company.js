const express=require('express');
const router=express.Router();
const multer=require('multer');
const passport=require('passport')

//using multer for excel file.
const upload=multer({dest:'uploads/'});

const companyController=require('../../controller/companyController');

//Routes to handle company actions.
//Authenticate all the routes using passport(only able to access when user is sign-in)
router.get('/getAllCompanies',companyController.getAllCompanies);

router.post('/upload-excel',upload.single('file'),passport.authenticate('jwt',{session:false}),companyController.addExcelFile);

router.get('/getDetails/:id',passport.authenticate('jwt',{session:false}),companyController.getCompanyDetails);

router.get('/searchCompanies/:query',passport.authenticate('jwt',{session:false}),companyController.searchCompanies);

router.post('/contactUs',companyController.contactUs);

module.exports=router;