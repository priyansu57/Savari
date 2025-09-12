// import React from 'react'

// function RideFormIndexPage() {
//      const { navigate,pickup , setPickup, dropoff , setDropoff } = UseContext();

//   return (
//     <div className="bg-transparent p-6 rounded-lg max-w-md mx-auto">
//       {/* Input Fields */}
//       <div className="space-y-3">
//         {/* Pickup Location */}
//         <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow">
//           <MdRadioButtonUnchecked className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Enter pickup location"
//             className="flex-1 outline-none text-gray-700 placeholder-gray-400"
//             onChange={(e) => setPickup(e.target.value) }
//           />
//           <FaLocationArrow className="text-gray-400" />
//         </div>

//         {/* Destination */}
//         <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow">
//           <MdCheckBoxOutlineBlank className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Enter destination"
//             className="flex-1 outline-none text-gray-700 placeholder-gray-400"
//              onChange={(e) => setDropoff(e.target.value) }
//           />
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-between mt-6 gap-4">
//         <button onClick={() => navigate("/home")} className="flex-1 bg-black text-white border border-white px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition">
//           Request now
//         </button>
//         <button className="flex-1 bg-gray-100 text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
//           Schedule for later
//         </button>
//       </div>
//     </div>
//   );
// }

// export default RideFormIndexPage


import React, { useState, useEffect } from "react";
import { MdRadioButtonUnchecked, MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import axios from 'axios';
import { UseContext } from "../../contextApi/context";

// Mock of your context usage (replace with your real UseContext hook)
// function UseContext() {
//   const navigate = (path) => console.log("Navigate to:", path);
//   const [pickup, setPickup] = useState("");
//   const [dropoff, setDropoff] = useState("");
//   return { navigate, pickup, setPickup, dropoff, setDropoff };
// }

function RideFormIndexPage() {
  const { navigate, pickup, setPickup, dropoff, setDropoff } = UseContext();

  // States for dropdown suggestions
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);

  // Fetch suggestions from backend (pickup)
  useEffect(() => {
    if (pickup.trim() === "") {
      setPickupSuggestions([]);
      return;
    }
    async function fetchData() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: pickup },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
                });
                console.log("Fetched pickup suggestions:", response.data.description);
                setPickupSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching pickup suggestions:", error);
        }
    }

       fetchData();
  }, [pickup]);

  // Fetch suggestions from backend (dropoff)
  useEffect(() => {
    if (dropoff.trim() === "") {
      setDropoffSuggestions([]);
      return;
    }
    async function fetchData() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: dropoff },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                     }
                });
                 console.log("Fetched dropoff suggestions:", response.data.description);
                    setDropoffSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching dropoff suggestions:", error);
        }
        }

       fetchData();
  }, [dropoff]);

  return (
    <div className="bg-transparent p-6 rounded-lg max-w-md mx-auto">
      {/* Input Fields */}
      <div className="space-y-3">
        {/* Pickup Location */}
        <div className="relative">
          <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow">
            <MdRadioButtonUnchecked className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Enter pickup location"
              value={pickup}
              className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              onChange={(e) => setPickup(e.target.value)}
              onFocus={() => setShowPickupSuggestions(true)}
              onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 150)}
            />
            <FaLocationArrow className="text-gray-400" />
          </div>

          {/* Suggestions Dropdown */}
          {showPickupSuggestions && pickupSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white text-black border border-gray-200 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
              {pickupSuggestions.map((s, idx) => (
                <li
                  key={idx}
                  onMouseDown={() => {
                    setPickup(s.description || s);
                    setShowPickupSuggestions(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {s.description || s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Destination */}
        <div className="relative">
          <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow">
            <MdCheckBoxOutlineBlank className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Enter destination"
              value={dropoff}
              className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              onChange={(e) => setDropoff(e.target.value)}
              onFocus={() => setShowDropoffSuggestions(true)}
              onBlur={() =>
                setTimeout(() => setShowDropoffSuggestions(false), 150)
              }
            />
          </div>

          {/* Suggestions Dropdown */}
          {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border text-black border-gray-200 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
              {dropoffSuggestions.map((s, idx) => (
                <li
                  key={idx}
                  onMouseDown={() => {
                    setDropoff(s.description || s);
                    setShowDropoffSuggestions(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {s.description || s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6 gap-4">
        <button
          onClick={() => navigate("/home")}
          className="flex-1 bg-black text-white border border-white px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition"
        >
          Request now
        </button>
        <button className="flex-1 bg-gray-100 text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
          Schedule for later
        </button>
      </div>
    </div>
  );
}

export default RideFormIndexPage;

