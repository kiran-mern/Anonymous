import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useModalStore } from '../../zustand/store';

type Message = {
  id: number,
  profileName: string,
  lastMessage: string,
  type: 'user' | 'group',
  userId?: number,
  groupId?: number
}



const MessageList = () => {

  const token = localStorage.getItem('user')
  const { connected, setConnected, requested, connectedGroups, setConnectedGroups, setRequested, setSelectedUser } = useModalStore()
  // const [connectedGroups,setConnectedGroups]=useState<Message[]>([])
  // const [connected,setConnected]=useState<Message[]>([])
  // const[requested,setRequested]=useState<Message[]>([])
  const [activeTab, setActiveTab] = useState<'connected' | 'requested'>('connected')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // const [messages,setMessages]=useState<Message[]>([])
  const messages = activeTab === 'connected' ? [...connected, ...connectedGroups] : requested

  useEffect(() => {
    // const fetchRequestedMessage=async()=>{
    //   setIsLoading(true)
    //   try{
    //     const response= await axios.get('http://localhost:3000/user/requested',{
    //     headers:{
    //       authorization:`${token}`
    //     }
    //   });
    //   console.log(response);

    //   const data=await response.data.requested
    //   setRequested(data)
    //   }
    //   catch(err){
    //     console.log(err,'not fetching requested');
    //   }
    // }
    const fetchConnectedMessage = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/connected', {
          headers: {
            authorization: `${token}`
          }
        });
        console.log(response);

        const { connectedUsers, connectedGroups } = await response.data
        setConnected(connectedUsers)
        setConnectedGroups(connectedGroups)
      }
      catch (err) {
        console.log(err, 'not fetching requested');
      }


    }
    fetchConnectedMessage()

    // fetchRequestedMessage()

  }, [activeTab, token, setConnected, setRequested])


  return (
    <>
      <div className="w-1/4 h-screen flex flex-col bg-gray-800 border-r border-gray-700">
        <h2 className="text-xl font-bold p-4">Messages</h2>
        <div className="flex space-x-2 px-4 mb-4">

          <button className={`rounded-full px-3 py-1 text-sm ${activeTab === 'connected' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('connected')}>
            Connected
          </button >
          <button className={`rounded-full px-3 py-1 text-sm ${activeTab === 'requested' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('requested')}>
            Requested

          </button>
        </div>
        <div className="overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="flex items-center p-4 hover:bg-gray-700" onClick={() => setSelectedUser(message)}>
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                ID
              </div>
              <div>
                <div className="font-semibold">{message.profileName}</div>
                <div className="text-sm text-gray-400">{message.lastMessage}</div>
              </div>
            </div>
          ))}
          {isLoading ? (
            <p></p>
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="flex items-center p-4 hover:bg-gray-700" onClick={() => setSelectedUser(message)}>
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                  ID
                </div>
                <div>
                  <div className="font-semibold">{message.profileName}</div>
                  <div className="text-sm text-gray-400">{message.lastMessage}</div>
                </div>
              </div>
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>

      </div>

    </>
  )
}

export default MessageList