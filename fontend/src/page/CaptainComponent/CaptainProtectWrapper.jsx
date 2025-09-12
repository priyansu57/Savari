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
    return <h1>Loading...</h1>; // replace with skeleton loader later
  }

  return <>{children}</>;
}

export default CaptainProtectWrapper;
