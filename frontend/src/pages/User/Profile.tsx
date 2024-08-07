import UserProfile from "../../components/user/UserProfile"
import Leftbar from "../../components/user/Leftbar"

const Profile=()=>{
    return(
        <div className="flex">
            <Leftbar/>
            <UserProfile/>

        </div>
    )
}
export default Profile;