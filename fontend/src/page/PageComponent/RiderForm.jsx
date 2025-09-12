import React, { useState, useEffect } from "react";
import { FaTruckPickup } from "react-icons/fa";
import { RiMapPinTimeFill } from "react-icons/ri";
import axios from 'axios';
import { UseContext } from "../../contextApi/context";
import logo from "../../assets/Sevari_black_log.png"
// import Dropupper from "./Dropupper";

function RideForm({ setSelectVehicle }) {
   const { navigate, pickup, setPickup, dropoff, setDropoff , fare , setFare } = UseContext();
  const [time, setTime] = useState("");
  const isDisabled = !(pickup && dropoff && time);

  // Suggestions state
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  

  useEffect (  () => {

    if (pickup) {
     
        async function fetchData() {
            try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: pickup },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
                });
                // console.log("Fetched pickup suggestions:", response.data.description);
                setPickupSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching pickup suggestions:", error);
            }
        }

       fetchData();

    } else {
      setPickupSuggestions([]);
    }
  }, [pickup]);

  useEffect(() => {
    if (dropoff) {
       async function fetchData() {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                        params: { input: dropoff },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('userToken')}`
                        }
                });
                //  console.log("Fetched dropoff suggestions:", response.data.description);
                    setDropoffSuggestions(response.data);
                } catch (error) {
                    console.error("Error fetching dropoff suggestions:", error);
                }
        }

       fetchData();
    } else {
      setDropoffSuggestions([]);
    }
  }, [dropoff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelectVehicle(true);
    // console.log({ pickup, dropoff, time });

      try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination: dropoff },
                headers: {
                   Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
          });
            // console.log("Fetched fare:", response);
            setFare(response.data);
        } catch (error) {
            console.error("Error fetching fare:", error);
       }
  };

  return (
   
        <form onSubmit={handleSubmit}>
            <div className="flex z[-20px] flex-col justify-center rounded-2xl border border-gray-200 m-auto bg-gray-50 h-auto w-[26rem] p-6 gap-6 shadow-md">
                <p className="font-semibold text-3xl  text-gray-800">Ride with Savari</p>

                {/* Pickup */}
                <div className="relative w-full">
                <label className="block mb-2 text-balance font-semibold text-gray-700 ml-1">
                    Pickup Location <span className="text-red-500">*</span> :
                </label>

                <FaTruckPickup className="absolute left-4 top-[3.1rem] text-gray-700 text-2xl" />
                <input
                    type="text"
                    placeholder="Enter......."
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    onFocus={() => setShowPickupSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 150)}
                    className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 bg-gray-200 focus:ring-2 focus:ring-black focus:bg-white focus:outline-none text-lg"
                />

                {/* Suggestions dropdown */}
                {showPickupSuggestions && pickupSuggestions.length > 0 && (
                    <ul className="absolute top-[6.5rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {pickupSuggestions.map((s, idx) => (
                        <li
                        key={idx}
                        onMouseDown={() => {
                            setPickup(s.description);
                            setShowPickupSuggestions(false);
                        }}
                        className="px-4 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer text-base"
                        >
                        {s.description}
                        </li>
                    ))}
                    </ul>
                )}
                </div>

                {/* Dropoff */}
                <div className="relative w-full">
                <label className="block mb-2 text-balance font-semibold text-gray-700 ml-1">
                    Dropoff Location <span className="text-red-500">*</span> :
                </label>
                <FaTruckPickup className="absolute left-4 top-[3.1rem] text-gray-700 text-2xl" />
                <input
                    type="text"
                    placeholder="Enter......."
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    onFocus={() => setShowDropoffSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowDropoffSuggestions(false), 150)}
                    className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-lg bg-gray-200 focus:ring-2 focus:ring-black focus:bg-white focus:outline-none text-lg"
                />

                {/* Suggestions dropdown */}
                {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                    <ul className="absolute top-[6.5rem] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {dropoffSuggestions.map((s, idx) => (
                        <li
                        key={idx}
                        onMouseDown={() => {
                            setDropoff(s.description);
                            setShowDropoffSuggestions(false);
                        }}
                        className="px-4 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer text-base"
                        >
                        {s.description}
                        </li>
                    ))}
                    </ul>
                )}
                </div>

                {/* Time */}
                <div className="relative w-full">
                <label className="block mb-2 text-balance font-semibold text-gray-700 ml-1">
                    Pickup Time <span className="text-red-500">*</span> :
                </label>
                <RiMapPinTimeFill className="absolute left-4 top-[3.1rem] text-gray-700 text-2xl" />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 bg-gray-200 focus:ring-2 focus:ring-black focus:bg-white focus:outline-none text-lg"
                />
                </div>

                {/* Button */}
                <button
                disabled={isDisabled}
                className={`py-4 rounded-lg font-semibold text-lg transition-all border border-gray-300 ${
                    isDisabled
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
                >
                Add Rider
                </button>

               <div className="text-center text-sm text-gray-600 mt-4 flex flex-col justify-center items-center">
                 {/* <p>Savari – not just a ride, but an experience of trust and comfort.</p> */}
                    <div className='flex justify-center items-center '>
                        <img src={logo} alt="Savari" className='h-14 w-14' />
                        <p className='text-center mb-1'> – Your journey, our responsibility</p>
                    </div>
               </div>

            </div>
        </form>

  );
}

export default RideForm;




