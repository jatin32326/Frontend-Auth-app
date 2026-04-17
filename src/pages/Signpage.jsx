import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import{ToastContainer}from "react-toastify"
import { handleError, handleSuccess } from "../msg";

function SignUp(){
    let[SignupInfo,setSignupInfo]=useState({
        name:'',
        email:'',
        password:'',

    })
    const navigate=useNavigate();

    let handleChange=(e)=>{
        const{name,value}=e.target;
        console.log(name,value);
        const copySignupInfo = {...SignupInfo};
        copySignupInfo[name]=value;
        setSignupInfo(copySignupInfo)

    }
    const handleSignup=async(e)=>{
        e.preventDefault();
        const{name,email,password}=SignupInfo;
        if(!name||!email||!password){
            return handleError("name, email & password are required")
        }
        try{
            const url="https://backend-auth-app-one.vercel.app/auth/signup"
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(SignupInfo)
            });
            const result=await response.json();
            const {success,message}=result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                },1000)
            }else if(error){
                const details=error?.details[0].message;
                handleError(details);

            }else if(!success){
                handleError(message)
            }
            console.log(result);

        }catch(err){
            handleError(err);

        }

    }
    console.log("loginInfo ->",SignupInfo)
    return(
        <div className="container">
            <h1>Signup</h1>
           <form  onSubmit={handleSignup}>
           <div>
                <label htmlFor="name">Name</label>
                <input type="name"placeholder="Enter your name" name="name" autoFocus onChange={handleChange} value={SignupInfo.name}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email"placeholder="Enter your email"name="email" autoComplete="current-email" onChange={handleChange} value={SignupInfo.email}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password"placeholder="Enter your password"name="password" autoComplete="current-password" onChange={handleChange} value={SignupInfo.password}/>
            </div>
            <button>signup</button>
            <span>Already have an account?
                <Link to="/login">Login</Link>
            </span>
           </form>
           <ToastContainer/>
           
        </div>
    )
}
export default SignUp;
