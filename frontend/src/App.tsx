import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserProvider from './routes/userRouter'
// import AdminRouter from './routes/adminRouter'
import './App.css'

const App=()=> {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route  path={'/*'}  element={<UserProvider/>} />
          {/* <Route path={'/admin/*'} element={<AdminRouter />} /> */}
          <Route />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
