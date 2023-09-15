const City= require("../models/City")


//Agrega una ciudad
const addCity= async(req, res) =>{
    try{
        let datacities= req.body
        let citiesCreate= await City.create(datacities)
        res.status(201).json({
            mensage: "Add City Ok",
            city:citiesCreate
        }) 

    }  catch (error) {
        res.status(500).json({message:error.mensage})
    }
}



//Obtener ciudaddes
const getCities = async (req, res) => {
    try {
        const searchTerm = req.query.nombre
        if (searchTerm) {
          
            const filteredCities = await City.find({ nombre: {$regex: `^${searchTerm}`, $options: 'i'} }).populate("_itineraries")  
            res.status(200).json({ cities: filteredCities }) 
        } else {
            let cities = await City.find().populate("_itineraries")  
            res.status(200).json({ cities })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Obeter una sola ciudad por id
const getCity= async (req,res)=>{
    try{
        const{id}=req.params
        const city= await City.findById(id).populate("_itineraries")
        res.json({city})
    
    }catch (error) {
        res.status(500).json({message:error.message})
    }
}
//Borrar ciuad
const deleteCity = async(req,res)=>{
    try{
        const {id}=req.params
        await City.findByIdAndDelete(id)
        res.status(201).json({
            message: "City delete",
        })
        
    }catch (error){
        res.status(500).json({message:error.mensage})
    }
}
//Actualizar una ciudad
const updateCity= async  (req,res) => {
    try{
        let data= {
            ciudad: req.body.ciudad,
            pais:req.body.pais,
            imagen: req.body.imagen
        }

        const{id} =req.params
        await City.findByIdAndUpdate(id,data)

        res.status(201),json({
            message:"Update city",
            data
        })
    

        }catch(error){
            res.status(500).json({mseeage:error.nessage})
        }
    }

    const addCollectionCities=async (req,res)=>{
        try{
          

        let allCities = await City.insertMany(req.body)
         res.status(200).json({
            message:"All Cities has ben successfully",
            allCities
         })
         
        } catch (error) {
            res.status(500).json({message:error.message })
        }
    }




module.exports={addCity,updateCity,deleteCity,getCities,getCity,addCollectionCities}