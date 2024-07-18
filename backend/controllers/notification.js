const notHelper= require('../helpers/notificationHelper')
module.exports={
    allNotification:async(req,res)=>{
        try{
            const userId= req.user.user_id
            const notification= await notHelper(userId)
            return res.status(200).json({message:'all available notifications'})

        }
        catch(err){
            console.log(err,'error on feching notifications');

        }
       

    }
}