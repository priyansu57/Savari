import axios from 'axios'
import React from 'react'
import { UseContext } from '../../contextApi/context';

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
        <>
          <div>
            <h1>Logout Page</h1>
          </div>
        </>
    )
}

export default UserLogout

