
import React, { useContext, useState } from 'react'
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

 const UserDatacontext = createContext();

// provider
function UserContext({children}) {
    
    const navigate = useNavigate();
    const [user , setUser] = useState({
        email:"",
        fullname:{
            firstname:"",
            lastname:""
        }
    });

    const [selected, setSelected] = useState("For me");
    const [isnewRider , setIsnewRider] = useState(false);
    const [userRider , setUserRider] = useState(["For me" , "Other"]);
    const [pickup , setPickup] = useState("");
    const [dropoff , setDropoff] = useState(""); 
    
    //ConformRideDetail
    const [conformRidePanel , setConformRidePanel] = useState(false);
    const [rideVehiclOption , setRideVehicleOption] =useState({
      name :"Savari Go"
    });

     //user payment method
       const [paymentMethod, setPaymentMethod] = useState("Cash");

     //rideconform   
     const [rideConform , setrideConform]=useState(false);

     //looking for driver
     const [lookingForDriver , setlookingForDriver]=useState(false);

     // wait For Driver
      const [waitForDriver , setWaitForDriver]=useState(false);
     
      // fare value 
      const [fare , setFare] = useState({});

      //otp 
      const [otp , setOtp]=useState("");

      //ride details
      const [rideDetails , setRideDetails]=useState({});

    const value = {user , setUser , lookingForDriver ,waitForDriver,setWaitForDriver ,setlookingForDriver ,rideConform ,setrideConform, navigate 
      , paymentMethod ,setPaymentMethod ,rideVehiclOption,setRideVehicleOption , pickup ,setPickup ,setConformRidePanel,conformRidePanel , dropoff ,setDropoff,
       selected ,setSelected ,isnewRider ,  setIsnewRider , userRider , setUserRider , fare , setFare , otp , setOtp , rideDetails , setRideDetails}

      return  <UserDatacontext.Provider value={value} >
            {children}
        </UserDatacontext.Provider>
};

// create useContext hook
 const UseContext = () => {
    const data = useContext(UserDatacontext);  
    return data ; 
 }

export  {UserDatacontext , UserContext  , UseContext};
