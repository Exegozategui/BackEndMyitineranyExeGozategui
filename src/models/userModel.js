const { Schema, model, Types } = require('mongoose')

const schemaUser = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    foto: {
        type: String, 
        required: true
    },
    pais: {
      type: String
    }
  },
{
    timestamps: true
})

const User = model("User", schemaUser)

module.exports = User