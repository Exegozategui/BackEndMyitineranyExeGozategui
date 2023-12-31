const express= require("express")
require('dotenv').config()
const router=require ("./router/router")

const cors= require("cors")

require("./config/db")



const app= express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/", router)


app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})



