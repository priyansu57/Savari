// import React, { Children, useEffect, useState } from 'react'
// import { UseContext } from '../../contextApi/context'
// import axios from 'axios';

// function UserProtectedWrapper({children}) {

//     const {navigate , setUser , user} = UseContext();
//     const token = localStorage.getItem("userToken");
//     const [isLoading , setLoading]=useState(true);
//     console.log("token : " + token);
    

//      useEffect(() => {
//         if (!token) {
//         navigate("/login");
//     }
    
//     axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile` , {
//         headers:{
//             Authorization:`Bearer ${token}`
//         }
//      }).then((res) => {
//         if (res.status === 200) {
//             setUser(res.data.user);
//             setLoading(false);
//             // console.log(res);
            
//         }
//      }).catch((err) => {
//         console.log(err);
//         localStorage.removeItem("userToken");
//         navigate("/login");
//      });


//      },[token , setUser , user]);

     
//      if (isLoading) {
//         return <h1>Loading</h1>
//      }

//     return (
//         <>
//          {children}
//         </>
//     )
// }

// export default UserProtectedWrapper


import React, { useEffect, useState } from "react";
import { UseContext } from "../../contextApi/context";
import axios from "axios";

function UserProtectedWrapper({ children }) {
  const { navigate, setUser } = UseContext();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    // If no token, redirect immediately
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          setUser(res.data.user);
        } else {
          localStorage.removeItem("userToken");
          navigate("/login");
        }
      } catch (err) {
        console.error("Profile fetch failed:", err);
        localStorage.removeItem("userToken");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, setUser]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-black">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
        <p className="text-white font-medium text-lg tracking-wide">
          Loading, please wait...
        </p>
      </div>
    </div>
  }

  return <>{children}</>;
}

export default UserProtectedWrapper;

