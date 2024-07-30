import React, { useEffect, useState, useRef, useCallback } from 'react'
import io, { Socket } from 'socket.io-client'
import { useModalStore } from '../../zustand/store'
import axios from 'axios'
import More from '../common/More'

type ChatMessage = {
  id: number,
  sender: string,
  content: string,
  isSent: boolean,
  type:'user'| 'group',
  timeStamp: string
}

const ChatArea = () => {
  const token = localStorage.getItem('user')

  const { chatMessages, addChatMessage, setChatMessages,selectedUser,connectedGroups } = useModalStore();
  const [inputMessage, setInputMessage] = useState('')
  const [isOnline, setIsOnline] = useState(false)
  const [isGroup,setIsGroup]=useState(selectedUser?.type === 'group');
  const [isTyping, setIsTyping] = useState(false)
  const socketRef = useRef<Socket | null>(null)
  // const userId=  selectedUser ? selectedUser.receiverId.toString(): '1';
  // const receiverId =isGroup? selectedUser?.groupId: selectedUser?.userId.toString() || '1';
  const type = isGroup ? 'group' : 'user'  
  console.log(selectedUser);
  console.log(type,'typr');
  
  
  const userId= selectedUser ? selectedUser.receiverId.toString(): '0';
  // const receiverId = selectedUser ? selectedUser.userId.toString() : '1';
  // const receiverId = selectedUser ? selectedUser.userId?.toString() || selectedUser.groupId.toString() : '1';
const receiverId=isGroup?selectedUser?.groupId?.toString() :selectedUser?.userId?.toString() || '0';
console.log(userId,receiverId,'lstonme');
 useEffect(() => {
    setIsGroup(selectedUser?.type === 'group');
  }, [selectedUser]);

  // const groupId= isGroup? receiverId : null;
  const fetchMessages = async () => {
    if (selectedUser) {
      console.log('Fetching messages for:', selectedUser.userId);
      // const receiverId = selectedUser.userId.toString();
      try {
        const response = await axios.get(`http://localhost:3000/user/allMessage`, {
          headers: {
            authorization: `${token}`
          },
          params: { receiverId:isGroup?selectedUser.groupId:selectedUser.userId,type},
        })
        console.log(response.data,'cha varunda');
        setChatMessages(response.data.chat)
        
      }
      catch (err) {
        console.log(err, 'error when fetching messages');

      }
    }
  };

  const handleNewMessage = useCallback((message: ChatMessage) => {
    addChatMessage({
      ...message,
      isSent: message.sender === userId,
      timeStamp: message.timeStamp,
      type: message.type
    });
  }, [addChatMessage, userId]);

  const handleUserStatus = useCallback((data: { userId: string; status: string }) => {
    if (data.userId === receiverId) {
      setIsOnline(data.status === 'online');
    }
  }, [receiverId]);

  const handleTypingStatus = useCallback((data: { from: string; isTyping: boolean }) => {
    if (data.from === receiverId) {
      setIsTyping(data.isTyping);
    }
  }, [receiverId]);

  useEffect(() => {    
    fetchMessages()
  }, [selectedUser])

  useEffect(() => {
    socketRef.current = io('http://localhost:3000')

    socketRef.current.emit('userJoin', userId)
    socketRef.current.on('newMessage', handleNewMessage);
    socketRef.current.on('userStatus', handleUserStatus);
    socketRef.current.on('typingStatus', handleTypingStatus);
    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
    return () => {
      socketRef.current?.off('newMesage', handleNewMessage)
      socketRef.current?.off('userStatus', handleUserStatus)
      socketRef.current?.off('typingStatus', handleTypingStatus)
      socketRef.current?.disconnect()
    }
  }, [userId, handleNewMessage, handleUserStatus, handleTypingStatus])

  const sendMessage = async () => {
    if (inputMessage.trim() && socketRef.current) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        sender: userId,
        content: inputMessage,
        isSent: true,
        type,
        timeStamp: new Date().toISOString()

      }
      socketRef.current.emit('personal', { to: receiverId, message: inputMessage })
      try {
         await axios.post('http://localhost:3000/user/chat', {
          sender_id: userId,
          // receiver_id: receiverId,
          receiver_id: isGroup ? null : receiverId,
          group_id: isGroup ? receiverId : null,
          content: inputMessage,
          type,
        }, {
          headers: {
            authorization: `${token}`

          }
        })
        addChatMessage(newMessage);
        setInputMessage('')

      } catch (err) {
        console.log(err, 'error sendeing message');

      }

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
              {selectedUser?.id}
            </div>
            <div>
              <div className="font-semibold text-white"> {selectedUser?.profileName}</div>
              <div className="text-sm text-gray-400 mt-1">
                {isOnline ? 'Online' : 'Offline'}
              </div>
              <button className="text-sm text-gray-400 mt-1">View profile</button>
            </div>
          </div>
          <More isGroup={ isGroup} receiverId={receiverId}/>
          {/* <button className="text-2xl text-white"> ⋯ </button> */}
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 ${msg.isSent ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block p-2 rounded-lg  max-w-xs break-words  ${msg.isSent ? 'bg-blue-500' : 'bg-gray-700'
                  }`}
              >
                {msg.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.timeStamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isTyping && <div className="text-sm text-gray-400">Typing...</div>}
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