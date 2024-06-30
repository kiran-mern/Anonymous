import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
const adminRouter = () => {
    return (
        <>
            <Routes>

                <Route path ='/dash' element={<Sidebar/> } />
            </Routes>
        </>
    )
}

export default adminRouter