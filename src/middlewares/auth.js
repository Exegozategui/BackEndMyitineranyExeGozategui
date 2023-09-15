
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

const secretOrKey = "MHBack2023"; // Aquí defines tu clave secreta

const passportVerificator = passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretOrKey, // Utiliza la clave secreta definida anteriormente
    },
    async (payload, done) => {
      let userFounded = await User.findOne({ email: payload.email });

      try {
        if (userFounded) {
          return done(null, userFounded);
        } else {
          return done(null);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);


const hashPassword = (req, res, next) => {
  try {
    const plainPassword = req.body.password
    const hashPassword = bcrypt.hashSync(plainPassword, 10)

    req.body.password = hashPassword

    next()
  } catch (error) {
    res.status(500).json({ error })
  }
}

const verifyPassword = (req, res, next) => {
  const passwordPlain = req.body.password
  const hashPassword = req.user.password
  const isValid = bcrypt.compareSync(passwordPlain, hashPassword)
  

  if(isValid){
    next()
  } else {
    res.status(400).json({
      message: ["Wrong password"]
    })
  }
}

const varifyUserExists = async (req, res, next) => {
  const { email } = req.body
       
  const userFound = await User.findOne({ email: email })    

  if(userFound){
    req.user = userFound
    next()
  } else {
    return res.status(400).json({
      message: ["User not found"]
    })
  }
}

const generateToken = (req, res, next) => {
  try {
    const secretKey = process.env.JWT
    const token = jwt.sign({email: req.user.email}, secretKey, {expiresIn: 60*5})

    req.token = token

    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { passportVerificator, hashPassword, verifyPassword, varifyUserExists, generateToken }