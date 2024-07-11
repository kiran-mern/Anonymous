// import React,{useState} from 'react'
// import axios from 'axios'
// type Comment={
//     post_id:string,
//     user_id:string,
//     isOpen: boolean,
//     isClose:()=> void,
//     post:(comment:string[],members:string) => void
// }
// const Comment :React.FC<Comment> =({post_id,isOpen}) => {
//     const [comment,setComment]= useState<Comment[]>([])
//     const[members,setMembers]=useState('')
//     const token= localStorage.getItem('user')

//     const fetchComment=async()=>{
//         try{
//             const response= await axios.get(`http://localhost:3000/user/allComments/`,{
//                 headers:{
//                     authorization:`${token}`
//                 }
//             })
//             console.log(response);
//             setComment(response.data.data)
            

//         }catch(err){
//             console.log('error on view comments',err);
            

//         }

//     }

  
//   return (
//     <div>
//         <button onClick={fetchComment}> Comments</button>
        

//     </div>
//   )
// }

// export default Comment
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// type CommentProps = {
//   post_id: number;
//   user_id: number;
//   isOpen: boolean;
//   isClose: () => void;
//   post: (comment: string, members: string) => void;
// };

// type CommentType = {
//   id: number;
//   user_id: number;
//   content: string;
//   likes: number;
//   replies: number;
// };

// const CommentModal: React.FC<CommentProps> = ({ post_id, isOpen, isClose, post }) => {
//   const [comments, setComments] = useState<CommentType[]>([]);
//   const [newComment, setNewComment] = useState('');
//   const [postContent, setPostContent] = useState('');
//   const token = localStorage.getItem('user');

//   useEffect(() => {
//     if (isOpen) {
//       fetchComments();
//       fetchPostContent();
//     }
//   }, [isOpen]);

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/user/allComments/${post_id}`, {
//         headers: {
//           authorization: `${token}`
//         }
//       });
//       setComments(response.data.data);
//     } catch (err) {
//       console.log('Error fetching comments:', err);
//     }
//   };

//   const fetchPostContent = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/user/post/${post_id}`, {
//         headers: {
//           authorization: `${token}`
//         }
//       });
//       setPostContent(response.data.content);
//     } catch (err) {
//       console.log('Error fetching post content:', err);
//     }
//   };

//   const handleAddComment = async () => {
//     try {
//       await post(newComment, '');
//       setNewComment('');
//       fetchComments();
//     } catch (err) {
//       console.log('Error adding comment:', err);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-gray-900 text-white p-4 rounded-lg max-w-lg w-full">
//         <div className="flex items-center mb-4">
//           <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
//             <span className="text-black font-bold">P</span>
//           </div>
//           <div>
//             <h2 className="font-bold">profile_name</h2>
//             <p className="text-sm">{postContent}</p>
//           </div>
//         </div>
//         <div className="flex items-center mb-4">
//           <button className="flex items-center mr-4">
//             <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               {/* Heart icon */}
//             </svg>
//             <span>35</span>
//           </button>
//           <button className="flex items-center">
//             <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               {/* Comment icon */}
//             </svg>
//             <span>{comments.length}</span>
//           </button>
//         </div>
//         <input
//           type="text"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Add comment"
//           className="w-full bg-gray-800 rounded p-2 mb-4"
//         />
//         <button 
//           onClick={handleAddComment}
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         >
//           Add Comment
//         </button>
//         <div className="max-h-60 overflow-y-auto">
//           {comments.map((comment) => (
//             <div key={comment.id} className="mb-4">
//               <div className="flex items-center mb-2">
//                 <div className="w-8 h-8 rounded-full bg-gray-700 mr-2"></div>
//                 <span className="font-bold">User_{comment.user_id}</span>
//               </div>
//               <p className="text-sm mb-2">{comment.content}</p>
//               <div className="flex items-center text-sm text-gray-400">
//                 <button className="mr-4">{comment.likes} likes</button>
//                 <button>{comment.replies} replies</button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button onClick={isClose} className="mt-4 text-gray-400">Close</button>
//       </div>
//     </div>
//   );
// };

// export default CommentModal;

import React ,{useEffect,useState} from 'react'
import axios from 'axios'

type Comment={

    post_id:number,
    openModal:(postId:number)=>void

}
type CommentModalProps={
    post_id:number,
    isOpen:boolean,
    onClose:()=>void


}
type CommentType={
    id:number,
    user_id: number,
    post_id:number,
    content:string
}

const Comment:React.FC<Comment> = ({post_id,openModal}) => {
  return (
    <button onClick={()=>openModal(post_id)} >
        Comments
    </button>
  )
}

const CommentModal:React.FC<CommentModalProps>=({post_id,isOpen,onClose})=>{
    const [comment,setComment]=useState <CommentType[]>([])
    const [newComment,setNewComment]=useState('')
    const [postContent,setPostContent]= useState('')
    const token= localStorage.getItem('user')
    useEffect(()=>{
        if(isOpen){
            fetchComment()
            fetchPostComment
        }
    },[isOpen])

    const fetchComment=async()=>{
        try{
            const response= await axios.get(`http://localhost:3000/user/allComments/${post_id}`,{
                headers:{
                    authorization: `${token}`
                }
            })
            setComment(response.data.data)
        }
        catch(err){
            console.log('error while fetching comments',err);
            

        }
    }
    const fetchPostComment=async()=>{
        try{
            const response= await axios.post(`http:localhost:3000/user/userPost/${post_id}`,{
                headers:{
                    authorization: `${token}`
                }
            })
            setComment(response.data.data)
          
        }
        catch(err){
            console.log(err,'error fetchg post comment');
            

        }

    }

    const handleAddComment=()=>{
        try{
            setNewComment('')
            fetchComment()

        }
        catch(err){
            console.log(err,'error adding comment ');
            

        }

    };
    if(!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 text-white p-4 rounded-lg max-w-lg w-full">
            {/* Modal content here, similar to the previous implementation */}
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                <span className="text-black font-bold">P</span>
              </div>
              <div>
                <h2 className="font-bold">profile_name</h2>
                <p className="text-sm">{postContent}</p>
              </div>
            </div>
            {/* Add comment input, comments list, etc. */}
            <button onClick={onClose} className="mt-4 text-gray-400">Close</button>
          </div>
        </div>
      );


}

export default Comment