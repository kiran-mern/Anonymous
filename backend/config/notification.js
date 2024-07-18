module.exports={
    getNotification:async(userId)=>{
        try{
            const[likes,comments,connections]= await Promise.all([
                fetchRecentLikes(userId),
                fetchRecentComments(userId),
                fetchRecentConnections(userId)
            ])
            const notifications=[]
            likes.forEach(like=>{
                notifications.push({
                    type:'likes',
                    messages:`Your Posts was liked by user ${like.user_id}`,
                    createdAt:like.createdAt
                })
            })
            comments.foreach(comment=>{
                notifications.push({
                    type:'comments',
                    message: `Post was commented on by user ${comment.user_id}`,
                    createdAt: comment.createdAt
                })
            })
            connections.foreach(connect=>{
                notifications.push({
                    type:'connection',
                    message:`a new connection request by user ${connect.sender_id}`,
                    createdAt: connect.createdAt

                })

            })

              // Sort notifications by time
        notifications.sort((a, b) => b.createdAt - a.createdAt);

        return notifications;

        }catch(err){
            console.log(err,'error fetching notification');
            return [];

        }

    }
}