import React, { useRef, useState } from 'react'
import DriverEarnCard from '../../component/DriverComponent/DriverEarnCard'
import { data, NavLink } from 'react-router-dom'
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import { FaBars, FaCar, FaTimes } from 'react-icons/fa'
import logo from "../../assets/savari-captain-black.png"
import UserShow from '../UserComponent/userShow'
import Button from '../../component/uerPageComponent/Button'
import { UseCaptaionContext } from '../../contextApi/captainContext'
import Ridepopup from '../../component/DriverComponent/Ridepopup'
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import ConfirmRidepopup from '../../component/DriverComponent/ConfirmRidepopup'
import { useEffect } from 'react'
import { UseSocketContext } from '../../contextApi/Socket.context'
import axios from 'axios'
import LiveTracking from '../../component/LiveTracking/LiveTracking'

function CaptianHome() {

  const {captain ,navigate ,setNewRideData ,newRideData } = UseCaptaionContext();
  const [ridePopPanel , setRidePopPanel]=useState(false);
  const [confirmRidePopPanel , setConformRidePopPanel]=useState(false);
  const ridePopPanelRef = useRef(null);
  const ConformRidePopPanelRef = useRef(null);
  const { sendMessage , socket } = UseSocketContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
          // Fetch initial data or perform setup
          sendMessage("join", { userId: captain._id, userType: "captain" });
      }, [captain]);


      const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                socket.emit("update-captain-location", {
                    userId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                });
                // Send the location to the server or use it as needed
            });
        }
    };

    const locationInterval = setInterval(updateLocation, 5000); // Update location every 5 seconds
     updateLocation(); // Initial call to set location immediately
    
    // Clean up the interval on component unmount
    useEffect(() => {
        return () => clearInterval(locationInterval);
    }, []);


    socket.on("new-ride-request" , (data) => {
        // console.log("Data on captainHome : " , data);
        if(data){
          setRidePopPanel(true);
            setNewRideData(data);
        }   
        
    })

  useGSAP(function () {
    if (ridePopPanel) {
       gsap.to(ridePopPanelRef.current , {
        transform: "translateY(-103%)",
         display:"flex"
       })
    }else{
      gsap.to(ridePopPanelRef.current , {
        transform: "translateY(0)",
        display:"none"
       })
    }
  },[ridePopPanel]);

   useGSAP(function () {
    if (confirmRidePopPanel) {
       gsap.to(ConformRidePopPanelRef.current , {
        transform: "translateY(-107%)",
        display:"flex"
       })
    }else{
      gsap.to(ConformRidePopPanelRef.current, {
        transform: "translateY(0)",
        display:"none"
       })
    }
  },[confirmRidePopPanel]);

  const handleLogout = () => {
     navigate("/captain-logout")
  }

  async function confirmRide(){ 
    console.log("conform ride function called");
     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm-ride` , { rideId: newRideData._id } , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("captainToken")}`
        }
     });
  }

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
            <SiHomeassistantcommunitystore className="h-6 w-6" />
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
          <UserShow text={captain ? captain.fullname.firstname : "captain"} captain={captain} />
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
            <div className='h-[90vh] mt-18 w-screen p-6 pb-0 '>
                <LiveTracking height={"88vh"} />
                <div className='text-center flex justify-center items-center'>
                  <DriverEarnCard />  
                </div>               
                
            </div>
          <div ref={ridePopPanelRef} className='flex  justify-center items-center  z-60 translate-y-full'>
              <Ridepopup confirmRide={confirmRide} setRidePopPanel={setRidePopPanel} setConformRidePopPanel={setConformRidePopPanel} />
          </div>
          <div ref={ConformRidePopPanelRef} className='flex  justify-center items-center  z-60 translate-y-full'>
              <ConfirmRidepopup setConformRidePopPanel={setConformRidePopPanel} setRidePopPanel={setRidePopPanel} />
          </div>
        </>
    )
}

export default CaptianHome
