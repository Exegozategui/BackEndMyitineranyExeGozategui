const express = require("express")
const router = express.Router()
const {addCity,getCities,getCity,updateCity,deleteCity,addCollectionCities}=require("../controllers/citiesControllers")
const {getAllItineraries,getItinerariesByCity,getItineraryById,createItinerary,updateItinerary,deleteItinerary}=require("../controllers/ininerariesCrontrollers")

//City ROuter
router.post("/api/city",addCity)
router.get("/api/city/:id",getCity)
router.get("/api/cities",getCities)
router.delete("/api/city/:id",deleteCity)
router.put("api/city/:id",updateCity)
router.post("/api/cities/collection",addCollectionCities)
//Itineraries Router

router.get("/api/itineraries", getAllItineraries); // Consultar (GET) todos los itinerarios
router.get("/api/itineraries/:cityId", getItinerariesByCity); // Consultar itinerarios de una ciudad en particular
router.get("/api/itinerary/:id", getItineraryById); // Consultar un itinerario en particular (por id)
router.post("/api/itineraries", createItinerary); // Crear un nuevo itinerario
router.put("/api/itinerary/:id", updateItinerary); // Modificar un itinerario
router.delete("/api/itinerary/:id", deleteItinerary); // Borrar un itinerario




module.exports =router

