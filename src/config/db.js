const { connect } = require("mongoose")

const password= "Honduras30"

const URL = `mongodb+srv://exegozategui:${password}@cluster0.vs1xsb4.mongodb.net/`

const connectionDB = () =>{
    connect(URL)
    .then(()=>{
        console.log("Finish connected to the database")

    })
   .catch(()=>{
        console.log("Error connecting")
    })
}


connectionDB()
    




