import { Routes, Route } from 'react-router-dom'
import Signup from '../components/user/Signup'

const userRouter = () => {
    return (
        <>
            <Routes>

                <Route path='/signup' element= {<Signup />} />
            </Routes>
        </>
    )
}

export default userRouter