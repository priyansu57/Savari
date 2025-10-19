import axios from 'axios'
import React from 'react'
import { UseContext } from '../../contextApi/context';
import { motion } from "framer-motion";

 function UserLogout() {

    const token = localStorage.getItem("userToken");
     const {navigate} = UseContext();

      axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout` , {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status === 200) {
            localStorage.removeItem("userToken");
            navigate("/login");
            console.log("worked logout");
            
        }
    }).catch((err) => {
        console.log(err);
        
    }) ;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
            {/* Animated check icon */}
            <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex flex-col items-center"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 text-black mb-4 border-4 border-black rounded-full p-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
            >
                <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
                />
            </svg>

            {/* Text */}
            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-semibold tracking-wide"
            >
                Logging you out...
            </motion.h1>

            <p className="text-gray-600 mt-2 text-sm">
                You’ll be redirected to the login page shortly.
            </p>

            {/* Subtle loader animation */}
            <div className="mt-6 w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </motion.div>
        </div>
);

}

export default UserLogout

