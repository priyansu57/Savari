import React, { useRef, useState } from 'react'
import DriverEarnCard from '../../component/DriverComponent/DriverEarnCard'
import { data, NavLink } from 'react-router-dom'
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import { FaCar } from 'react-icons/fa'
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
                            <FaCar className="h-14 w-6" />
                            <span className="font-medium">Captain Ride</span>
                        </NavLink>

                    </div>

                    <div className='flex justify-center items-center gap-4 mr-14 ' >
                          <UserShow text={captain && captain?.fullname?.firstname ? captain.fullname.firstname : "Captain"} user={captain} />
                          <Button text={"Logout"} handleLogout={handleLogout}  />
                          {/* <User text={user ? user.fullname.firstname : "user"}   /> */}
                    </div>
                </div>
            </header>
            <div className='h-[90vh] w-screen p-6 pb-0 '>
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
