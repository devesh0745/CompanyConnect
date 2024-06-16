const express=require('express');
const cors=require('cors');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const bodyParser=require('body-parser');
const passport=require('passport');
const passportJWT=require('./config/passport-jwt');
const multer=require('multer');
const xlsx=require('xlsx');

//using cors for cross origin resource sharing.
app.use(cors());
//body-parser for parsing
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(passport.initialize());


app.use('/',require('./routes'));

app.listen(port,function(){
    console.log(`Server running on port:${port}`)
});
