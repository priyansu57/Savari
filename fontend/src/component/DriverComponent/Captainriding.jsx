import React, { useRef, useState } from 'react'
import Button from '../uerPageComponent/Button'
import UserShow from '../../page/UserComponent/userShow'
import { FaCar } from 'react-icons/fa'
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import logo from "../../assets/savari-captain-black.png"
import { UseCaptaionContext } from '../../contextApi/captainContext'
import { NavLink } from 'react-router-dom'

function Captainriding() {
     const {captain ,navigate ,newRideData } = UseCaptaionContext();

       const handleLogout = () => {
            navigate("/captain-logout")
        }

       const [finishRidePanel , setFinishRidePopPanel]=useState(false);
       const finishRidePanelRef = useRef(null);

       useGSAP(function () {
        if (finishRidePanel) {
          gsap.to(finishRidePanelRef.current , {
            transform:"translateY(-110%)",
            display:"flex"
          })
        }else{
          gsap.to(finishRidePanelRef.current , {
            transform:"translateY(0)",
            display:"none"
          })
        }
       },[finishRidePanel]);
        
    return (
        <>
            <header>
                <div className='w-screen h-18 bg-gray-100 border-b-4 border-b-gray-200 hidden md:flex justify-between items-center  mr-4'>
                    <div className='  flex justify-center items-center gap-20 h-24'>
                        <div className='h-2 w-28 ml-8 mt-[-93px]' >
                            <img src={logo} alt="Savari" />
                        </div>
                        <NavLink
                            to="/captain-home"
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
                            to="/captain-riding"
                            className={({ isActive }) =>
                                `flex justify-center items-center gap-2 h-18 border-b-4 transition-colors ${
                                isActive ? "border-black" : "border-transparent"
                                }`
                            }
                            >
                            <FaCar  className="h-14 w-6" />
                            <span className="font-medium">Captain Ride</span>
                        </NavLink>

                    </div>

                    <div className='flex justify-center items-center gap-4 mr-14 ' >
                          <UserShow text={captain ? captain.fullname?.firstname : "Captain"} user={captain} />
                          <Button text={"Logout"} handleLogout={handleLogout}  />
                          {/* <User text={user ? user.fullname.firstname : "user"}   /> */}
                    </div>
                </div>
            </header>  

             {!newRideData || Object.keys(newRideData).length === 0 ? (
               <div className='flex justify-center items-center h-[80vh]'> 
                   <p className='text-2xl font-semibold text-red-600'>No ongoing ride found.</p>
               </div>
            ) : (
            <>
              <div className='h-[90vh] w-screen p-6 pb-0 '>
               <RideMap
                  pickup={
                    newRideData &&
                    newRideData.pickupCoordinates &&
                    newRideData.pickupCoordinates.coordinates
                      ? {
                          lat: newRideData.pickupCoordinates.coordinates[1],
                          lng: newRideData.pickupCoordinates.coordinates[0],
                        }
                      : null
                  }
                  destination={
                    newRideData &&
                    newRideData.destinationCoordinates &&
                    newRideData.destinationCoordinates.coordinates
                      ? {
                          lat: newRideData.destinationCoordinates.coordinates[1],
                          lng: newRideData.destinationCoordinates.coordinates[0],
                        }
                      : null
                  }
                />
                  <div className='text-center flex justify-center items-center'>
                      <RunningRidBar setFinishRidePopPanel={setFinishRidePopPanel} finishRidePanel={finishRidePanel} />  
                  </div>  
              </div>   
              <div ref={finishRidePanelRef} className='flex  justify-center items-center  z-60 translate-y-full'>
                 <FinishRidePanel setFinishRidePopPanel={setFinishRidePopPanel} finishRidePanel={finishRidePanel}  />     
              </div>
            </>
            )}
        </>
    )
}

export default Captainriding


import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaTachometerAlt, FaClipboardList } from "react-icons/fa";
import { PiArrowFatLineDownDuotone } from "react-icons/pi";
import { SlArrowUp } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import FinishRidePanel from './FinishRidePanel'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../LiveTracking/LiveTracking'
import RideMap from '../LiveTracking/RideMap'

function RunningRidBar ({setFinishRidePopPanel , finishRidePanel}) {

      const [visible, setVisible] = useState(true);
      const {navigate ,newRideData} = UseCaptaionContext();

 return(
    <>
     <div className="w-2xl h-24 absolute bottom-4 bg-white rounded-2xl shadow-lg overflow-hidden" >
      {/* Header */}
      <div className="flex justify-between items-center p-4">
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
            <h2 className="font-semibold text-gray-800">{newRideData?.user?.fullname?.firstname || "user"}{" "}{newRideData?.user?.fullname?.lastname || ""}</h2>
            <p className="text-sm text-gray-500">{newRideData?._id || ""}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center cursor-pointer relative">
            <div onClick={() => setFinishRidePopPanel(!finishRidePanel)} className="text-2xl ">
                 {finishRidePanel ? <IoIosArrowUp /> : <IoIosArrowDown />  }
            </div>
           <p className='text-lg font-semibold'> {newRideData && newRideData.distance ? `${newRideData.distance}KM away` : "Distance not available"} </p>  
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold">{ newRideData && newRideData.fare ? `₹${newRideData.fare}` : "₹0.00" }</p>
          <p className="text-sm text-gray-400">Earn</p>
        </div>
      </div>
    </div>
    </>
 )

}