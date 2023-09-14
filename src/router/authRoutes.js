const express = require('express')
const authRouter = express.Router()

/* routes to authenticate the user inside the system */
const {validator }=require('../middelwares/validators')
const { registerUser, userLogin, authenticated, userLogout }= require('../controllers/authController')
const {hashPassword, verifyUserExists, verifyPassword, generateToken, passportVerificator} = require('../middelwares/auth')

authRouter.post('/register',validator, hashPassword,registerUser)
authRouter.post('/login', validator,verifyUserExists,verifyPassword,generateToken,userLogin)
authRouter.post('/authenticated',passportVerificator.authenticate("jwt", {session:false}),generateToken,authenticated)
authRouter.post('/logout',passportVerificator.authenticate("jwt", {session:false}),userLogout)

module.exports = authRouter