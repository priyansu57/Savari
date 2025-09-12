import React from 'react'
import { GiTakeMyMoney } from 'react-icons/gi'
import { RiUserLocationFill, RiUserLocationLine } from 'react-icons/ri'
import { RiArrowDownWideFill } from "react-icons/ri";
import { UseCaptaionContext } from '../../contextApi/captainContext';

function Ridepopup({ confirmRide , setRidePopPanel ,setConformRidePopPanel}) {

   const {newRideData} = UseCaptaionContext();

  //  console.log("New Ride Data in Ridepopup : " , newRideData);
   

    return (
        <div className="w-[26rem] h-[80%]  bg-white shadow-2xl rounded-2xl p-4 overflow-hidden ">
            <div className='flex justify-center items-center '>
              <p> <RiArrowDownWideFill className='text-3xl cursor-pointer' onClick={() => setRidePopPanel(false)} /></p>
            </div>
             <p className="text-2xl font-semibold mb-4 ml-2 mt-6">New Ride Available! </p>
            <div className='flex justify-between items-center  p-4 bg-gray-200 rounded-3xl'>
                <div
                    className="flex items-center gap-3 cursor-pointer"
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
                    <p className="text-sm text-gray-400">Fare</p>
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
        
              <div className="px-2 py-8  flex flex-col-reverse justify-center items-center gap-4  text-center ">
                <button  className="text-xl cursor-pointer  bg-gray-300 text-black hover:bg-gray-400 w-full h-10 rounded-2xl " onClick={() => setRidePopPanel(false)}>Ignore </button>
                <button   className="text-xl rounded-2xl bg-green-600 hover:bg-green-700 text-white cursor-pointer  w-full h-10  " onClick={() => {setConformRidePopPanel(true); setRidePopPanel(false); confirmRide(); }}>Accept</button>
              </div>
            </div>
    )
}

export default Ridepopup
