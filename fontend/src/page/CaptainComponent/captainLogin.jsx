import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import captainLogo from "../../assets/test.png";
import captainLoginBanner from "../../assets/captain_Login_banner.png";
import axios from 'axios';
import { UseCaptaionContext } from '../../contextApi/captainContext';

// C:\Users\priya\Desktop\Uber\fontend\src\assets\Savari_captain_logo.png

function CaptainLogin() {
    const [email , setEmail]= useState("");
    const [password , setPassword]= useState("");
 
    const {captain , setCaptain , navigate } = UseCaptaionContext();


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Email was : " + email + "\n" + "Password :" + password);
        setEmail("");
        setPassword("");

        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login` , {email , password} , {withCredentials : true} );

        if ( res.status === 200) {
            const data = res.data;
            console.log(" Data form lgcp :" , data);
            
             setCaptain(data.captain);
             localStorage.setItem("captainToken" , data.captaintoken);
             navigate("/captain-home")
        }
        
    };
    return (
        <>
         <div className='h-2 w-45 ml-4 mt-[-40px] mb-8' >
            <img src={captainLogo} alt="Savari" className='text-black' />
        </div>
        <div className="flex flex-col justify-center items-center ">
            
            <div  className="flex h-[700px] w-full  ">
            
                <div  className="w-full flex flex-col items-center  justify-center">

                    <form  className="md:w-96 w-80 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                        <h2  className="text-3xl text-gray-900 font-medium">Sign in Captain</h2>
                        <p  className="text-sm text-gray-500/90 mt-3">Welcome back captain! Please sign in to continue</p>

                        <button type="button"  className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full">
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
                        </button>

                        <div  className="flex items-center gap-4 w-full my-5">
                            <div  className="w-full h-px bg-gray-300/90"></div>
                            <p  className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
                            <div  className="w-full h-px bg-gray-300/90"></div>
                        </div>

                        <div  className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
                            </svg>
                            <input type="email" placeholder="Email id"  className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required value={email} onChange={(e) => setEmail(e.target.value)} />                 
                        </div>

                        <div  className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                            </svg>
                            <input type="password" placeholder="Password"  className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div  className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                            <div  className="flex items-center gap-2">
                                <input  className="h-5" type="checkbox" id="checkbox" />
                                <label  className="text-sm" htmlFor="checkbox">Remember me</label>
                            </div>
                            <a  className="text-sm underline" href="#">Forgot password?</a>
                        </div>

                        <button type="submit"  className="mt-8 w-full h-11 rounded-full text-white bg-black hover:opacity-90 transition-opacity">
                            Login
                        </button>
                        <p  className="text-gray-500/90 text-sm mt-4">Don’t have an account? <Link  className="text-indigo-400 hover:underline" to={"/captain-signup"} >Sign up as Captain</Link></p>
                    </form>
                </div>

                <div  className="w-full hidden md:flex  items-center rounded-2xl ">
                    <img  className="h-96 w-[80%]  rounded-2xl" src={captainLoginBanner} alt="leftSideImage"  />
                </div>

            </div>
                    <button type="submit" onClick={() => navigate("/login")} className=" w-[50%] md:w-2xl h-11 rounded-full text-white bg-black hover:opacity-90 transition-opacity">
                       User  Login
                        </button>
            </div>
        </>
    )
}

export default CaptainLogin
