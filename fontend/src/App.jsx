import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route , Routes} from "react-router-dom"
import UserLogin from './page/UserComponent/userLogin'
import UserSignup from './page/UserComponent/userSignup'
import CaptainLogin from './page/CaptainComponent/captainLogin'
import CaptainSignup from "./page/CaptainComponent/captainSignup"
import { UseContext } from './contextApi/context'
import Start from './page/PageComponent/Start'
import Home from "./page/PageComponent/Home"
import UserProtectedWrapper from './page/UserComponent/UserProtectedWrapper'
import UserLogout from './page/UserComponent/UserLogout'
import CaptianHome from './page/CaptainComponent/CaptianHome'
import CaptainProtectWrapper from './page/CaptainComponent/CaptainProtectWrapper'
import Page from './page/PageComponent/Page'
import Ride from './component/Rider/Ride'
import CaptainLogout from './page/CaptainComponent/CapatinLogout'
import Captainriding from './component/DriverComponent/Captainriding'
import Error from './Error/Error'
import { ToastContainer , Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

       <ToastContainer position="top-right" autoClose={2000} theme="colored"  />
       <Routes>
           <Route path='/' element={<Page />} />
           <Route path='/login' element={<UserLogin />} />
           <Route path='/signup' element={<UserSignup />} />
           <Route path='/captain-login' element={<CaptainLogin />} />
           <Route path='/captain-logout' element={<CaptainLogout />} />
            <Route path='/captain-signup' element={<CaptainSignup />} />
              <Route path='/riding' element={<Ride />} />
              <Route path='/captain-riding' element={<Captainriding />} />
            <Route path="/home" element={<UserProtectedWrapper> <Home /> </UserProtectedWrapper> } />
            <Route path="/users/logout" element={<UserProtectedWrapper> <UserLogout /> </UserProtectedWrapper> } />
            <Route path='/captain-home' element={<CaptainProtectWrapper> <CaptianHome /> </CaptainProtectWrapper>} />
            <Route path='*' element={<Error />} />
       </Routes>
    </>
  )
}

export default App
