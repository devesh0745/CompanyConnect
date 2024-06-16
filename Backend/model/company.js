//Schema for company.
const mongoose=require('mongoose');

const companySchema=new mongoose.Schema({
    
        name: {
            type:String,
            required:true
        },
        country: {
            type:String,
            required:true
        },
        website: {
            type:String,
            required:true
        },
        description: {
            type:String,
            required:true
        },
        industry:{
            type:String,
            required:true
        }
    
},{
    timestamps:true
});

const Company=mongoose.model('company',companySchema);
module.exports=Company;
