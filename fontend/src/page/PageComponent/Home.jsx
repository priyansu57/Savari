

import React, { useState, useEffect } from "react";
import logo from "../../assets/Sevari_black_log.png";
import { NavLink } from "react-router-dom";
import { FaCar, FaBars, FaTimes } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import Button from "../../component/uerPageComponent/Button";
import UserShow from "../UserComponent/userShow";
import Other from "../../component/uerPageComponent/NewRiderModal";
import RideOptions from "../../component/uerPageComponent/RideOption";
import ConformRideDetails from "../../component/uerPageComponent/ConformRideDetails";
import PaymentBar from "../../component/uerPageComponent/PaymentBar";
import Lookingfordriver from "../../component/uerPageComponent/Lookingfordriver";
import RideForm from "./RiderForm";
import axios from "axios";
import { UseContext } from "../../contextApi/context";
import { UseSocketContext } from "../../contextApi/Socket.context";
import LiveTracking from "../../component/LiveTracking/LiveTracking";

function Home() {
  const { sendMessage, socket } = UseSocketContext();

  const [time, setTime] = useState("");
  const [selectVehicle, setSelectVehicle] = useState(false);
  const [rider, setRider] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  let {
    user,
    navigate,
    paymentMethod,
    setRideDetails,
    setOtp,
    setlookingForDriver,
    pickup,
    lookingForDriver,
    setPickup,
    dropoff,
    setDropoff,
    rideVehiclOption,
    isnewRider,
    setrideConform,
    rideConform,
  } = UseContext();

  const isDisabled = !pickup || !dropoff || !time;

  const handleLogout = () => {
    navigate("/users/logout");
  };

  useEffect(() => {
    if (user?._id) {
      sendMessage("join", { userId: user._id, userType: "user" });
    }
  }, [user]);

  async function createRide(vehicleType) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination: dropoff,
          vehicleType: vehicleType.toLowerCase(),
          paymentType: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      setRider(response.data);
      setOtp(response.data.otp);
      console.log("Ride created successfully:", response.data);
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  }

  socket.on("ride-confirmed", (data) => {
    console.log("Ride confirmed data in Home.jsx : ", data);
    setRideDetails(data);
    setlookingForDriver(false);
    navigate("/riding");
  });

  socket.on("cancel_ride", (data) => {
    console.log("Ride cancelled data in Home.jsx : ", data);
    setrideConform(false);
    setlookingForDriver(false);
    setRider({});
    alert("Ride has been cancelled by driver");
    navigate("/home");
  });

  return (
    <>
      {/* Header */}
     {/* Header */}
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
            to="/home"
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
            to="/riding"
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
          <UserShow text={user ? user.fullname.firstname : "user"} user={user} />
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
            to="/home"
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
            to="/riding"
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
            <UserShow text={user ? user.fullname.firstname : "user"} user={user} />
            <Button text={"Logout"} handleLogout={handleLogout} />
          </div>
        </div>
      )}
    </header>

      {/* Content Part */}
      {isnewRider && <Other />}

      <div className="grid grid-cols-1 mt-24 z-[-20px] gap-4 md:grid-cols-2 lg:grid-cols-3 w-full h-full md:h-[85vh] p-6">
        {/* RideForm */}
        <div className="order-1 z-0 ">
          <RideForm setSelectVehicle={setSelectVehicle} />
        </div>

        {/* RideOptions + Payment */}
        <div className={`order-2  ${(rideConform || selectVehicle) ? "flex" :  "hidden" }   flex-col  justify-between items-center p-4`}>
          {rideConform ? (
            lookingForDriver ? (
              <Lookingfordriver rider={rider} />
            ) : (
              <ConformRideDetails rider={rider} />
            )
          ) : (
           
            selectVehicle && (
    <div className="order-2  flex-col justify-between items-center ">
      <RideOptions />
      <div className="bg-gray-200 w-[93%] flex flex-row justify-between items-center mt-4 p-2 rounded-2xl shadow">
        <PaymentBar />
        <button
          className="h-12 w-[90%] bg-black text-white rounded-2xl"
          onClick={() => {
            setrideConform(true);
            createRide(rideVehiclOption.name);
          }}
        >
          Request {rideVehiclOption.name}
        </button>
      </div>
    </div>
  )
          )}
        </div>

        <div
    className={`order-3    transition-all duration-300 
      ${selectVehicle ? "md:col-span-2 lg:col-span-1" : "md:col-span-2 lg:col-span-2"}`}
  >
    <LiveTracking height={selectVehicle ? "74vh" : "80vh"} />
  </div>
      </div>
    </>
  );
}

export default Home;
