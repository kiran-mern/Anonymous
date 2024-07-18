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
                const response= await axios.post('',{
                    headers:{
                        authorization:`${token}`
                    }
                })
                const data=response .data.data
                setNotification(data)

            }
            catch(err){
                console.log(err,'error while all notifucatoin');
                

            }
        }
        fetchNotification()
    },[notification])
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