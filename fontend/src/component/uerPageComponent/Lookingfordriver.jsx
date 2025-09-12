import React from 'react'
import { GiTakeMyMoney } from 'react-icons/gi'
import { RiUserLocationFill, RiUserLocationLine } from 'react-icons/ri'
import { UseContext } from '../../contextApi/context';

function Lookingfordriver({ rider }) {
    const {rideVehiclOption } = UseContext();
    return (
        <>
           <div className="w-full h-[90%] mt-4 mr-2  bg-white shadow-lg rounded-2xl p-2 overflow-hidden ">
                      <p className="text-3xl font-semibold mb-4 ml-4 mt-2">Looking for nearby drivers </p>
                {/* Car Image */}
                  <div className="flex justify-center  relative">
                      {/* Oval Background */}
                      <div className="absolute top-4 w-52 h-34 bg-blue-300/50 rounded-full blur-sm "></div>
                       <div className="absolute top-10 w-38 h-24 bg-blue-400/60 rounded-full blur-sm "></div>
                      {/* Car Image */}
                      <img
                          src={rideVehiclOption.img}
                          alt="Car"
                          className="relative w-40 h-40 object-contain "
                      />
                  </div>
          
          
                {/* Pickup */}
                <div className="border-t border-t-gray-300  px-5 py-5 flex flex-row gap-2">
                  <div className=" ">
                     <RiUserLocationFill className="text-4xl mt-2" />
                  </div>
                  <div>
                      <p className="text-lg font-semibold">562/11-A</p>
                      <p className="text-gray-600 text-sm">
                          { rider.pickup}
                      </p>
                  </div>
                  
                </div>
          
                {/* Drop */}
                <div className="border-t border-t-gray-300 px-5 py-5 flex flex-row gap-2">
                   <div className=" ">
                     <RiUserLocationLine className="text-4xl mt-2" />
                  </div>
                  <div>
                      <p className="text-lg font-semibold">772/71-B</p>
                      <p className="text-gray-600 text-sm">
                          { rider.destination}
                      </p>
                  </div>
                 
                </div>
          
                {/* Fare */}
                <div className="border-t flex flex-row gap-2 border-t-gray-300 b px-5 py-5">
                   <div className=" ">
                     <GiTakeMyMoney className="text-4xl mt-2" />
                  </div>
                  <div>
                      <p className="text-lg font-semibold">₹{ rider.fare}</p>
                      <p className="text-gray-600 text-sm">{ rider.paymentType}</p>
                  </div>
                  
                </div>
          
              </div>
        </>
    )
}

export default Lookingfordriver
