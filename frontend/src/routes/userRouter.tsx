import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from '../components/user/Signup'
import EmailSend from '../components/user/EmailSend'
import Login from '../components/common/login'
import Home from '../pages/User/Home'
import AvailableGroup from '../pages/User/AvailableGroup'
import Modal from '../components/user/CreatePost'
import Deactivate from '../components/user/DeactivateModal'
const userRouter = () => {
    return (
        <>
            <Routes>

                <Route path='/signup' element={<Signup />} />
                <Route path='/email' element={<EmailSend />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/allGroup' element={<AvailableGroup/>}/>



            </Routes>
            <Modal/>
            <Deactivate/>
        </>
    )
}

export default userRouter