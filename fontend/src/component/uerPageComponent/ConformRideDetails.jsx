import React from "react";
import { UseContext } from "../../contextApi/context";
import { GrLocationPin } from "react-icons/gr";
import { RiUserLocationFill } from "react-icons/ri";
import { RiUserLocationLine } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { UseSocketContext } from "../../contextApi/Socket.context";

function ConformRideDetails({ rider }) {

     const {setrideConform  ,setlookingForDriver ,rideVehiclOption ,lookingForDriver} = UseContext();
     const {socket} = UseSocketContext();

    //  const handleCancelRide = () => {
    //      socket.emit("cancel_ride", { rideId: rider.id });
    //  }

  return (
    <div className="w-full h-auto mt-4 mr-2  bg-white shadow-lg rounded-2xl p-2 ">
            <p className="text-3xl font-semibold mb-4 ml-4 mt-2">Confirm your Ride </p>
      {/* Car Image */}
        <div className="flex justify-center  relative">
            {/* Oval Background */}
            <div className="absolute top-4 w-52 h-16 bg-blue-300/70 rounded-full blur-sm "></div>
             <div className="absolute top-10 w-38 h-8 bg-blue-400/80 rounded-full blur-sm "></div>
            {/* Car Image */}
            <img
                src={rideVehiclOption.img}
                alt="Car"
                className="relative w-20 h-20 object-contain "
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
      <div className="border-t border-b flex flex-row gap-2 border-t-gray-300 border-b-gray-300 px-5 py-5">
         <div className=" ">
           <GiTakeMyMoney className="text-4xl mt-2" />
        </div>
        <div>
            <p className="text-lg font-semibold">₹{ rider.fare}</p>
            <p className="text-gray-600 text-sm">{ rider.paymentType}</p>
        </div>
        
      </div>

      <div className="px-2 py-8  flex flex-row justify-center items-center gap-4 text-white text-center ">
        <button onClick={() => setrideConform(false)} className="text-xl cursor-pointer  bg-red-500 hover:bg-red-600  px-8 py-2 rounded-2xl ">Cancel Ride</button>
        <button  onClick={() => setlookingForDriver(true)} className="text-xl rounded-2xl bg-green-600 hover:bg-green-700 cursor-pointer  px-8 py-2  ">Confirm Ride</button>
      </div>
    </div>
  );
}

export default ConformRideDetails;
