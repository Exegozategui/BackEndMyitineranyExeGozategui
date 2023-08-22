const {Schema, model }=require("mongoose")


const schemaCities = new Schema({
                   nombre: {
                    type: String,
                    require: true
                   },

                   foto:{
                    type: String,
                    require: true
                   },
                   pais:{
                    type: String,
                    require: true

                   }

})

const City = model("City",schemaCities)

module.exports= City