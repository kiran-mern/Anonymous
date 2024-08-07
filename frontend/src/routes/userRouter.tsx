import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from '../components/user/Signup'
import EmailSend from '../components/user/EmailSend'
import Login from '../components/common/login'
import Home from '../pages/User/Home'
import AvailableGroup from '../pages/User/AvailableGroup'
import Modal from '../components/user/CreatePost'
import Deactivate from '../components/user/DeactivateModal'
import Message from '../pages/User/Message'
import FindConnection from '../pages/User/FindConnection'
import Notification from '../components/user/Notification'
import GroupDetails from '../pages/User/ViewGroup'
import Profile from '../pages/User/Profile'
const userRouter = () => {
    return (
        <>
            <Routes>

                <Route path='/signup' element={<Signup />} />
                <Route path='/email' element={<EmailSend />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/allGroup' element={<AvailableGroup/>}/>
                <Route path='/message' element={<Message/>}/>
                <Route path='/find' element={<FindConnection/>} />
                <Route path='/notification' element={<Notification/>}/>
                <Route path='/groupMembers/:groupId' element={<GroupDetails/>}/>
                <Route path='/userProfile/:userId' element={<Profile/>} />
                



            </Routes>
            <Modal/>
            <Deactivate/>
        </>
    )
}

export default userRouter