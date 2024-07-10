import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Like from './LikePost'
type Post={
  post_id: number,
  user_id:string,
  content: string,
  likes:number,
  comments:number
  
}
const Post = () => {
  const token= localStorage.getItem('user')

  const likeUpdate=(post_id:number,newLikes:number)=>{
    setPosts(posts.map(post=>
      post.post_id===post_id?{...post,likes:newLikes}:post
    ));

  }
  
  const[posts,setPosts]=useState<Post[]>([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try{

        const response= await axios.get('http://localhost:3000/user/home',{
          headers:{
            authorization: `${token}`
          }
        })
        console.log(response,'res');
        setPosts(response.data.data)
        
        

      }catch(error){
        console.log('error while fetching data ',error);
        
        
      }
    }
    fetchData();
    
  },[token])


  return (
    <div>
    {posts.map((post)=>(
      
       <div key={post.post_id} className="bg-black text-white p-4 mb-4 border-b border-gray-600 ">
       <div className="flex items-center mb-2">
         <div className="w-10 h-10 bg-yellow-500 rounded-full mr-4"></div>
         <h2 className="font-bold">{post.user_id}</h2>
         <button className="ml-16 bg-gray-700 px-4 py-1 rounded">Connect</button>
       </div>
       <p className="mb-2">
        {post.content}
       </p>
       <div className="flex">
         {/* <span className="mr-4">{like[post.id] || 0} likes</span> */}
         <Like post_id={post.post_id} likes={post.likes} onUpdateLike={likeUpdate} />
         <span>{post.comments} comments</span>
       </div>
     </div>

    ))}

   
   
     </div>
  );
};

export default Post;
