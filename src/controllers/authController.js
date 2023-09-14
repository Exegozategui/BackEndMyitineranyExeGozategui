const User = require('../model/User')

/* sign Up */
const registerUser = async (req, res)=>{

     const userPayload = req.body 
     const userExists = await User.findOne({ email: userPayload.email})   
    
    try {
            if (userExists){
               return res.status(403).json({
                    message: "This user already exists"
                })
            }


            const newUser = await User.create(userPayload)


            
            res.status(200).json(
             {
                 "message": "user registered",
                 "user": newUser
             }
       )
            
        } catch (error) {
            res.status(400).json({message: error.message})
        }

}
/* login  */
const userLogin =  async (req, res )=>{

    try {
        res.status(200).json({
            message: "Succesfully logged in",
            token: req.token,
            user: {
                email: req.user.email,
                id: req.user._id,
                urlimage: req.user.urlimage,
                firstName: req.user.firstName

            }
        })

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
/* login with jwt and passport controller */
const authenticated = async (req, res)=>{
     try {
        res.status(200).json({
            message: "Succesfully authenticated",
            token: req.token,
            user: {
                email: req.user.email,
                id: req.user._id,
               

            }
        })

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const userLogout = async (req, res)=>{

    try {
            res.status(200).json({message: 'logged out', token: req.token})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}


module.exports= {registerUser, userLogin, authenticated, userLogout}