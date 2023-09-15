const Itinerary = require('../models/Itineraries'); // Importa el modelo Itineraries
const City = require('../models/City'); // Importa el modelo City

// Consultar (GET) todos los itinerarios
async function getAllItineraries(req, res) {
   try {
    const itineraries = await Itinerary.find().populate("city_id")
    res.status(200).json({ itineraries })
} catch (error) {
    res.status(500).json({ message: error.message })
}
}


// Consultar itinerarios de una ciudad en particular
async function getItinerariesByCity(req, res) {
  try {
    let { cityId } = req.params
    const cityFound = await City.findById(cityId)
    if(cityFound) {
        const itineraries = await Itinerary.find({city_id: cityId}).populate("city_id", {_id:0, nombre: 1})

        if(!itineraries.length){
            return res.json([])
        }
        res.status(200).json({ itineraries })
    }
    
} catch (error) {
    res.status(500).json({ message: error.message })
}
}

// Consultar un itinerario en particular (por id)
async function getItineraryById(req, res) {
  try {
    let { cityId } = req.params
    const cityFound = await City.findById(cityId)
    if(cityFound) {
        let { iid } = req.params
        const itinerary = await Itinerary.findById(iid).populate("city_id")
        res.status(200).json({ itinerary })
    }        
} catch (error) {
    res.status(500).json({ message: error.message })
}
}

// Crear un nuevo itinerario
async function createItinerary(req, res) {
  try {
    let { cityId } = req.params
    const cityFound = await City.findById(cityId)
    
    if(cityFound) {
        const dataItinerary = req.body
        const newItinerary = await Itinerary.create({...dataItinerary, city_id: cityFound})
        await cityFound.updateOne({ _itineraries: [ ...cityFound._itineraries, newItinerary ] })
    }
    
    const cityFoundUpdate = await City.findById(cityId).populate("_itineraries")

    res.status(201).json({
        message: "Itinerary has been added",
        Itinerary: cityFoundUpdate
    })
} catch (error) {
    res.status(500).json({ message: error.message })
}
}

// Modificar un itinerario
async function updateItinerary(req, res) {
  try {
    let newData = req.body
    
    const {iid} = req.params
    await Itinerary.findByIdAndUpdate(iid, newData)

    res.status(201).json({
        message: "Itinerary has been update",
        newData
    })
} catch (error) {
    res.status(500).json({ message: error.message })
}
}


// Borrar un itinerario
async function deleteItinerary(req, res) {
  const itineraryId = req.params.id;

  try {
    const {iid} = req.params
    await Itinerary.findByIdAndDelete(iid)
    res.status(201).json({
        message: "Itinerary has been delete",
    })
} catch (error) {
    res.status(500).json({ message: error.message })
}
}

module.exports = {
  getAllItineraries,
  getItinerariesByCity,
  getItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
};
