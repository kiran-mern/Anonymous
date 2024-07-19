const {fetchRecentLikes,fetchRecentComments,fetchRecentConnection, fetchAcceptedConnection} =require ('../helpers/notificationHelper')
module.exports={
    getNotification:async(userId)=>{
        try{
            const[likes,comments,connections,acceptedConnections]= await Promise.all([
                fetchRecentLikes(userId),
                fetchRecentComments(userId),
                fetchRecentConnection(userId),
                fetchAcceptedConnection(userId)
            ])

             
            const notifications=[]
            likes.forEach(like=>{
                notifications.push({
                    type:'likes',
                    user:like.User.name,
                    messages:`Your Posts was liked by user ${like.User.name}`,
                    createdAt:like.createdAt
                })
            })
            comments.forEach(comment=>{
                notifications.push({
                    type:'comments',
                    user:comment.user,
                    content:comment.content,
                    message: comment.message,
                    createdAt: comment.createdAt
                })
            })
            connections.forEach(connect=>{
                notifications.push({
                    type:'connections',
                    user:connect.Sender.name,
                
                    userId:connect.Sender.user_id,
                    message:`a new connection request by user ${connect.Sender.name}`,
                    createdAt: connect.createdAt

                })

            })
            acceptedConnections.forEach(connection => {
                notifications.push({
                    type: 'acceptedConnections',
                    message: `Your connection request to user ${connection.Receiver.name} was accepted`,
                    createdAt: connection.updatedAt // Use updatedAt to get the time of acceptance
                });
            });

              // Sort notifications by time
        notifications.sort((a, b) => b.createdAt - a.createdAt);

        return notifications;

        }catch(err){
            console.log(err,'error fetching notification');
            return [];

        }

    }
}