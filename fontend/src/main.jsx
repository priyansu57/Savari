import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { UserContext } from './contextApi/context.jsx'
import { CaptainContext } from './contextApi/captainContext.jsx'
import { SocketProvider } from './contextApi/Socket.context.jsx'


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <SocketProvider>
      <BrowserRouter>
          <UserContext>
            <CaptainContext>
                <App />
            </CaptainContext>
          </UserContext>
       </BrowserRouter>
    </SocketProvider>
  </StrictMode>,
)
