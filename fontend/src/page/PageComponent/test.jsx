import React from "react";
import { FaCarSide } from "react-icons/fa";
// import videoFile from "../assets/landing-video.mp4"; // adjust path
import add from "../../assets/black_car.mp4"
function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        src={add}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

     <h1 className="text-red-500">HEllo</h1>
     
      {/* Checker line at bottom */}
      {/* <div className="absolute bottom-0 w-full flex">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`h-3 w-6 ${i % 2 === 0 ? "bg-black" : "bg-white"}`}
          ></div>
        ))}
      </div> */}
    </div>
  );
}

export default HeroSection;


//  <div className='flex flex-col-reverse lg:flex-row  items-baseline  md:mt-10  '>
//             <div className='m-auto mt-2'>
//               <form onSubmit={handleSubmit} >
//                 <div className='flex flex-col rounded-2xl border border-gray-200 bg-gray-50 h-auto w-80  gap-4 '>
//                     <p className='mt-2 ml-4.5 font-bold text-2xl'>Get a ride</p>
                   
//                     <div className="relative w-72 ">
//                             {/* Icon */}
//                             <FaTruckPickup className="absolute left-6 top-1/2 -translate-y-1/2 text-black text-2xl  " />

//                             {/* Input */}
//                             <input
//                                 type="text"
//                                 placeholder="Pickup location"
//                                 value={pickup}
//                                 onChange={(e) => setPickup(e.target.value)}
//                                 className="pl-10 pr-4 py-2 ml-4 w-full rounded-lg  bg-gray-200 focus:ring-2 focus:ring-black focus:bg-white focus:outline-none"
//                             />
//                     </div>
 
//                      <div className="relative w-72 ">
//                             {/* Icon */}
//                             <FaTruckPickup className="absolute left-6 top-1/2 -translate-y-1/2 text-black text-2xl  " />

//                             {/* Input */}
//                             <input
//                                 type="text"
//                                 placeholder="Dropoff location"
//                                  value={dropoff}
//                                 onChange={(e) => setDropoff(e.target.value)}
//                                 className="pl-10 pr-4 py-2 ml-4 w-full rounded-lg  bg-gray-200 focus:ring-2 focus:ring-black focus:bg-white focus:outline-none"
//                             />
//                     </div>

//                      <div className="relative w-72 ">
//                             {/* Icon */}
//                             <RiMapPinTimeFill className="absolute left-6 top-1/2 -translate-y-1/2 text-black text-2xl  " />

//                             {/* Input */}
//                             <input
//                                 type="time"
//                                 placeholder="Dropoff location"
//                                  value={time}
//                                 onChange={(e) => setTime(e.target.value)}
//                                 className="pl-10 pr-4 py-2 ml-4 w-full rounded-lg  bg-gray-200 focus:ring-2 focus:ring-black focus:bg-white focus:outline-none"
//                             />
//                     </div>
//                    <div className="relative w-72 left-8 ">
//                             {/* Icon */}
//                             {/* <RiMapPinTimeFill className="absolute left-6 top-1/2 -translate-y-1/2 text-black text-2xl  " /> */}
                           
//                             {/* Input */}
//                           < Dropupper />
//                     </div>
//                     <button
//                             disabled={isDisabled}

//                             className={`m-4 py-3 rounded-md font-medium ${
//                                 isDisabled
//                                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                                 : "bg-black text-white hover:bg-gray-800"
//                             }`}
//                             >
//                             Add rider
//                     </button>
//                 </div>
//                </form>   
//             </div>
//             <div className={`h-20 w-96 border-2 ${selectVehicle ? "hidden" : "inline"} `}>

//             </div>
//             <div className=' h-full md:h-80 lg:h-[650px] md:m-auto rounded-2xl lg:m-auto sm:w-full md:w-[80%]   lg:w-full  '>
//                 <img className='h-full w-full object-cover  md:rounded-2xl' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map" />
//             </div>
           
//         </div> 