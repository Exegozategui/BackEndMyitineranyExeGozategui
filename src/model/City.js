const {Schema, model, Types }=require("mongoose")


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
                    

                   },
                   itineraries:[{
                    type:Types.ObjectId,
                    ref: "Itineraries"
                   }]

})

const City = model("City",schemaCities)

module.exports= City