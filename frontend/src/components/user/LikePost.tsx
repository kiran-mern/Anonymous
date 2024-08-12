import React, { useState ,useEffect} from 'react'
import axios from 'axios'


type LikeButton={
    post_id: number,
    likes: number,
    onUpdateLike:(post_id:number,newLikes:number)=>void
}

const LikePost:React.FC<LikeButton> = ({post_id,likes=0,onUpdateLike}) => {

    console.log(likes);
    const [useLike,setUseLike]= useState(likes)
    useEffect(() => {
        console.log('likes rooops updated',likes);
        
        setUseLike(likes);
       
    }, [likes]);

    const token= localStorage.getItem('user')
    const handleLike=async()=>{
        try{
            const response= await axios.post('http://localhost:3000/user/likes',{post_id:post_id},{
                headers:{
                    authorization:`${token}`
                }
            })
            const newLike=response.data.likeCount
            console.log(newLike,'1');
            
            setUseLike(newLike)
            console.log(response,useLike,'ooo');            
            onUpdateLike(post_id,newLike)

        }
        catch(err){
            console.log('error while like posts',err);
            

        }
    }
  return (
    // <div>LikePost</div>
    <button onClick={handleLike}>{useLike} Likes</button>
  )
}

export default LikePost