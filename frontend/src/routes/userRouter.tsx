import { Routes, Route } from 'react-router-dom'
import Signup from '../components/user/Signup'
import EmailSend from '../components/user/EmailSend'

const userRouter = () => {
    return (
        <>
            <Routes>

                <Route path='/signup' element= {<Signup />} />
                <Route path= '/email' element={ <EmailSend />} />
            </Routes>
        </>
    )
}

export default userRouter