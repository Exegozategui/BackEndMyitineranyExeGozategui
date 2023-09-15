const joi = require('joi')

const userSchema = joi.object({
  nombre: joi.string().required().messages({
    'string.nombre': "Please enter an valid name",
    'string.empty': "Please enter your name",
    'any.required': "Please enter your name",
  }),
  apellido: joi.string().required().messages({
    'string.apellido': "Please enter an valid last",
    'string.empty': "Please enter your lastname",
    'any.required': "Please enter your lastname",
  }),
  email: joi.string().email().min(5).max(30).required().messages({
    'string.email': "Please enter an valid email",
    'string.min': "email must be at least 5 characters",
    'string.max': "email must be at most 30 characters",
    'string.empty': "Please enter your email",
    'any.required': "Please enter your email",
  }),
  password: joi.string().alphanum().min(6).max(60).required().messages({
    'string.password': "Please enter an valid password",
    'string.alphanum': "Please enter an valid password",
    'string.min': "password must be at least 6 characters",
    'string.max': "password must be at most 60 characters",
    'string.empty': "Please enter your password",
    'any.required': "Please enter your password",
  }),
  foto: joi.string().required().messages({
    'string.foto': "Please enter an valid photo",
    'string.empty': "Please enter your photo",
    'any.required': "Please enter your photo",
  }),
  pais: joi.string()
})

const verifyAuthData = (req, res, next) => {
  const payload = req.body
  const userValidated = userSchema.validate(payload, {abortEarly: false})

  if(userValidated.error){
    return res.status(400).json({ 
      message: userValidated.error.details.map(err => err.message)
    })
  }

  next()
}

const loginSchema = joi.object({
  email: joi.string().email().min(5).max(30).required().messages({
    'string.email': "Please enter an valid email",
    'string.min': "email must be at least 5 characters",
    'string.max': "email must be at most 30 characters",
    'string.empty': "Please enter your email",
    'any.required': "Please enter your email",
  }),
  password: joi.string().alphanum().min(6).max(60).required().messages({
    'string.password': "Please enter an valid password",
    'string.alphanum': "Please enter an valid password",
    'string.min': "password must be at least 6 characters",
    'string.max': "password must be at most 60 characters",
    'string.empty': "Please enter your password",
    'any.required': "Please enter your password",
  })
})

const verifyAuthDataLogin = (req, res, next) => {
  const payload = req.body
  const userValidated = loginSchema.validate(payload, {abortEarly: false})

  if(userValidated.error){
    return res.status(400).json({ message: userValidated.error.details.map(err => err.message)})
  }

  next()
}

module.exports = { verifyAuthData, verifyAuthDataLogin }