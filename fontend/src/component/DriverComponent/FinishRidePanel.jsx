import React, { useState } from 'react'
import { GiTakeMyMoney } from 'react-icons/gi'
import { RiUserLocationFill, RiUserLocationLine } from 'react-icons/ri'
import { RiArrowDownWideFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { UseCaptaionContext } from '../../contextApi/captainContext';
import axios from 'axios';
import { UseSocketContext } from '../../contextApi/Socket.context';

function FinishRidePanel({setFinishRidePopPanel , finishRidePanel}) {
    // console.log("finish : " + setFinishRidePopPanel , finishRidePanel);

     const {setFishRideOtp ,navigate ,  newRideData ,setNewRideData} = UseCaptaionContext();
     const {socket} = UseSocketContext();

    const handleFinishRide = async () => {
        console.log("Finish Ride Clicked");
        
       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/finish-ride`, {
        rideId: newRideData._id
       }, {
        headers: {  
            Authorization: `Bearer ${localStorage.getItem("captainToken")}`
        }
       });

       console.log("Finish ride response:", response.data);

       socket.on("ride-completed", (data) => {
        console.log("Ride completed data:", data);
            if (data && data.status === "completed") {
                navigate("/captain-home");
               setNewRideData({});
            } else {
                console.error("Error finishing ride");
            }       
       });

    }

    return (
        <>
           <div className="w-[26rem] h-[90%]  bg-white shadow-2xl rounded-2xl p-4 overflow-hidden ">
                <div className='flex justify-center items-center '>
                <p> <RiArrowDownWideFill className='text-3xl cursor-pointer' onClick={() => setFinishRidePopPanel(!finishRidePanel)} /></p>
                </div>
                <p className="text-3xl font-semibold mb-4 ml-2 mt-6">Finish this Ride  </p>
                <div className='flex justify-between items-center  p-4 bg-gray-200 rounded-3xl'>
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setVisible(!visible)} // hide card when avatar clicked
                        >
                        <img
                            src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
                            alt="profile"
                            className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-800"><p>
                            {newRideData?.user?.fullname?.firstname || ""}{" "}
                            {newRideData?.user?.fullname?.lastname || ""}
                          </p>
                          </h2>
                            <p className="text-sm text-gray-500">Basic level</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold">{ newRideData && newRideData.fare ? `₹${newRideData.fare}` : "₹0.00" }</p>
                        <p className="text-sm text-gray-400">Earn</p>
                    </div>
                </div>
                
            
                {/* Pickup */}
                <div className="px-5 py-5 flex flex-row gap-2">
                    <div className=" ">
                    <RiUserLocationFill className="text-4xl mt-2" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">562/11-A</p>
                        <p className="text-gray-600 text-sm">
                            { newRideData && newRideData.pickup ? newRideData.pickup : "Pickup location not available" }
                        </p>
                    </div>
                    
                </div>
            
                {/* Drop */}
                <div className="border-t border-t-gray-300 px-5 py-5 flex flex-row gap-2">
                    <div className=" ">
                    <RiUserLocationLine className="text-4xl mt-2" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Third Wave Coffee</p>
                        <p className="text-gray-600 text-sm">
                            { newRideData && newRideData.destination ? newRideData.destination : "Destination location not available" }
                        </p>
                    </div>
                    
                    </div>
                
                    {/* Fare */}
                    <div className="border-t border-b flex flex-row gap-2 border-t-gray-300 px-5 py-5">
                        <div className=" ">
                        <GiTakeMyMoney className="text-4xl mt-2" />
                        </div>
                        <div>
                            <p className="text-lg font-semibold">{ newRideData && newRideData.fare ? `₹${newRideData.fare}` : "₹0.00" }</p>
                            <p className="text-gray-600 text-sm">{ newRideData && newRideData.paymentType ? newRideData.paymentType : "Payment type not available" }</p>
                        </div>
                        
                    </div>

                    <div className='px-1 py-6  flex flex-col justify-center items-center gap-4  text-center '  >
                        <button type='button'   className="text-xl rounded-2xl bg-green-600 hover:bg-green-700 text-white cursor-pointer  w-full h-10  " onClick={handleFinishRide}>Finish Ride</button>
                    </div>
                    <div className=' flex flex-col justify-center items-center text-sm text-gray-500 text-center '>
                        <p >Thank you, {newRideData && newRideData.user ? newRideData.user.fullname.firstname : "Captain"}<p>
                            </p> you make every journey possible</p>
                    </div>
                    {/* <form onSubmit={handleSubmit} >
                        <div className="px-2 py-8  flex flex-col justify-center items-center gap-4  text-center ">
                            <input type="text" placeholder='Enter otp to finish ride...' value={getOtp} required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none"
                                onChange={(e) => setGetOtp(e.target.value)} />
                            
                        </div>
                    </form> */}
            </div>             
        </>
    )
}

export default FinishRidePanel
