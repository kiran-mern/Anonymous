import React,{useEffect,useState} from 'react'
import axios from 'axios'
import UserProfile from '../common/UserProfile'
import { useModalStore } from '../../zustand/store'
import { useParams } from 'react-router-dom'

type Post={
    id:number,
    profileName:string,
    content:string,
    likes:number,
    comments:number
}

type UserData={
    name:string,
    connectionsCount:number,
    postsCount:number,
    posts:Post[],
    
}

const UserProfiles = () => {
    
    const [userData,setUserData]=useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { userId } = useParams<{ userId: string }>();
    console.log(userId,'iserId of friend');
    
//     const loggedUserId=useModalStore((state)=>state.userId)
// console.log(loggedUserId);
const loggedUserId= localStorage.getItem('userId')

    const token=localStorage.getItem('user')
    
    useEffect(()=>{
        const viewAccount=async()=>{
            try{
                const response=await axios.get('http://localhost:3000/user/viewPosts',{
                    headers:{
                        authorization:`${token}`
                    },
                    params:{receiverId:userId}
                    
                })
                console.log(response.data,'usesa profile data');

                const{viewPost,user,connectionCount}=response.data

                const formattedUseData:UserData={
                    name:user.name,
                    connectionsCount:connectionCount,
                    postsCount:viewPost.length,
                    posts:viewPost.map((post:any)=>({
                        id:post.id,
                        profileName:post.name,
                        content:post.content,
                        likes:post.countLike|| 0,
                        comments:post.comments_count || 0,
                    }))
                }
                console.log(formattedUseData,'formattedUserData');
                
                setUserData(formattedUseData)
                setLoading(false)
            }catch(err){
                console.error('Error fetching user data:', err);
        setError('Failed to load user profile');
        setLoading(false);
            }
        };
        viewAccount();
        
    },[userId,token])

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
    
      if (!userData) {
        return <div>No user data available</div>;
      }
      const isMyProfile = loggedUserId==userId ;
  return (
    <UserProfile name={userData.name} connectionsCount={isMyProfile?userData.connectionsCount:0}
     postsCount={userData.postsCount} posts={userData.posts}  />
)
}

export default UserProfiles