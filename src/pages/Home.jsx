import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../msg";
import { ToastContainer } from "react-toastify";

function HomePage() {

    const [loggedInUser, setLoggedInUser] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))

    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        handleSuccess("User Loggedout")
        setTimeout(() => {
            navigate('/login')
        }, 1000)

    }
    
    const fetchProducts=async()=>{
        try{
            const URL="https://backend-auth-app-one.vercel.app/products";
            const response=  await fetch(URL,headers);
            const headers={
                headers:{
                    'Authorization': localStorage.getItem("token")
                }
            }
            const result=  await response.json();
            console.log(result);

        }catch(err){
            handleError(err)

        }
    }


    useEffect(()=>{
        fetchProducts()
    },[])

    return (
        <div>
             <h1>&#128536;</h1>
            <h1>Welcome:&#10084;&#65039; {loggedInUser}</h1>
            <br></br><br></br>
            <button onClick={handleLogout}>Logout</button>
            <ToastContainer />
        </div>
    )
}
export default HomePage;
