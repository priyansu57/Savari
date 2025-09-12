import React, { useState } from 'react'
import logo from "../../assets/Sevari_black_log.png"
import { Link, NavLink } from 'react-router-dom'
import { FaCar, FaUser } from "react-icons/fa";
import { PiUserCircleDuotone } from "react-icons/pi";
import Button from '../../component/uerPageComponent/Button';
import User from '../../component/uerPageComponent/User';
import { UseContext } from '../../contextApi/context';
import UserShow from '../UserComponent/userShow';
import { FaTruckPickup } from "react-icons/fa6";
import { RiMapPinTimeFill } from "react-icons/ri";
import Dropupper from "../../component/uerPageComponent/Dropupper"
import Other from '../../component/uerPageComponent/NewRiderModal';
import RideOptions from '../../component/uerPageComponent/RideOption';
import ConformRideDetails from '../../component/uerPageComponent/ConformRideDetails';
import PaymentBar from '../../component/uerPageComponent/PaymentBar';
import Lookingfordriver from '../../component/uerPageComponent/Lookingfordriver';
import Waitfordriver from '../../component/uerPageComponent/Waitfordriver';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import RideForm from './RiderForm';
import axios from 'axios';
import { use } from 'react';
import { useEffect } from 'react';
import { UseSocketContext }  from "../../contextApi/Socket.context"
import LiveTracking from '../../component/LiveTracking/LiveTracking';
import RideMap from '../../component/LiveTracking/RideMap';


