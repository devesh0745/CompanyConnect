const User = require('../model/user');
const jwt = require('jsonwebtoken');

//Action to create user.
module.exports.createUser = async function createUser(req, res) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists. Please sign in!',
      });
    } else {
      const user = await User.create(req.body);
      return res.status(201).json({
        message: 'User created successfully',
        user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

//action to create session(sign-in).
module.exports.createSession = async function createSession(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    //console.log(user);
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist. Please sign up first!',
      });
    }else{
      if(user.password==req.body.password){
        //create a JWT token using user info and pass that token to header.
        const token = jwt.sign(user.toJSON(), 'CompanyConnect', { expiresIn: '1000000' });
        //console.log('token:',token);
          return res.status(200).json({
          message: 'Sign in successfully',
          user,
          token
        });
      }else{
        console.log("Incorrect email or password");
        res.json(400,{
          message:'Incorrect email or password'
        })
      }
      
    }

    
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
