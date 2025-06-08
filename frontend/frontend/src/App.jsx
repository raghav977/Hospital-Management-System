import { useState } from 'react'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import PatientRegister from './components/PatientRegister'
import SignIn from './components/SignIn'
import Home from './components/Home'
import AdminDashboard from './components/AdminDashboard'
import DoctorSignin from './components/DoctorSignin'
import DoctorDashboard from './components/DoctorDashboard'
import About from './components/About'
import Contact from './components/Contact'
import Blog from './components/Blog'
import Alldoctors from './components/Alldoctors'
import ProtecterRoutes from './components/ProtecterRoutes'
import AdminLogin from './components/Adminlogin'
import { ChatProvider } from './components/ChatContext'
import ChatPage from './components/ChatPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
  
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/unauthorized" element={<h1>You are not authorized to access this link</h1>} />
      <Route path="/" element={<PatientRegister />} />
      <Route path="/signin" element={<SignIn />} />
      
      <Route path="/doctor-login" element={<DoctorSignin />} />

      <Route element={<ProtecterRoutes allowed={['patient', 'admin', 'doctor']} />}>
        
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-doctor" element={<Alldoctors />} />
      </Route>

      <Route element={<ProtecterRoutes allowed={['admin']} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtecterRoutes allowed={['doctor']} />}>
        <Route path="/dashboard" element={<DoctorDashboard />} />
      </Route>
    </Routes>
</BrowserRouter>

    </>
  )
}

export default App
