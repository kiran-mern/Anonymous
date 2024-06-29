import { Routes, Route } from 'react-router-dom'
import Signup from '../components/user/Signup'
import EmailSend from '../components/user/EmailSend'
import Login from '../components/common/login'

const userRouter = () => {
    return (
        <>
            <Routes>

                <Route path='/signup' element={<Signup />} />
                <Route path='/email' element={<EmailSend />} />
                <Route path='/login' element={<Login />} />



            </Routes>
        </>
    )
}

export default userRouter