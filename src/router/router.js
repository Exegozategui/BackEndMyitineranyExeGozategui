const express = require("express")
const router = express.Router()
const {addCity,getCities,getCity,updateCity,deleteCity,addAllCities}=require("../controllers/citiesControllers")



router.post("/api/city",addCity)
router.get("/api/city/:id",getCity)
router.get("/api/cities",getCities)
router.delete("/api/city/:id",deleteCity)
router.put("api/city/:id",updateCity)
router.post("/api/cities/collection",addAllCities)





module.exports =router

