const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../model/user'); // Adjust path as necessary

//Extract token and set secret key.
const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'CompanyConnect'
};
passport.use(new JWTStrategy(opts, async (jwtPayload, done) => {
  //  console.log('*******extracting******')
  try {
    //get user_id from the jwtpayload.
    const user = await User.findById(jwtPayload._id);
    console.log('user**:',user);
    if (user) {
      //return the user if user exist.
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

module.exports=passport;
