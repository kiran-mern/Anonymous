import React,{useEffect,useState} from 'react'

type ChatMessage={
    id: number,
    sender:string,
    content:string,
    isSent: boolean
}

const ChatArea = () => {

    const [chatMessages,setChatMessage]= useState<ChatMessage[]>([])
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
            </div>
          ))}
        </div>
        <div className="p-4">
          <div className="flex items-center bg-gray-800 rounded-full p-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none"
            />
            <button className="bg-blue-500 text-white rounded-full px-4 py-2 ml-2">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatArea