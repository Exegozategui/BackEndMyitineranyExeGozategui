
require("dotenv").config() 
const bcrypt = require("bcrypt");
const User = require("../model/User"); 
const jwt = require("jsonwebtoken");
const passport = require('passport');
const {Strategy, ExtractJwt}= require('passport-jwt');

const secretKey ="MHBack2023"




const hashPassword = (req, res, next) => {
  try {
    const passPlain = req.body.password;

    const hashPassword = bcrypt.hashSync(passPlain, 10);

    req.body.password = hashPassword;

    next();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const verifyPassword = (req, res, next) => {
  const passPlain = req.body.password; 
  const hashPassword =
    req.user
      .password; 
  const isValid = bcrypt.compareSync(passPlain, hashPassword);

  if (isValid) {
    next();
  } else {
    res.status(400).json({
      message: "Wrong password!",
    });
  }
};


const verifyUserExists = async (req, res, next) => {
  const { email } = req.body;
  const userFounded = await User.findOne({ email: email });

  if (userFounded) {

    req.user = userFounded;

    next();
  } else {
    res.status(400).json({ message: "User not found" });
  }
};

const generateToken = (req, res, next) => {
  try {
      
      let token = jwt.sign({ email: req.user.email }, secretKey, { expiresIn: '5m' });

      req.token = token; 
      next();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





const passportVerificator = passport.use(

  new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:secretKey,
  }, async(payload, done) =>{
        try {
          
          let userFounded = await User.findOne({email: payload.email})

          if (userFounded){
            return done(null, userFounded);

          }else{
            return done(null)
          }

        } catch (error) {
            return done (error)
        }
          
  })
)

module.exports = { hashPassword, verifyPassword, verifyUserExists,generateToken,passportVerificator };