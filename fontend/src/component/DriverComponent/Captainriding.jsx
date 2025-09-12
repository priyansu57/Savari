import React, { useRef, useState } from 'react'
import Button from '../uerPageComponent/Button'
import UserShow from '../../page/UserComponent/userShow'
import { FaBars, FaCar, FaTimes } from 'react-icons/fa'
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import logo from "../../assets/savari-captain-black.png"
import { UseCaptaionContext } from '../../contextApi/captainContext'
import { NavLink } from 'react-router-dom'

function Captainriding() {
     const {captain ,navigate ,newRideData } = UseCaptaionContext();
     const [isOpen, setIsOpen] = useState(false);

       const handleLogout = () => {
            navigate("/captain-logout")
        }

       const [finishRidePanel , setFinishRidePopPanel]=useState(false);
       const finishRidePanelRef = useRef(null);

       useGSAP(function () {
        if (finishRidePanel) {
          gsap.to(finishRidePanelRef.current , {
            transform:"translateY(-106%)",
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
            <header className="w-full h-20 bg-gray-100 border-b-4 border-b-gray-200 fixed top-0 left-0 z-50">
                 <div className="flex justify-between items-center px-2 md:px-6  ">
                   {/* Logo */}
                   <div className="flex items-center ">
                     <img
                       src={logo}
                       alt="Savari"
                       onClick={() => navigate("/")}
                       className="h-22 w-22  cursor-pointer"
                     />
                   </div>
           
                   {/* Desktop Nav */}
                   <nav className="hidden md:flex items-center gap-8">
                     <NavLink
                       to="/captain-home"
                       className={({ isActive }) =>
                         `h-18 flex items-center gap-2 border-b-4 transition-colors ${
                           isActive ? "border-black" : "border-transparent"
                         }`
                       }
                     >
                       <SiHomeassistantcommunitystore  className="h-6 w-6" />
                       <span className="font-medium">Home</span>
                     </NavLink>
           
                     <NavLink
                       to="/captain-riding"
                       className={({ isActive }) =>
                         ` h-17 flex items-center gap-2 border-b-4 transition-colors ${
                           isActive ? "border-black" : "border-transparent"
                         }`
                       }
                     >
                       <FaCar className="h-6 w-6" />
                       <span className="font-medium">Ride</span>
                     </NavLink>
                   </nav>
           
                   {/* User + Logout (Desktop) */}
                   <div className="hidden md:flex items-center gap-4">
                     <UserShow text={captain ? captain.fullname?.firstname : "captain"} captain={captain} />
                     <Button text={"Logout"} handleLogout={handleLogout} />
                   </div>
           
                   {/* Mobile Hamburger */}
                   <button
                     className="md:hidden text-2xl"
                     onClick={() => setIsOpen(!isOpen)}
                   >
                     {isOpen ? <FaTimes /> : <FaBars />}
                   </button>
                 </div>
           
                 {/* Mobile Menu (fixed below header, above RideForm) */}
                 {isOpen && (
                   <div className="md:hidden flex flex-col gap-4 px-4 py-3 bg-gray-50 border-t fixed top-[60px] left-0 w-full z-40 shadow-lg">
                     <NavLink
                       to="/captain-home"
                       className={({ isActive }) =>
                         `  flex items-center gap-2  ${
                           isActive ? "text-black font-semibold" : "text-gray-600"
                         }`
                       }
                       onClick={() => setIsOpen(false)}
                     >
                       <SiHomeassistantcommunitystore className="h-5 w-5" />
                       Home
                     </NavLink>
           
                     <NavLink
                       to="/captain-riding"
                       className={({ isActive }) =>
                         ` flex items-center gap-2  ${
                           isActive ? "text-black font-semibold" : "text-gray-600"
                         }`
                       }
                       onClick={() => setIsOpen(false)}
                     >
                       <FaCar className="h-5 w-5" />
                       Ride
                     </NavLink>
           
                     {/* User + Logout */}
                     <div className="flex items-center justify-between">
                       <UserShow text={captain ? captain.fullname.firstname : "captain"} captain={captain} />
                       <Button text={"Logout"} handleLogout={handleLogout} />
                     </div>
                   </div>
                 )}
               </header> 
             { !newRideData || Object.keys(newRideData).length === 0 ? (
               <div className='flex justify-center items-center h-[80vh]'> 
                   <p className='text-2xl font-semibold text-red-600'>No ongoing ride found.</p>
               </div>
            ) : (
            <>
              <div className='h-[90vh] mt-26 w-screen pl-4 pr-4 '>
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
    <div className="w-full sm:w-[600px] md:w-[700px] max-w-[95%] mx-auto fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg overflow-hidden">
  {/* Header */}
  <div className="flex flex-col md:flex-row justify-between items-center md:items-start p-4 gap-4">
    
    {/* Profile */}
    <div
      className="flex items-center gap-3 cursor-pointer flex-shrink-0"
      onClick={() => setVisible(!visible)}
    >
      <img
        src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
        alt="profile"
        className="h-12 w-12 rounded-full object-cover"
      />
      <div className="min-w-0">
        <h2 className="font-semibold text-gray-800 truncate">
          {newRideData?.user?.fullname?.firstname || "user"}{" "}
          {newRideData?.user?.fullname?.lastname || ""}
        </h2>
        <p className="text-sm text-gray-500 truncate max-w-[180px] sm:max-w-[220px]">
          {newRideData?._id || ""}
        </p>
      </div>
    </div>

    {/* Distance + Arrow */}
    <div className="flex flex-col justify-center items-center cursor-pointer flex-shrink-0">
      <div
        onClick={() => setFinishRidePopPanel(!finishRidePanel)}
        className="text-2xl"
      >
        {finishRidePanel ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <p className="text-base font-semibold text-gray-700 text-center">
        {newRideData?.distance
          ? `${newRideData.distance} KM away`
          : "Distance not available"}
      </p>
    </div>

    {/* Fare */}
    <div className="text-center md:text-right flex-shrink-0">
      <p className="text-lg font-semibold text-gray-800">
        {newRideData?.fare ? `₹${newRideData.fare}` : "₹0.00"}
      </p>
      <p className="text-sm text-gray-400">Earn</p>
    </div>
  </div>
</div>

       
    </>
 )

}