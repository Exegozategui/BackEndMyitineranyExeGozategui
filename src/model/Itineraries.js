const { Schema, model,Types } = require("mongoose")

const schemaInteneraries = new Schema({
    user_name: {
        type: String,
        require: true
       },

     city_id:{type:Types.ObjectId, ref: "City"},  

    photo_user:{
        type: String,
        require: true
    },

    name:{
        type:String,
        require:true
        },
    price:{
        type: Number,
        require: true
    },
    duration:{
        type:Number,
        require: true
    },
    likes:{
        type:Number,
        require:true
    },
    hashtags:{
        type: String,
        require: true
    },
    comments:{
        type: String,
        
    }

})

const Itineraries = model("Itineraries",schemaInteneraries)

module.exports= Itineraries