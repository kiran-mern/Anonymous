const User=require('../models/Users')

module.exports={
    signup:async(req,res)=>{
        if(!req.body.email || !req.body.name || !req.body.password){
            return res.status(400).json({error:'Missing required fields'})
        }

        const userData={
            email:req.body.email,
            name: req.body.name,
            password: req.body.password,
            isActive:true

        }
        try{
            const existUser=await User.findOne({where:{email:userData.email}})
            if(existUser){
                return res.status(400).json({error:'User already exist'})
            }else{
                
            }

        }catch{

        }

    }
}