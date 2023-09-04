const Itinerary = require('../model/Itineraries'); // Importa el modelo Itineraries
const City = require('../model/City'); // Importa el modelo City

// Consultar (GET) todos los itinerarios
async function getAllItineraries(req, res) {
  try {
    const itineraries = await Itinerary.find();
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los itinerarios.' });
  }
}

// Consultar itinerarios de una ciudad en particular
async function getItinerariesByCity(req, res) {
  const cityId = req.params.cityId;

  try {
    const itineraries = await Itinerary.find({ city_id: cityId });
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los itinerarios de la ciudad.' });
  }
}

// Consultar un itinerario en particular (por id)
async function getItineraryById(req, res) {
  const itineraryId = req.params.id;

  try {
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerario no encontrado.' });
    }
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el itinerario.' });
  }
}

// Crear un nuevo itinerario
async function createItinerary(req, res) {
  const { user_name, city_id, photo_user, name, price, duration, likes, hashtags, comments } = req.body;

  try {
    const itinerary = new Itinerary({
      user_name,
      city_id,
      photo_user,
      name,
      price,
      duration,
      likes,
      hashtags,
      comments,
    });
    await itinerary.save();

    // Agregar el itinerario a la ciudad correspondiente
    const city = await City.findById(city_id);
    if (!city) {
      return res.status(404).json({ error: 'Ciudad no encontrada.' });
    }
    city.itineraries.push(itinerary);
    await city.save();

    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el itinerario.' });
  }
}

// Modificar un itinerario
async function updateItinerary(req, res) {
  const itineraryId = req.params.id;
  const { user_name, photo_user, name, price, duration, likes, hashtags, comments } = req.body;

  try {
    const itinerary = await Itinerary.findByIdAndUpdate(
      itineraryId,
      { user_name, photo_user, name, price, duration, likes, hashtags, comments },
      { new: true }
    );
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerario no encontrado.' });
    }
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar el itinerario.' });
  }
}

// Borrar un itinerario
async function deleteItinerary(req, res) {
  const itineraryId = req.params.id;

  try {
    const itinerary = await Itinerary.findByIdAndRemove(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ error: 'Itinerario no encontrado.' });
    }

    // Eliminar el itinerario de la ciudad correspondiente
    const city = await City.findById(itinerary.city_id);
    if (city) {
      city.itineraries.pull(itinerary);
      await city.save();
    }

    res.json({ message: 'Itinerario eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar el itinerario.' });
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
