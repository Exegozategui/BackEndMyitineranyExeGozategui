const express = require('express')
const { register, login, authenticated, logout } = require('../controllers/authController')
const { verifyAuthData, verifyAuthDataLogin } = require('../middlewares/verifications')
const { passportVerificator, hashPassword, varifyUserExists, verifyPassword, generateToken } = require('../middlewares/auth')
 
const authRouter = express.Router()
 
authRouter.post("/register", verifyAuthData, hashPassword, register)
authRouter.post("/login", verifyAuthDataLogin, varifyUserExists, verifyPassword, generateToken, login)
authRouter.post("/authenticated", passportVerificator.authenticate("jwt", {session: false}), generateToken, authenticated)
authRouter.post("/logout", passportVerificator.authenticate("jwt", {session: false}), logout)

module.exports = authRouter