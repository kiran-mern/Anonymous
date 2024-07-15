import React,{useEffect,useState,useRef} from 'react'
import io , {Socket} from 'socket.io-client'

type ChatMessage={
    id: number,
    sender:string,
    content:string,
    isSent: boolean,
    timestamp:string
}

const ChatArea = () => {

    const [chatMessages,setChatMessage]= useState<ChatMessage[]>([])
    const [inputMessage,setInputMessage]= useState('')
    const [isOnline,setIsOnline]= useState(false)
    const [isTyping,setIsTyping]= useState(false)
    const socketRef= useRef<Socket | null>(null)
    const userId='1'
    const receiverId='1'

    useEffect(()=>{
        socketRef.current=io('http://localhost:3000')

        socketRef.current.emit('userJoin',userId)
        socketRef.current.on('newMessage',(message:ChatMessage)=>{
            setChatMessage(prev=>[...prev,{
                ...message,
                isSent:message.sender===userId
            }])
        })
        socketRef.current.on('userStatus',({userId,status})=>{
            if(userId===receiverId){
                setIsOnline(status==='online')
            }
        })
        socketRef.current.on('typingStatus',({from,isTyping})=>{
            if(from===receiverId){
                setIsTyping(isTyping)
            }
        })

        return () => {
            socketRef.current?.off('newMesage')
            socketRef.current?.off('userStatus')
            socketRef.current?.off('typingStatus')
            socketRef.current?.disconnect()
        }
    },[])

    const sendMessage=()=>{
        if(inputMessage.trim()&& socketRef.current){
            const newMessage:ChatMessage={
                id: Date.now(),
                sender: userId,
                content: inputMessage,
                isSent: true,
                timestamp: new Date().toISOString()
                
            }
            socketRef.current.emit('personal',{to:receiverId,message:inputMessage})
            setChatMessage(prev=>[...prev,newMessage])
            setInputMessage('')
        }
    }
    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value)
        socketRef.current?.emit('typing', { to: receiverId, isTyping: e.target.value.length > 0 })
    }

  return (
        <>
        <div className="h-screen flex-grow flex flex-col bg-gray-900">
        <header className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
              ID
            </div>
            <div>
              <div className="font-semibold">Profile_name</div>
              <div className="text-sm text-gray-400 mt-1">
                            {isOnline ? 'Online' : 'Offline'}
                </div>
              <button className="text-sm text-gray-400 mt-1">View profile</button>
            </div>
          </div>
          <button className="text-2xl">⋯</button>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 ${msg.isSent ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.isSent ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              >
                {msg.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
            </div>
          ))}
        </div>
        <div className="p-4">
          <div className="flex items-center bg-gray-800 rounded-full p-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-white" 
              value={inputMessage}
              onChange={handleTyping}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              
            />
            <button className="bg-blue-500 text-white rounded-full px-4 py-2 ml-2" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatArea