
// import React, { useState } from 'react'
// import { GiTakeMyMoney } from 'react-icons/gi'
// import { RiUserLocationFill, RiUserLocationLine } from 'react-icons/ri'
// import { UseContext } from '../../contextApi/context';
// import { Link, NavLink } from 'react-router-dom';
// import { FaBars, FaCar, FaTimes } from 'react-icons/fa';
// import UserShow from '../../page/UserComponent/userShow';
// import Button from '../uerPageComponent/Button';
// import logo from "../../assets/Sevari_black_log.png"
// import { SiHomeassistantcommunitystore } from "react-icons/si";
// import { UseSocketContext } from '../../contextApi/Socket.context';
// import LiveTracking from '../LiveTracking/LiveTracking';
// import RideMap from '../LiveTracking/RideMap';

// function Ride() {
// const [isOpen, setIsOpen] = useState(false);
//      const {rideVehiclOption ,user , navigate ,setrideConform ,  setlookingForDriver ,rideDetails ,setRideDetails} = UseContext();
//      const { socket } = UseSocketContext();

//     const handleLogout = () => {
//        navigate("/users/logout");
//        console.log("Logout from ride");
       
//     }

   

//       socket.on("ride-completed", (data) => {
//         console.log("Ride completed data:", data);
//             if (data && data.status === "completed") {
//                 navigate("/home");
//                 setRideDetails({});
//                 setrideConform(false);
//                 setlookingForDriver(false);
//             } else {
//                 console.error("Error finishing ride");
//             }       
//        });

//        console.log("Ride details in Ride.jsx : " , rideDetails);

//     return (
//         <>
//          <header className="w-full h-20 bg-gray-100 border-b-4 border-b-gray-200 fixed top-0 left-0 z-50">
//               <div className="flex justify-between items-center px-2 md:px-6  ">
//                 {/* Logo */}
//                 <div className="flex items-center ">
//                   <img
//                     src={logo}
//                     alt="Savari"
//                     onClick={() => navigate("/")}
//                     className="h-22 w-22  cursor-pointer"
//                   />
//                 </div>
        
//                 {/* Desktop Nav */}
//                 <nav className="hidden md:flex items-center gap-8">
//                   <NavLink
//                     to="/home"
//                     className={({ isActive }) =>
//                       `h-18 flex items-center gap-2 border-b-4 transition-colors ${
//                         isActive ? "border-black" : "border-transparent"
//                       }`
//                     }
//                   >
//                     <SiHomeassistantcommunitystore className="h-6 w-6" />
//                     <span className="font-medium">Home</span>
//                   </NavLink>
        
//                   <NavLink
//                     to="/riding"
//                     className={({ isActive }) =>
//                       ` h-17 flex items-center gap-2 border-b-4 transition-colors ${
//                         isActive ? "border-black" : "border-transparent"
//                       }`
//                     }
//                   >
//                     <FaCar className="h-6 w-6" />
//                     <span className="font-medium">Ride</span>
//                   </NavLink>
//                 </nav>
        
//                 {/* User + Logout (Desktop) */}
//                 <div className="hidden md:flex items-center gap-4">
//                   <UserShow text={user ? user.fullname.firstname : "user"} user={user} />
//                   <Button text={"Logout"} handleLogout={handleLogout} />
//                 </div>
        
//                 {/* Mobile Hamburger */}
//                 <button
//                   className="md:hidden text-2xl"
//                   onClick={() => setIsOpen(!isOpen)}
//                 >
//                   {isOpen ? <FaTimes /> : <FaBars />}
//                 </button>
//               </div>
        
//               {/* Mobile Menu (fixed below header, above RideForm) */}
//               {isOpen && (
//                 <div className="md:hidden flex flex-col gap-4 px-4 py-3 bg-gray-50 border-t fixed top-[60px] left-0 w-full z-40 shadow-lg">
//                   <NavLink
//                     to="/home"
//                     className={({ isActive }) =>
//                       `  flex items-center gap-2  ${
//                         isActive ? "text-black font-semibold" : "text-gray-600"
//                       }`
//                     }
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <SiHomeassistantcommunitystore className="h-5 w-5" />
//                     Home
//                   </NavLink>
        
//                   <NavLink
//                     to="/riding"
//                     className={({ isActive }) =>
//                       ` flex items-center gap-2  ${
//                         isActive ? "text-black font-semibold" : "text-gray-600"
//                       }`
//                     }
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <FaCar className="h-5 w-5" />
//                     Ride
//                   </NavLink>
        
//                   {/* User + Logout */}
//                   <div className="flex items-center justify-between">
//                     <UserShow text={user ? user.fullname.firstname : "user"} user={user} />
//                     <Button text={"Logout"} handleLogout={handleLogout} />
//                   </div>
//                 </div>
//               )}
//             </header>
//         {!rideDetails || Object.keys(rideDetails).length === 0 ? (
//             <div className='flex justify-center items-center h-[80vh]'> 
//                 <p className='text-2xl font-semibold text-red-600'>No ongoing ride found.</p>
//             </div>
//             ) : (
//                 <div className='flex flex-col justify-center  lg:flex-row gap-4  md:p-8  w-full h-[90vh]  '>

              

//                 <div className="w-xl h-fit  mr-0 flex flex-col  mt-20  bg-white shadow-2xl shadow-blue-800 border-2 border-gray-200 rounded-2xl p-2 ">
//                        {/* <div className='flex justify-between items-center'>
//                                          <div className="flex justify-center  relative"> */}
//                                              {/* Oval Background */}
//                                              {/* <div className="absolute top-4 w-52 h-34 bg-blue-300/50 rounded-full blur-sm "></div>
//                                               <div className="absolute top-10 w-38 h-24 bg-blue-400/60 rounded-full blur-sm "></div> */}
//                                              {/* Car Image */}
//                                              {/* <img
//                                                  src={rideVehiclOption.img || "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png" }
//                                                  alt="Car"
//                                                  className="relative w-40 h-40 object-contain "
//                                              />
//                                          </div>
             
//                                          <div className='text-right'>
//                                              <h2 className='text-lg font-semibold '>{rideDetails && rideDetails.captain && rideDetails.captain.fullname && rideDetails.captain.fullname.firstname + " " + rideDetails.captain.fullname.lastname}</h2>
//                                              <h4 className='text-xl font-semibold '>{rideDetails && rideDetails.captain && rideDetails.captain.vehicle && rideDetails.captain.vehicle.plate}</h4>
//                                              <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
//                                          </div>
//                                        </div> */}
//                                         <p className='text-2xl font-semibold text-gray-800 m-4 '>Ongoing Ride Details </p>
//                                         <div className='flex justify-between items-center mb-2  p-4 bg-gray-200 rounded-3xl'>
//                                             <div
//                                                 className="flex items-center gap-3 cursor-pointer"
//                                                 >
//                                                 <img
//                                                     src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
//                                                     alt="profile"
//                                                     className="h-12 w-12 rounded-full object-cover"
//                                                 />
//                                                 <div>
//                                                     <div className='text-right'>
//                                                         <h2 className='text-lg font-semibold '>{rideDetails && rideDetails.captain && rideDetails.captain.fullname && rideDetails.captain.fullname.firstname + " " + rideDetails.captain.fullname.lastname}</h2>
//                                                         <h4 className='text-xl font-semibold '>{rideDetails && rideDetails.captain && rideDetails.captain.vehicle && rideDetails.captain.vehicle.plate}</h4>
//                                                         <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="text-right  ">
//                                                 <img
//                                                     src={rideVehiclOption.img || "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png"}
//                                                     alt="Car"
//                                                     className="relative w-20 h-20 object-contain "
//                                                 />
//                                             </div>
//                                         </div>
                                     
//                                        {/* Car Image */}
                                         
                                 
//                                        {/* Pickup */}
//                                        <div className="   px-5 py-5 flex flex-row gap-2">
//                                             <div className=" ">
//                                                 <RiUserLocationFill className="text-4xl mt-2" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-lg font-semibold">562/11-A</p>
//                                                 <p className="text-gray-600 text-sm">
//                                                     { rideDetails && rideDetails.pickup ? rideDetails.pickup : "Pickup location not available" }
//                                                 </p>
//                                             </div>
//                                         </div>
                                 
//                                        {/* Drop */}
//                                        <div className="border-t border-t-gray-300 px-5 py-5 flex flex-row gap-2">
//                                             <div className=" ">
//                                                 <RiUserLocationLine className="text-4xl mt-2" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-lg font-semibold">Third Wave Coffee</p>
//                                                 <p className="text-gray-600 text-sm">
//                                                     { rideDetails && rideDetails.destination ? rideDetails.destination : "Destination location not available" }
//                                                 </p>
//                                             </div>
//                                         </div>
                                 
//                                        {/* Fare */}
//                                        <div className="border-t border-b flex flex-row gap-2 border-t-gray-300 border-b-gray-300 px-5 py-5">
//                                             <div className=" ">
//                                                 <GiTakeMyMoney className="text-4xl mt-2" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-lg font-semibold">₹{rideDetails && rideDetails.fare ? rideDetails.fare : "Fare not available"}</p>
//                                                 <p className="text-gray-600 text-sm">{rideDetails && rideDetails.paymentType ? rideDetails.paymentType : "Payment type not available"}</p>
//                                             </div>
//                                        </div>
//                                        <div className='flex flex-col justify-between items-center gap-2  p-6 '>
//                                             <p className='text-gray-600 text-sm text-center'>
//                                                 Thanks for riding with us! We hope you had a smooth and comfortable trip. Don’t forget to rate your ride and let us know how we did.
//                                             </p>
//                                             <div className='flex justify-center items-center '>
//                                                   <img src={logo} alt="Savari" className='h-14 w-14' />
//                                                 <p className='text-center mb-1'> – Your journey, our responsibility</p>
//                                             </div>
//                                        </div>              
//                 </div>                    
//                 <div className='h-full w-full mt-20 border-2 border-gray-200 rounded-2xl shadow-2xl '>
//                     <RideMap
//               pickup={
//                 rideDetails &&
//                 rideDetails.pickupCoordinates &&
//                 rideDetails.pickupCoordinates.coordinates
//                   ? {
//                       lat: rideDetails.pickupCoordinates.coordinates[1],
//                       lng: rideDetails.pickupCoordinates.coordinates[0],
//                     }
//                   : null
//               }
//               destination={
//                 rideDetails &&
//                 rideDetails.destinationCoordinates &&
//                 rideDetails.destinationCoordinates.coordinates
//                   ? {
//                       lat: rideDetails.destinationCoordinates.coordinates[1],
//                       lng: rideDetails.destinationCoordinates.coordinates[0],
//                     }
//                   : null
//               }
//             />
//                 </div>                     
//           </div>
//             )}
          
//         </>
//     )
// }

// export default Ride


// captain
// : 
// email
// : 
// "sum@gmail.com"
// fullname
// : 
// {firstname: 'Priyansu', lastname: 'Jena'}
// location
// : 
// {type: 'Point', coordinates: Array(2)}
// socketId
// : 
// "eU3OQ1haMK26VP6aAAAv"
// status
// : 
// "inactive"
// vehicle
// : 
// {color: 'red', plate: 'OD-02-2309', capacity: 5, vehicleType: 'car'}
// __v
// : 
// 0
// _id
// : 
// "68b85b392bd1ee2d3dfc819b"
// [[Prototype]]
// : 
// Object
// destination
// : 
// "Biju Patnaik International Airport, Airport Road, Aerodrome Area, Bhubaneswar, Odisha, India"
// fare
// : 
// 330.97
// otp
// : 
// 9050
// paymentType
// : 
// "Cash"
// pickup
// : 
// "GEC Autonomous College, Bhubaneswar, Odisha, India"
// status
// : 
// "accepted"
// user
// : 
// email
// : 
// "sum@gmail.com"
// fullname
// : 
// {firstname: 'Priyansu', lastname: 'Jena'}
// socketId
// : 
// "MIOwd0ImxdfuuHvBAAAz"
// __v
// : 
// 0
// _id
// : 
// "68b8366a4963b40df891239f"
// [[Prototype]]
// : 
// Object
// vehicleType
// : 
// "car"
// __v
// : 
// 0
// _id
// : 
// "68c26f25180b264b305ab4b2"
// [[Prototype]]
// : 
// Object



import React, { useState } from 'react'
import { GiTakeMyMoney } from 'react-icons/gi'
import { RiUserLocationFill, RiUserLocationLine } from 'react-icons/ri'
import { UseContext } from '../../contextApi/context';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaCar, FaTimes } from 'react-icons/fa';
import UserShow from '../../page/UserComponent/userShow';
import Button from '../uerPageComponent/Button';
import logo from "../../assets/Sevari_black_log.png"
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { UseSocketContext } from '../../contextApi/Socket.context';
import RideMap from '../LiveTracking/RideMap';

function Ride() {
  const [isOpen, setIsOpen] = useState(false);
  const { rideVehiclOption, user, navigate, setrideConform, setlookingForDriver, rideDetails, setRideDetails } = UseContext();
  const { socket } = UseSocketContext();

  const handleLogout = () => {
    navigate("/users/logout");
    console.log("Logout from ride");
  }

  socket.on("ride-completed", (data) => {
    console.log("Ride completed data:", data);
    if (data && data.status === "completed") {
      navigate("/home");
      setRideDetails({});
      setrideConform(false);
      setlookingForDriver(false);
    } else {
      console.error("Error finishing ride");
    }
  });

  return (
    <>
      {/* Header */}
      <header className="w-full h-20 bg-gray-100 border-b-4 border-b-gray-200 fixed top-0 left-0 z-50">
        <div className="flex justify-between items-center px-2 md:px-6">
          {/* Logo */}
          <div className="flex items-center ">
            <img
              src={logo}
              alt="Savari"
              onClick={() => navigate("/")}
              className="h-16 w-auto cursor-pointer"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `h-18 flex items-center gap-2 border-b-4 transition-colors ${isActive ? "border-black" : "border-transparent"
                }`
              }
            >
              <SiHomeassistantcommunitystore className="h-6 w-6" />
              <span className="font-medium">Home</span>
            </NavLink>

            <NavLink
              to="/riding"
              className={({ isActive }) =>
                ` h-17 flex items-center gap-2 border-b-4 transition-colors ${isActive ? "border-black" : "border-transparent"
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 px-4 py-3 bg-gray-50 border-t fixed top-[60px] left-0 w-full z-40 shadow-lg">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "text-black font-semibold" : "text-gray-600"}`
              }
              onClick={() => setIsOpen(false)}
            >
              <SiHomeassistantcommunitystore className="h-5 w-5" />
              Home
            </NavLink>

            <NavLink
              to="/riding"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? "text-black font-semibold" : "text-gray-600"}`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaCar className="h-5 w-5" />
              Ride
            </NavLink>

            <div className="flex items-center justify-between">
              <UserShow text={user ? user.fullname.firstname : "user"} user={user} />
              <Button text={"Logout"} handleLogout={handleLogout} />
            </div>
          </div>
        )}
      </header>

      {/* Ride details */}
      {!rideDetails || Object.keys(rideDetails).length === 0 ? (
        <div className='flex justify-center items-center h-[80vh]'>
          <p className='text-2xl font-semibold text-red-600'>No ongoing ride found.</p>
        </div>
      ) : (
        <div className='flex flex-col-reverse lg:flex-row gap-6 w-full h-auto lg:h-[83vh] mt-26 px-4 md:px-8'>
          
          {/* Left Card */}
          <div className="w-full lg:w-[40%] bg-white shadow-2xl shadow-blue-800 border-2 border-gray-200 rounded-2xl p-4">
            <p className='text-2xl font-semibold text-gray-800 mb-4'>Ongoing Ride Details </p>
            
            {/* Captain Info */}
            <div className='flex justify-between items-center mb-4 p-4 bg-gray-200 rounded-3xl'>
              <div className="flex items-center gap-3">
                <img
                  src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
                  alt="profile"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className='text-left'>
                  <h2 className='text-lg font-semibold '>
                    {rideDetails?.captain?.fullname?.firstname} {rideDetails?.captain?.fullname?.lastname}
                  </h2>
                  <h4 className='text-xl font-semibold '>
                    {rideDetails?.captain?.vehicle?.plate}
                  </h4>
                  <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                </div>
              </div>
              <img
                src={rideVehiclOption?.img || "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png"}
                alt="Car"
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Pickup */}
            <div className="flex gap-3 px-2 py-4">
              <RiUserLocationFill className="text-3xl mt-1" />
              <div>
                <p className="text-lg font-semibold">Pickup</p>
                <p className="text-gray-600 text-sm">
                  {rideDetails?.pickup || "Pickup location not available"}
                </p>
              </div>
            </div>

            {/* Drop */}
            <div className="flex gap-3 px-2 py-4 border-t border-gray-300">
              <RiUserLocationLine className="text-3xl mt-1" />
              <div>
                <p className="text-lg font-semibold">Destination</p>
                <p className="text-gray-600 text-sm">
                  {rideDetails?.destination || "Destination location not available"}
                </p>
              </div>
            </div>

            {/* Fare */}
            <div className="flex gap-3 px-2 py-4 border-t border-b border-gray-300">
              <GiTakeMyMoney className="text-3xl mt-1" />
              <div>
                <p className="text-lg font-semibold">
                  ₹{rideDetails?.fare || "N/A"}
                </p>
                <p className="text-gray-600 text-sm">
                  {rideDetails?.paymentType || "Payment type not available"}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className='flex flex-col items-center gap-2 p-4 text-center'>
              <p className='text-gray-600 text-sm'>
                Thanks for riding with us! We hope you had a smooth and comfortable trip. Don’t forget to rate your ride and let us know how we did.
              </p>
              <div className='flex items-center gap-2'>
                <img src={logo} alt="Savari" className='h-12 w-12' />
                <p className='text-gray-700'>– Your journey, our responsibility</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className='w-full lg:flex-1 '>
            <RideMap
              pickup={
                rideDetails?.pickupCoordinates?.coordinates
                  ? {
                    lat: rideDetails.pickupCoordinates.coordinates[1],
                    lng: rideDetails.pickupCoordinates.coordinates[0],
                  }
                  : null
              }
              destination={
                rideDetails?.destinationCoordinates?.coordinates
                  ? {
                    lat: rideDetails.destinationCoordinates.coordinates[1],
                    lng: rideDetails.destinationCoordinates.coordinates[0],
                  }
                  : null
              }
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Ride
