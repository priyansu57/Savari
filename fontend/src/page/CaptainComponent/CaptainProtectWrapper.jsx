// import React, { useEffect, useState } from 'react'
// import { UseCaptaionContext } from '../../contextApi/captainContext';
// import axios from 'axios';

// function CaptainProtectWrapper({children}) {

//     const token = localStorage.getItem("captainToken");
//     const {captain , setCaptain , navigate} = UseCaptaionContext();
//      const [isLoading , setLoading]= useState(true);

//     useEffect(() => {
//         if (!token) {
//             navigate("/captain-login")
//         }

//          axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile` , {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }).then((res) => {
//         if (res.status === 200) {
//             setCaptain(res.data.captain);
//             setLoading(false);
//         }
//     }).catch((err) => {
//         console.log(err);
//         localStorage.removeItem("captainToken");
//         navigate("/captain-login")
//     });

//     },[captain]);

   


//     return (
//         <>
//          {children}
//         </>
//     )
// }

// export default CaptainProtectWrapper


import React, { useEffect, useState } from "react";
import { UseCaptaionContext } from "../../contextApi/captainContext";
import axios from "axios";

function CaptainProtectWrapper({ children }) {
  const { setCaptain, navigate } = UseCaptaionContext();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("captainToken");

    // If no token, redirect immediately
    if (!token) {
      navigate("/captain-login");
      return;
    }

    const fetchCaptainProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          setCaptain(res.data.captain);
        } else {
          localStorage.removeItem("captainToken");
          navigate("/captain-login");
        }
      } catch (err) {
        console.error("Captain profile fetch failed:", err);
        localStorage.removeItem("captainToken");
        navigate("/captain-login");
      } finally {
        setLoading(false);
      }
    };

    fetchCaptainProfile();
  }, [navigate, setCaptain]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        <p className="text-black font-medium text-lg tracking-wide">
          Loading, please wait...
        </p>
      </div>
    </div>;
  }

  return <>{children}</>;
}

export default CaptainProtectWrapper;
