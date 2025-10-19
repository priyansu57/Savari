// import React, { useState } from 'react'
// import { GiTakeMyMoney } from 'react-icons/gi'
// import { RiUserLocationFill, RiUserLocationLine } from 'react-icons/ri'
// import { RiArrowDownWideFill } from "react-icons/ri";
// import { data, Link } from 'react-router-dom';
// import { UseCaptaionContext } from '../../contextApi/captainContext';
// import { UseContext } from '../../contextApi/context';
// import axios from 'axios';
// import { UseSocketContext } from '../../contextApi/Socket.context';

// function ConfirmRidepopup({setConformRidePopPanel}) {

//     const { navigate  , newRideData} = UseCaptaionContext();
//     const {socket} = UseSocketContext();
//     const [getOtp , setGetOtp]=useState("");
//     const [otpError , setOtpError]=useState(false);

//     const handleSubmit  = async (e) => {
//        e.preventDefault();
//          setGetOtp(getOtp);
//             setGetOtp("");

//          try {   

//             const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/verify-otp`, {
//                 otp: getOtp , rideId: newRideData._id
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("captainToken")}`
//                 }
//             });

//             console.log("OTP verification response:", response.data);
//             if(response.data.message === "OTP verified successfully"){
//                 setOtpError(false);
//             }else{
//                 setOtpError(true);
//                 return;
//             }
            
//             socket.on("ride-started", (data) => {
                
//                 if (data && data.status === "ongoing") {
//                     navigate("/captain-riding");
//                 } else {
//                     setOtpError(true);
//                 }
//             });
            

           
//         } catch (error) {
//             console.error("Error verifying OTP:", error);
//             setOtpError(true);
//         }
//     };


//     const cancelRide = () => {
//         socket.emit("cancel_ride", { rideId: newRideData._id });
//         setConformRidePopPanel(false);
//     }


//     return (
//         <>
//            <div className="w-[26rem] h-[90%]  bg-white shadow-2xl rounded-2xl p-4 overflow-hidden ">
//                 <div className='flex justify-center items-center '>
//                 <p> <RiArrowDownWideFill className='text-3xl cursor-pointer' onClick={() => setConformRidePopPanel(false)} /></p>
//                 </div>
//                 <p className="text-2xl font-semibold mb-4 ml-2 mt-6">Confirm this ride to Start </p>
//                 <div className='flex justify-between items-center  p-4 bg-gray-200 rounded-3xl'>
//                 <div
//                     className="flex items-center gap-3 cursor-pointer"
//                     >
//                     <img
//                         src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
//                         alt="profile"
//                         className="h-12 w-12 rounded-full object-cover"
//                     />
//                     <div>
//                         <h2 className="font-semibold text-gray-800"><p>
//                             {newRideData?.user?.fullname?.firstname || ""}{" "}
//                             {newRideData?.user?.fullname?.lastname || ""}
//                           </p>
//                           </h2>
//                         <p className="text-sm text-gray-500">Basic level</p>
//                     </div>
//                 </div>
//                 <div className="text-right">
//                     <p className="text-lg font-semibold">{ newRideData && newRideData.fare ? `₹${newRideData.fare}` : "₹0.00" }</p>
//                     <p className="text-sm text-gray-400">Fare</p>
//                 </div>
//             </div>
                
            
//                 {/* Pickup */}
//                 <div className="px-5 py-5 flex flex-row gap-2">
//                     <div className=" ">
//                     <RiUserLocationFill className="text-4xl mt-2" />
//                     </div>
//                     <div>
//                         <p className="text-lg font-semibold">562/11-A</p>
//                         <p className="text-gray-600 text-sm">
//                         { newRideData && newRideData.pickup ? newRideData.pickup : "Pickup location not available" }
//                         </p>
//                     </div>
                    
//                 </div>
            
//                 {/* Drop */}
//                 <div className="border-t border-t-gray-300 px-5 py-5 flex flex-row gap-2">
//                     <div className=" ">
//                     <RiUserLocationLine className="text-4xl mt-2" />
//                     </div>
//                     <div>
//                         <p className="text-lg font-semibold">Third Wave Coffee</p>
//                         <p className="text-gray-600 text-sm">
//                         { newRideData && newRideData.destination ? newRideData.destination : "Destination location not available" }
//                         </p>
//                     </div>
                    
//                     </div>
                
//                     {/* Fare */}
//                     <div className="border-t border-b flex flex-row gap-2 border-t-gray-300 px-5 py-5">
//                         <div className=" ">
//                         <GiTakeMyMoney className="text-4xl mt-2" />
//                         </div>
//                         <div>
//                             <p className="text-lg font-semibold">₹{ newRideData && newRideData.fare ? newRideData.fare : "0.00" }</p>
//                             <p className="text-gray-600 text-sm">{ newRideData && newRideData.paymentType ? newRideData.paymentType : "Payment method not available" }</p>
//                         </div>
                        
//                     </div>
                    
                   
//                     <form  >
//                         <div className="px-2 py-8  flex flex-col justify-center items-center gap-4  text-center ">
                            
//                             <input type="text" placeholder='Enter Otp...' value={getOtp} required
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none"
//                                 onChange={(e) => {setGetOtp(e.target.value); setOtpError(false);}} />
//                             { otpError && <p className='text-red-500'>Please enter valid otp</p> }
//                             <button type='submit'  className="text-xl rounded-2xl bg-green-600 hover:bg-green-700 text-white cursor-pointer  w-full h-10  " onClick={handleSubmit}>Confirm</button>
                            
//                         </div>
//                     </form>
//                     <div className="px-2  flex flex-col justify-center items-center   text-center " >
//                         <button  type='button' className="text-xl cursor-pointer  bg-red-600 text-white hover:bg-red-700 w-full h-10 rounded-2xl " onClick={() => cancelRide()} >Cancel </button>
//                     </div>
//             </div>         
//         </>
//     )
// }

// export default ConfirmRidepopup;


import React, { useState } from 'react'
import { GiTakeMyMoney } from 'react-icons/gi'
import { RiUserLocationFill, RiUserLocationLine, RiArrowDownWideFill } from 'react-icons/ri'
import axios from 'axios'
import { UseCaptaionContext } from '../../contextApi/captainContext'
import { UseSocketContext } from '../../contextApi/Socket.context'

function ConfirmRidepopup({ setConformRidePopPanel }) {
  const { navigate, newRideData } = UseCaptaionContext()
  const { socket } = UseSocketContext()
  const [getOtp, setGetOtp] = useState("")
  const [otpError, setOtpError] = useState(false)
  const [verifying, setVerifying] = useState(false) // ✅ new state for loader

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!getOtp) {
      setOtpError(true)
      return
    }

    setVerifying(true) // show loader
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/verify-otp`,
        { otp: getOtp, rideId: newRideData._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captainToken")}`,
          },
        }
      )

      console.log("OTP verification response:", response.data)
      if (response.data.message === "OTP verified successfully") {
        setOtpError(false)
        socket.on("ride-started", (data) => {
          if (data && data.status === "ongoing") {
            navigate("/captain-riding")
          } else {
            setOtpError(true)
          }
          setVerifying(false)
        })
      } else {
        setOtpError(true)
        setVerifying(false)
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setOtpError(true)
      setVerifying(false)
    }
  }

  const cancelRide = () => {
    socket.emit("cancel_ride", { rideId: newRideData._id })
    setConformRidePopPanel(false)
  }

  return (
    <>
      <div className="w-[26rem] h-[90%] bg-white shadow-2xl rounded-2xl p-4 overflow-hidden">
        <div className='flex justify-center items-center'>
          <RiArrowDownWideFill
            className='text-3xl cursor-pointer'
            onClick={() => setConformRidePopPanel(false)}
          />
        </div>

        <p className="text-2xl font-semibold mb-4 ml-2 mt-6">Confirm this ride to Start</p>

        {/* User + Fare Info */}
        <div className='flex justify-between items-center p-4 bg-gray-200 rounded-3xl'>
          <div className="flex items-center gap-3">
            <img
              src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
              alt="profile"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-800">
                {newRideData?.user?.fullname?.firstname || ""}{" "}
                {newRideData?.user?.fullname?.lastname || ""}
              </h2>
              <p className="text-sm text-gray-500">Basic level</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold">
              {newRideData?.fare ? `₹${newRideData.fare}` : "₹0.00"}
            </p>
            <p className="text-sm text-gray-400">Fare</p>
          </div>
        </div>

        {/* Pickup */}
        <div className="px-5 py-5 flex flex-row gap-2">
          <RiUserLocationFill className="text-4xl mt-2" />
          <div>
            <p className="text-lg font-semibold">562/11-A</p>
            <p className="text-gray-600 text-sm">
              {newRideData?.pickup || "Pickup location not available"}
            </p>
          </div>
        </div>

        {/* Drop */}
        <div className="border-t border-t-gray-300 px-5 py-5 flex flex-row gap-2">
          <RiUserLocationLine className="text-4xl mt-2" />
          <div>
            <p className="text-lg font-semibold">Third Wave Coffee</p>
            <p className="text-gray-600 text-sm">
              {newRideData?.destination || "Destination location not available"}
            </p>
          </div>
        </div>

        {/* Fare */}
        <div className="border-t border-b flex flex-row gap-2 border-t-gray-300 px-5 py-5">
          <GiTakeMyMoney className="text-4xl mt-2" />
          <div>
            <p className="text-lg font-semibold">
              ₹{newRideData?.fare ? newRideData.fare : "0.00"}
            </p>
            <p className="text-gray-600 text-sm">
              {newRideData?.paymentType || "Payment method not available"}
            </p>
          </div>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-2 py-8 flex flex-col justify-center items-center gap-4 text-center">
            <input
              type="text"
              placeholder="Enter OTP..."
              value={getOtp}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none"
              onChange={(e) => {
                setGetOtp(e.target.value)
                setOtpError(false)
              }}
            />

            {otpError && <p className="text-red-500">Please enter valid OTP</p>}

            {/* ✅ Button with Verifying Loader */}
            <button
              type="submit"
              disabled={verifying}
              className={`text-xl rounded-2xl w-full h-10 text-white cursor-pointer transition-all duration-200 ${
                verifying
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {verifying ? (
                <span className="flex justify-center items-center gap-2">
                  Verifying
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                  </span>
                </span>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </form>

        {/* Cancel Button */}
        <div className="px-2 flex flex-col justify-center items-center text-center">
          <button
            type="button"
            className="text-xl bg-red-600 text-white hover:bg-red-700 w-full h-10 rounded-2xl"
            onClick={cancelRide}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default ConfirmRidepopup

