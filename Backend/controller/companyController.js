const xlsx=require('xlsx');
const Company=require('../model/company');
const nodemailer=require('nodemailer');

//action to get list of all the companines.
module.exports.getAllCompanies=async function getAllCompanies(req,res){
    try{
        const companies=await Company.find({});
        res.json(200,{
            message:companies
        })
    }catch(error){
        console.log('Internal server error');
        res.josn(500,{
            message:'Internal Server error'
        })
    }
}

//action to add excel file.
module.exports.addExcelFile=async function addExcelFile(req,res){
    //console.log("File:",req.file);
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Read the uploaded file
        const workbook = xlsx.readFile(req.file.path);
        const sheet_name_list = workbook.SheetNames;
        const sheet = workbook.Sheets[sheet_name_list[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
        // Validate and save the data to MongoDB
        for (const record of data) {
            const company = await Company.create({
                name:record.Name,
                country:record.Country,
                website:record.Website,
                description:record.Description,
                industry:record.Industry
            });
        }

        res.send('Company data uploaded successfully.');
    } catch (error) {
        console.error("Error*******:", error.message);
        res.status(500).send("Error uploading company data: " + error.message);
    }

}
//actions to get company details.
module.exports.getCompanyDetails=async function getCompanyDetails(req,res){
    try{
       // console.log('id:',req.params.id);
        const company=await Company.findById(req.params.id);
        if(company){
         //   console.log('company details:',company);
            res.json(200,{
                message:company
            })
        }
    }catch(error){
        console.log('Internal Server Error',error);
        res.json(500,{
            message:'Internal server error'
        })
    }
}
//action to get list of search companies.
module.exports.searchCompanies=async function searchCompanies(req,res){
    try{
        const query=req.params.query;
        //console.log(query)
        const companies=await Company.find({});
        const results = companies.filter(
            (company) => company.name.toLowerCase().includes(query.toLowerCase()) ||
                         company.country.toLowerCase().includes(query.toLowerCase())
          );
        res.json(200,{
            message:results
        });
    }catch(error){
        console.log('Internal Server Error',error);
        res.json(500,{
            message:'Internal server error'
        })
    }
}
module.exports.contactUs=async function contactUs(req,res){
    try{
        console.log("payload****",req.body);
        
        const { email, message } = req.body;
        const transporter = nodemailer.createTransport({
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:email,
            pass:'mekkybjjnmqtjuyg'
        }
    });
    const mailOptions = {
        from: email,
        to: 'sdevesh227@gmail.com',
        subject: 'Inquiry/Contact Form Submission',
        text: `Email: ${email}\n\nMessage:\n${message}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
    }catch(error){
        console.log('Error in sending mail');
        res.json(500,{
            message:'Internal server error'
        })
    }
}