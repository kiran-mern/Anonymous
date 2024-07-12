import React ,{useEffect,useState} from 'react'
import axios from 'axios'

type Comment={

    post_id:number,
    openModal:(postId:number)=>void

}
type CommentModalProps={
    post_id:number,
    isOpen:boolean,
    onClose:()=>void,
    postContent: string;
    likes: number;
    commentsCount: number;


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

const CommentModal:React.FC<CommentModalProps>=({post_id,isOpen,onClose, postContent, likes, commentsCount })=>{
    const [comment,setComment]=useState <CommentType[]>([])
    const [newComment,setNewComment]=useState('')
    // const [postContent,setPostContent]= useState('')
    const token= localStorage.getItem('user')
    useEffect(()=>{
        if(isOpen&& post_id){
            fetchComment(post_id)
            // fetchPostComment
        }
    },[isOpen,post_id])

    const fetchComment=async(postId:number)=>{
        try{
            const response= await axios.get(`http://localhost:3000/user/allComments`,{
                headers:{
                    authorization: `${token}`
                },
                params:{post_id:postId}
            })
            setComment(response.data.data)
        }
        catch(err){
            console.log('error while fetching comments',err);
            

        }
    }
   

    const handleAddComment=async()=>{
        try{
            await axios.post(`http://localhost:3000/user/comments`, {
                post_id,
                content: newComment
              }, {
                headers: {
                     authorization: `${token}` }
              });
            setNewComment('')
            fetchComment(post_id)

        }
        catch(err){
            console.log(err,'error adding comment ');
            

        }

    };
    if(!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                <span className="text-black font-bold">P</span>
              </div>
              <div>
                <h2 className="font-bold">profile_name</h2>
                <p className="text-sm">{postContent}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <button className="flex items-center mr-4">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  {/* Heart icon */}
                </svg>
                <span>{likes}</span>
              </button>
              <button className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  {/* Comment icon */}
                </svg>
                <span>{commentsCount}</span>
              </button>
            </div>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add comment"
              className="w-full bg-gray-800 rounded p-2 mb-4"
            />
            <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
              Add Comment
            </button>
            <p className="text-sm text-gray-400 mb-4">View comments</p>
            <div className="max-h-60 overflow-y-auto">
              {comment.map((comment) => (
                <div key={comment.id} className="mb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700 mr-2"></div>
                    <span className="font-bold">Profile_name</span>
                  </div>
                  <p className="text-sm mb-2">{comment.content}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <button className="mr-4">35 likes</button>
                    <button>20 replies</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={onClose} className="mt-4 text-gray-400">Close</button>
          </div>
        </div>
      );
    };

export  {Comment,CommentModal} ;