import React, { useState } from "react";
import MessageList from "./MessageList";
import ChatArea from "./ChatArea";
import Message from "../../pages/User/Message";

type Message = {
    id: number;
    profileName: string;
    lastMessage: string;
}

const ChatApp = () => {
    const [selectedUser, setSelectedUser] = useState<Message | null>(null)
    const handleSelectedUser = (user: Message) => {
        setSelectedUser(user)
    }
    return (
        <div className="flex">
            <MessageList onSelectUser={handleSelectedUser} />
            {selectedUser ? (
                <ChatArea selectedUser={selectedUser} />
            ) : (
                <div className="flex-1 h-screen flex items-center justify-center bg-gray-900 text-white">
                    Select user to chat
                </div >
            )
            }

        </div>
    )

}
export default ChatApp;