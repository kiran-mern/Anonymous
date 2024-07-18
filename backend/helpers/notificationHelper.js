const Comments = require("../models/Comments");
const Like = require("../models/Likes")

module.exports={
    fetchRecentLikes:async(userId)=>{
        try{
            const likes= await Like.findAll({
                includes:{
                    model:'UserPost',
                    where:{user_id:userId}
                },
                order: [['createdAt', 'DESC']],
                limit: 10
            })
            return likes

        }catch(err){
            console.log(err,'error on likes finding');

        }
    },
    fetchRecentComments:async(userId)=>{
    try{
        const comment= await Comments.findAll({
            include: {
                model: UserPost,
                where: { user_id: userId }
            },
            order: [['createdAt', 'DESC']],
            limit: 10
        })

    }
    catch(err){

    }

    }
}