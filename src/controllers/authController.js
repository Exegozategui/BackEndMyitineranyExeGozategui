const { verifyPassword } = require('../middlewares/auth')
const User = require('../models/userModel')

const register = async (req, res) => {
  try {
    const payload = req.body
    const userExist = await User.findOne({email: payload.email})

    if(userExist){
      return res.status(403).json({
        message: ["User already exist"]
      })
    }
    
    const userCreated = await User.create(payload)

    res.status(200).json({
      message: ["User created successfully"],
      success: true,
      userCreated
    })
  } catch (error) {
    res.status(400).json({
      message
    })
  }
}

const login = async (req, res) => {
  try {
  
    res.status(200).json({
      message: ["Login successfully"],
      token: req.token,
      success: true,
      user: {
        nombre: req.user.nombre,
        email: req.user.email,
        foto: req.user.foto,
        _id: req.user._id
      }
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

const authenticated = async (req, res) => {
  try {
  
    res.status(200).json({
      message: "Authenticated successfully",
      token: req.token,
      success: true,
      user: {
        nombre: req.user.nombre,
        email: req.user.email,
        foto: req.user.foto,
        _id: req.user._id
      }
    })

  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

const logout = async (req, res) => {
  try {
    res.status(200).json({
      message: "Logged out",
      token: req.token
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = { register, login, authenticated, logout }