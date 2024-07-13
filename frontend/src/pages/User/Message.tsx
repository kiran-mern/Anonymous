import Leftbar from "../../components/user/Leftbar"
import MessageList from "../../components/user/MessageList"
import ChatArea from "../../components/user/ChatArea"
const Message = () => {
  return (
    <div className="flex">
        <Leftbar/>
        <MessageList/>
        <ChatArea/>

    </div>
  )
}

export default Message