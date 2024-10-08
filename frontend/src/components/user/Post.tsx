import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Like from './LikePost'
import {Comment,CommentModal} from './Comment'
import NoStyleComment from './NoStyleComment';
import { Link } from 'react-router-dom';
type Post={
  post_id: number,
  user_id:string,
  content: string,
  countLikes:number,
  countComment:number,
  comments:number
}
const Post = () => {
  const[posts,setPosts]=useState<Post[]>([]);
  const [modalOpen,setModalOpen]=useState(false)
  const [selectedPostId,setSelectedPostId]=useState<number| null>(null);
  const token= localStorage.getItem('user')


  const likeUpdate=(post_id:number,newLikes:number)=>{
    setPosts(posts.map(post=>
      post.post_id===post_id?{...post,countLikes:newLikes}:post
    ));

  }
  const commentUpdate=(post_id:number,commentCount:number)=>{

    setPosts(posts.map(post =>
      post.post_id === post_id ? { ...post, countComment: commentCount } : post
    ));
  }
 

  const openModal = (postId: number) => {
    setSelectedPostId(postId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPostId(null);
  };
  const fetchData=async()=>{
    try{

      const response= await axios.get('http://localhost:3000/user/home',{
        headers:{
          authorization: `${token}`
        }
      })
      console.log(response.data.data)
      setPosts(response.data.data)
     
      
      console.log(posts,'res');
      
      

    }catch(error){
      console.log('error while fetching data ',error);
      
      
    }
  }
  useEffect(()=>{
    fetchData();
    
  },[token])


  return (
    <div>
    {posts.map((post)=>(
      
       <div key={post.post_id} className="bg-black text-white p-4 mb-4 border-b border-gray-600 ">
       <div className="flex items-center mb-2">
        <Link className='flex' to={`/userProfile/${post.user_id}`}> 
        
         <div className="w-10 h-10 bg-yellow-500 rounded-full mr-4"></div>
         <h2 className="font-bold">{post.user_id}</h2>
        </Link>
         <button className="ml-16 bg-gray-700 px-4 py-1 rounded">Connect</button>
       </div>
       <p className="mb-2">
        {post.content}
       </p>

       <div className="flex">
         {/* <span className="mr-4">{like[post.id] || 0} likes</span> */}
         <span className='mr-4'> <Like post_id={post.post_id} likes={post.countLikes} onUpdateLike={likeUpdate} /></span>
        
         {/* <span>{post.comments} comments</span> */}
         <span> <Comment  post_id={post.post_id}  commentsCount={post.countComment}  openModal={() => openModal(post.post_id)}/></span>

       </div>
       {/* <input type='text' className=" w-full h-auto border-none bg-transparent outline-none placeholder-gray-500 resize-none overflow-hidden"
      placeholder="Add a comment..."/> */}
      <NoStyleComment/>
     </div>

    ))}
     {selectedPostId && (
        <CommentModal
          post_id={selectedPostId}
          isOpen={modalOpen}
          onClose={closeModal}
          postContent={posts.find(p => p.post_id === selectedPostId)?.content || ''}
          likes={posts.find(p => p.post_id === selectedPostId)?.countLikes || 0}
          commentsCount={posts.find(p => p.post_id === selectedPostId)?.countComment || 0}
          onUpdateCommentCount={commentUpdate}
        />
      )}

   
   
     </div>
  );
};

export default Post;
