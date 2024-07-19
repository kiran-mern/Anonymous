const notify= require('../config/notification')
module.exports={
    allNotification:async(req,res)=>{
        try{
            const userId= req.user.user_id
            const notification= await notify.getNotification(userId)
            console.log(notification,'nooo');
            return res.status(200).json({message:'all available notifications',notification})

        }
        catch(err){
            console.log(err,'error on feching notifications');

        }
       

    }
}