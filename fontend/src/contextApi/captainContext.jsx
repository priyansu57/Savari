import { createContext, useContext, useState } from "react";
import React from 'react'
import { use } from "react";
import { useNavigate } from "react-router-dom";
const captainDatacontext = createContext();

function CaptainContext({children}) {
   
    const navigate = useNavigate();
    const [captain , setCaptain] = useState({});
    const [newRideData , setNewRideData] = useState({});

    //otp section
    // Otp for start section
    const [otp , setOtp]=useState("");


    const value = {captain , setCaptain ,setOtp ,otp  , navigate , newRideData , setNewRideData};
     
    return <captainDatacontext.Provider value={value}>{children}</captainDatacontext.Provider>
}

const UseCaptaionContext = () => {
    const data = useContext(captainDatacontext)
    return data
};

export { CaptainContext , captainDatacontext , UseCaptaionContext }
