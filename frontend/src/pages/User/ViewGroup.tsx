import Leftbar from "../../components/user/Leftbar"
import MessageList from "../../components/user/MessageList"
import GroupDetailsView from "../../components/user/ViewGroup"
const ViewGroup = () => {
  return (
    < div className="flex"> 
    <Leftbar/>
    <MessageList/>
    <GroupDetailsView/>
    </div>
  )
}

export default ViewGroup