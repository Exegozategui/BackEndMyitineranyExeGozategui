const {Schema, model }=require("mongoose")


const schemaCities = new Schema({
                   ciudad: {
                    type: String,
                    require: true
                   },

                   pais:{
                    type: String,
                    require: true
                   },
                   imagen:{
                    type: String,
                    require: true
                    

                   }

})

const City = model("City",schemaCities)

module.exports= City