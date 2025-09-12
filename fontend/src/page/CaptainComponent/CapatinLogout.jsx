import axios from 'axios'
import React from 'react'
import { UseContext } from '../../contextApi/context';

 function CaptainLogout() {

    const token = localStorage.getItem("captainToken");
     const {navigate} = UseContext();

      axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout` , {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status === 200) {
            localStorage.removeItem("captainToken");
            navigate("/captain-login");
            console.log("worked logout");
            
        }
    }).catch((err) => {
        console.log(err);
        
    }) ;

    return (
        <>
          <div>
            <h1>Logout Page</h1>
          </div>
        </>
    )
}

export default CaptainLogout