function Home() {

    const { sendMessage, receiveMessage   ,socket} = UseSocketContext();

    const [time , setTime] = useState("");
    const [selectVehicle , setSelectVehicle]= useState(false);
    const [rider , setRider]=useState({});
  
   
 let {user , navigate ,paymentMethod , setRideDetails , setOtp , setlookingForDriver , pickup , lookingForDriver , setPickup, dropoff , setDropoff, rideVehiclOption , selected , isnewRider ,setrideConform ,rideConform} = UseContext();
    const isDisabled = !pickup || !dropoff || !time;

    
    
    const handleLogout = () => {
       navigate("/users/logout");   
    }

    useEffect(() => {   
        // Fetch initial data or perform setup
        sendMessage("join", { userId: user._id, userType: "user" });
    }, [user]);


   async function  createRide(vehicleType) {
        

        // console.log("Payment Method in infrontend createRide function" , paymentMethod);
         

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{  pickup,
             destination: dropoff,
             vehicleType: vehicleType.toLowerCase(), 
             paymentType: paymentMethod   
        }, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('userToken')}`  // Assuming you have a token in user object
            }
        });


            // const data = await response.json();
            setRider(response.data);
             setOtp(response.data.otp);
            console.log('Ride created successfully:', response.data);
        } catch (error) {
            console.error('Error creating ride:', error);
        }

        
    }

    socket.on("ride-confirmed" , (data) => {
        console.log("Ride confirmed data in Home.jsx : " , data);
        setRideDetails(data);
        setlookingForDriver(false);
        navigate("/riding");
    });

    // console.log("Rider data in home page : " , rider);

    socket.on("cancel_ride" , (data) => {
        console.log("Ride cancelled data in Home.jsx : " , data);
        setrideConform(false);
        setlookingForDriver(false);
        setRider({});
        alert("Ride has been cancelled by driver");
        navigate("/home");
    });

  

    return (
        <>
        <header>
            <div className='w-screen h-18 bg-gray-100 border-b-4 border-b-gray-200 hidden md:flex justify-between items-center  mr-4'>
                <div className='  flex justify-center items-center gap-20 h-24'>
                    <div className='h-2 w-28 ml-8 mt-[-93px]' >
                        <img src={logo} alt="Savari"  onClick={() => navigate("/")} className='cursor-pointer' />
                    </div>
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `flex justify-center items-center gap-2 h-18 border-b-4 transition-colors ${
                            isActive ? "border-black" : "border-transparent"
                            }`
                        }
                        >
                        <SiHomeassistantcommunitystore className="h-14 w-6" />
                        <span className="font-medium">Home</span>
                    </NavLink>

                    <NavLink
                        to="/riding"
                        className={({ isActive }) =>
                            `flex justify-center items-center gap-2 h-18 border-b-4 transition-colors ${
                            isActive ? "border-black" : "border-transparent"
                            }`
                        }
                        >
                        <FaCar className="h-14 w-6" />
                        <span className="font-medium">Ride</span>
                    </NavLink>

                </div>

                <div className='flex justify-center items-center gap-4 mr-14 ' >
                       <UserShow text={user ? user.fullname.firstname : "user"} user={user} />
                       <Button text={"Logout"} handleLogout={handleLogout}  />
                       {/* <User text={user ? user.fullname.firstname : "user"}   /> */}
                </div>
            </div>
        </header>

        {/* content part  */}

         { isnewRider && <Other /> }
         <div className='flex flex-col-reverse lg:flex-row   md:mt-6  w-full h-[85vh]  '>
            <div className={`h-full   ${selectVehicle ? "w-full" :  "w-[50%]"} `}>
                <div className='  pt-4 '>
                    <RideForm  setSelectVehicle={setSelectVehicle} /> 
                </div>
            </div> 

            {rideConform ? lookingForDriver ? <Lookingfordriver rider={rider}  /> : <ConformRideDetails rider={rider} /> :
                <div className={`h-ful w-full  flex-col justify-between     ${selectVehicle ? "flex" : "hidden"  } `}>    
                        <div>
                        <RideOptions  />
                        </div>
                        <div className='bg-gray-200 flex flex-row justify-between items-center mr-8 p-2  rounded-2xl shadow-xl/30 shadow-black'>
                            <PaymentBar />
                            <button className='h-12 w-[90%]  bg-black text-white rounded-2xl' onClick={()=> {setrideConform(true) , createRide(rideVehiclOption.name) }}>Request {rideVehiclOption.name}</button>
                        </div>
                </div>
            }

           
            <div className='h-full w-full p-4  '>
               <LiveTracking height={"74vh"} />
            </div>
         </div>

        <p className='text-center text-lg text-gray-900 relative -top-6 '>Trusted by riders, powered by technology—Savari ensures every journey is smooth, reliable, and stress-free. <span className='text-bold text-lg'>Book with Savari today.</span> </p>
        {/*  */}

       {/* <RideForm /> */}
        
        </>
    )
}

export default Home

// import { FaChevronDown } from "react-icons/fa";
// import { FaQrcode } from "react-icons/fa";
// import { IoMdCash } from "react-icons/io";
// import Lookingfordriver from '../../component/uerPageComponent/Lookingfordriver';

// function PaymentBar () {
//       const [isPaymentOption , setIsPaymentOption]=useState(false);
//       const {paymentMethod } = UseContext();

//      const handlePaymetoptionShow = () => {
//         setIsPaymentOption(!isPaymentOption);
//      }

//      console.log(isPaymentOption);
     

//     return (
//         <>
//          <div className='h-full w-full p-4 flex flex-row justify-between '>
//             <div onClick={() =>  setIsPaymentOption(!isPaymentOption)} className='flex flex-row items-center gap-4 ml-4 cursor-pointer'>
//                 <div className='flex gap-2' >
//                      <img
//                   src={`${paymentMethod !== "Cash" ?
//                               "https://www.citypng.com/public/uploads/preview/download-black-qr-code-barcode-png-704081694711798fcch0jaztk.png" :
//                             "https://p1.hiclipart.com/preview/754/703/590/background-green-money-cash-document-email-funding-games-png-clipart.jpg" 
//                              }`}
//                   alt="Cash"
//                   className="w-6 h-6"
//                 />
//                 <p>{paymentMethod}</p>
//                 </div>
//                  <FaChevronDown />
//             </div>
//             <div>
               
//             </div>
//             {isPaymentOption &&  <PaymentOptions onClose={handlePaymetoptionShow}/>}
//          </div>
//         </>
//     )
// }

// import React, { useState } from "react";

// function PaymentOptions({ onClose }) {
//   const [useUberCash, setUseUberCash] = useState(false);


//   const {paymentMethod , setPaymentMethod} = UseContext();

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" >
//       <div className="bg-gray-100 w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
        
//         {/* Header */}
//         <div className="flex justify-between items-center p-4">
//           <h2 className="text-xl font-semibold">Payment options</h2>
//           <button onClick={onClose} className="text-2xl">&times;</button>
//         </div>

//         <div className="p-4 space-y-4">
//           {/* Uber Cash Toggle */}
//           <div>
//             <p className="font-medium">Savari Cash: ₹0.00</p>
//             <div className="flex justify-between items-center mt-2">
//               <div className="flex items-center space-x-2">
//                 <img
//                   src="https://cdn.iconscout.com/icon/free/png-256/uber-10-761688.png"
//                   alt="Uber"
//                   className="w-6 h-6"
//                 />
//                 <span>Savari Cash: ₹0.00</span>
//               </div>
//               <label className="inline-flex relative items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={useUberCash}
//                   onChange={() => setUseUberCash(!useUberCash)}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-300 peer-checked:bg-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
//               </label>
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div>
//             <p className="font-medium">Payment method</p>
//             <div className="mt-2 space-y-2">
//               {/* Cash Option 1 */}
//               <label className="flex items-center space-x-2 p-2 border-b border-b-gray-300  cursor-pointer">
//                 <img
//                   src="https://p1.hiclipart.com/preview/754/703/590/background-green-money-cash-document-email-funding-games-png-clipart.jpg"
//                   alt="Cash"
//                   className="w-6 h-6"
//                 />
//                 <span>Cash</span>
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="Cash"
//                   checked={paymentMethod === "Cash"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="ml-auto"
//                 />
//               </label>

//               {/* Cash Option 2 */}
//               <label className="flex items-center space-x-2 p-2 border-b border-b-gray-300 cursor-pointer">
//                 <img
//                   src="https://www.citypng.com/public/uploads/preview/download-black-qr-code-barcode-png-704081694711798fcch0jaztk.png"
//                   alt="Cash Alt"
//                   className="w-6 h-6"
//                 />
//                 <span className=''>UPI Scan and Pay</span>
//                 <input
//                   type="radio"
//                   name="payment"
//                   value="UPI Scan and Pay"
//                   checked={paymentMethod === "UPI Scan and Pay"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="ml-auto"
//                 />
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="p-4 ">
//           <button onClick={onClose}  className="w-full bg-black text-white py-3 rounded-lg font-medium">
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PaymentOptions;
