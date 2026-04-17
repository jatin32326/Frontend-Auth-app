
import "./App.css"
import { Routes, Route,Navigate } from "react-router-dom"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"
import SignUp from "./pages/Signpage"
import { useState } from "react"
import RefreshHandler from "./pages/RefreshHandler"




function App() {
  const[isAuthenticated,setIsAuthenticated]=useState(false)

  const PrivateRoute=({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }

  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/'element={<Navigate to ='/login'/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup'element={<SignUp/>}/>
        <Route path='/home'element={<PrivateRoute element={<HomePage/>}/>}/>  
      </Routes>
    </>
  )
}

export default App
