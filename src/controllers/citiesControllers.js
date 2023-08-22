const City= require("../model/City")


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


const getCities =async (req,res) =>{
    try{
        let cities=await City.find()
        res.json({cities})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const getCity= async (req,res)=>{
    try{
        const{id}=req.params
        const city= await City.findById(id)
        res.json({city})
    
    }catch (error) {
        res.status(500).json({message:error.message})
    }
}

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

const updateCity= async  (req,res) => {
    try{
        let data= {
            nombre: req.body.name,
            pais:req.body.country,
            foto: req.body.photo
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

    const addAllCities=async (req,res)=>{
        try{
            let allCities= [
                
                    
    {
        
        "ciudad": "Osaka",
        "pais": "Japon",
        "imagen": "public/Osaka Japon.jpg",
        "url": ""
      },
      {
        
        "ciudad": "Queenstown",
        "pais": "Nueva Zelanda",
        "imagen": "/public/queenstown-nueva-zelanda.jpg",
        "url": ""
      },
      {
       
        "ciudad": "Cartagena",
        "pais": "Colombia",
        "imagen": "public/cartagena-colombia-1.jpg",
        "url": ""
      },
      {
  
        "ciudad": "Ciudad del Cabo",
        "pais": "Sudafrica",
        "imagen": "public/ciudad-del-cabo-sudafrica.jpg",
        "url": ""
      },
      {
     
        "ciudad": "Delhi",
        "pais": "India",
        "imagen": "public/Delhi india.jpg",
        "url": ""
      },
      {
      
        "ciudad": "El Cairo",
        "pais": "Egipto",
        "imagen": "public/EL cairo Egipto.jpg",
        "url": ""
      },
      {
      
        "ciudad": "San Petesburgo",
        "pais": "Rusia",
        "imagen": "public/san-petersburgo-rusia.jpg",
        "url": ""
      },
      {
      
        "ciudad": "Shangai",
        "pais": "China",
        "imagen": "public/Shangai China.jpg",
        "url": ""
      },
      {
      
        "ciudad": "Sidney",
        "pais": "Australia",
        "imagen": "public/sidney-australia.jpg",
        "url": ""
      },
      {
       
        "ciudad": "Amsterdam",
        "pais": "Paises Bajos",
        "imagen": "public/amsterdam-paises-bajos-1.jpg",
        "url": ""
      },
      {
        
        "ciudad": "Italia",
        "pais": "Venecia",
        "imagen": "public/Venecia Italia.jpg",
        "url": ""
      },
      {
        
        "ciudad": "Lisboa",
        "pais": "Portugal",
        "imagen": "public/lisboa-portugal.jpg",
        "url": ""
      }
                
            ]
         await City.insertMany(allCities)
         res.status(200).json({
            message:"All Cities has ben successfully",
            allCities
         })
         
        } catch (error) {
            res.status(500).json({message:error.message })
        }
    }




module.exports={addCity,updateCity,deleteCity,getCities,getCity,addAllCities}