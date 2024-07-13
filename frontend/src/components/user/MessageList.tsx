import React ,{useState,useEffect} from'react'

type Message={
    id: number,
    profileName: string,
    lastMessage: string
}

const MessageList = () => {

    const [messages,setMessages]=useState<Message[]>([])
  return (
    <>
     <div className="w-1/4 h-screen flex flex-col bg-gray-800 border-r border-gray-700">
        <h2 className="text-xl font-bold p-4">Messages</h2>
        <div className="flex space-x-2 px-4 mb-4">
          <span className="bg-gray-700 rounded-full px-3 py-1 text-sm">connected</span>
          <span className="bg-gray-700 rounded-full px-3 py-1 text-sm">requested</span>
        </div>
        <div className="overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="flex items-center p-4 hover:bg-gray-700">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3">
                ID
              </div>
              <div>
                <div className="font-semibold">{message.profileName}</div>
                <div className="text-sm text-gray-400">{message.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
    </>
  )
}

export default MessageList