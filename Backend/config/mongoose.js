//Connecting to mongodb.
const mongoose=require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL);

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to MongoDB'));

db.once('open',function(){
    console.log('Connected to Mongodb Successfully');
});
module.exports=db;
