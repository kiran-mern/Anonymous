import React, { useState } from 'react'
import axios from 'axios'

type LikeButton={
    post_id: number,
    likes: number,
    onUpdateLike:(post_id:number,newLikes:number)=>void
}

const LikePost:React.FC<LikeButton> = ({post_id,likes,onUpdateLike}) => {

    const [useLike,setUseLike]= useState(likes)

    const token= localStorage.getItem('user')
    const handleLike=async()=>{
        try{
            const response= await axios.post('http://localhost:3000/user/likes',{post_id:post_id},{
                headers:{
                    authorization:`${token}`
                }
            })
            const newLike=response.data.likeCount
            setUseLike(newLike)
            console.log(response,'ooo');
            
            onUpdateLike(post_id,response.data.likeCount)

        }
        catch(err){
            console.log('error while like posts',err);
            

        }
    }
  return (
    // <div>LikePost</div>
    <button onClick={handleLike}>{useLike|| 0} Likes</button>
  )
}

export default LikePost