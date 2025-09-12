import React from 'react'
import { GiTakeMyMoney } from 'react-icons/gi'
import { RiUserLocationFill, RiUserLocationLine } from 'react-icons/ri'
import { UseContext } from '../../contextApi/context';

function Waitfordriver() {
    const {rideVehiclOption } = UseContext();
    return (
        <>
          <div className="w-full h-[90%] mt-4 mr-2  bg-white shadow-lg rounded-2xl p-2 overflow-hidden ">
                        <div className='flex justify-between items-center'>
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

                            <div className='text-right'>
                                <h2 className='text-lg font-semibold '>Sarthak</h2>
                                <h4 className='text-xl font-semibold '>P04 A 1234</h4>
                                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                            </div>
                        </div>
                          {/* Car Image */}
                            
                    
                          {/* Pickup */}
                          <div className="border-t border-t-gray-300  px-5 py-5 flex flex-row gap-2">
                            <div className=" ">
                               <RiUserLocationFill className="text-4xl mt-2" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold">562/11-A</p>
                                <p className="text-gray-600 text-sm">
                                    Kaikondrahalli, Bengaluru, Karnataka
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
                                    17th Cross Rd, PWD Quarters, 1st Sector,
                                    HSR Layout, Bengaluru, Karnataka
                                </p>
                            </div>
                           
                          </div>
                    
                          {/* Fare */}
                          <div className="border-t border-b flex flex-row gap-2 border-t-gray-300 border-b-gray-300 px-5 py-5">
                             <div className=" ">
                               <GiTakeMyMoney className="text-4xl mt-2" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold">₹193.20</p>
                                <p className="text-gray-600 text-sm">Cash</p>
                            </div>
                            
                          </div>
                    
                        </div>
        </>
    )
}

export default Waitfordriver
