import React,{useState,useEffect} from 'react'
import Notification from '../common/Notification'
import {NotificationItem} from '../common/Notification'
import axios from 'axios'
import Leftbar from './Leftbar'
import FindAnonymous from './FindAnonymous'

const NotificationList:React.FC = () => {
    const token= localStorage.getItem('user')
    const [notification,setNotification]=useState<NotificationItem[]>([])

    useEffect(()=>{
        const fetchNotification=async()=>{
            try{
                
                const response= await axios.get('http://localhost:3000/user/notification',{
                    headers:{
                        authorization:`${token}`
                    }
                })
                const data = response.data.notification;
                const mappedNotifications = data.map((item: any, index: number) => ({
                    id: index, // Assuming no id is provided by backend
                    type: item.type,
                    personName: item.type === 'likes' ? item.user : item.type === 'comments' ? item.user : item.type==='connections'? item.user :item.type==='accepted'? item.user: '',
                    content: item.type === 'comments' ? item.content : '',
                    message: item.message,
                    createdAt: item.createdAt
                }));

                console.log(mappedNotifications, 'aaako');
                setNotification(mappedNotifications);

            }
            catch(err){
                console.log(err,'error while all notifucatoin');
                

            }
        }
        fetchNotification()
    },[])
    return (
        <div className="flex">
          {/* Your sidebar component here */}
          <Leftbar/>
          <Notification notification={notification} />
          <FindAnonymous/>
          {/* Your "Find a new anonymous" component here */}
        </div>
      );
}

export default NotificationList