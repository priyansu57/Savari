// import React, { useState } from 'react'
// import { MdLanguage } from "react-icons/md";
// import { IoMdLogIn } from "react-icons/io";
// import hand from  "../../assets/hand-banner.png"
// import map from "../../assets/map.png"
// import { FaLocationArrow } from "react-icons/fa";
// import { MdRadioButtonUnchecked, MdCheckBoxOutlineBlank } from "react-icons/md";
// import { UseContext } from '../../contextApi/context';
// import HeroSection from './test';
// import add from "../../assets/black_car.mp4"
// import hey from"../../assets/vid-heylook.mp4"
// import savari from"../../assets/vid-savari.mp4"
// import RideFormIndexPage from './RideFormIndexPage';

// function Page() {

//     const [isShow , setIsshow] = useState(false);
//     const { navigate,pickup , setPickup, dropoff , setDropoff } = UseContext();

//     console.log(isShow);
    

//     return (
//         <>
//          <div className='h-screen    bg-black text-white'>
//             {/* Nav bar of landing page .... */}
//             <div className='flex flex-col  ml-[20%] mr-[20%]  '>
//                 <div className='flex justify-between w-full mt-20 '>
//                     <div className='flex flex-row justify-around items-center gap-6 '>
//                         <p className='text-3xl mr-4'>Savari</p>
//                         <p>Company</p>
//                         <p>Safety</p>
//                         <p>Help</p>
//                     </div>
//                     <div className='flex flex-row justify-around gap-8' >
//                         <div className='flex justify-center items-center gap-1.5'>
//                         <MdLanguage /> 
//                         <span>EN</span>
//                         </div>
//                         <div className='flex justify-center items-center gap-1.5 cursor-pointer group' onClick={() => navigate("/login")  } >
//                            <IoMdLogIn className='group-hover:translate-x-2  transition-all duration-700 ease-in-out ' />
//                             <span>Product Login</span>
//                         </div> 

//                         <button onClick={() => navigate("/signup")  } className='rounded-2xl bg-white cursor-pointer hover:bg-gray-200 text-black pl-2 pr-2 pt-1 pb-1'>
//                             Sign up
//                         </button>
//                     </div>
//                 </div>
//                 <div className='flex flex-row  items-center justify-center gap-2  h-60 w-full mt-10' >
//                     <div className=''>
//                         <div className='text-5xl mb-2'>Request</div>
//                         <div className='text-8xl font-bold'>A Ride Now! </div>
//                     </div>
//                     <div className='bg-blue-400 w-[20%]'>
//                         <img className='h-full w-full' src={hand} alt="hand" />
//                     </div>
//                 </div>
//                 <div className=' h-80 flex flex-row gap-4  justify-between ml-14' >
//                     {/* text */}
//                     <div className=' h-full w-[50%] bg-cover bg-center rounded-2xl ' style={{backgroundImage: `url(${map})`}}>
//                        <div className=' cursor-pointer active:scale-x-105 h-36 w-36   bg-black rounded-br-2xl pt-0 pl-0 p-4'>
//                           <div onClick={() => setIsshow(!isShow)} className=' h-full w-full bg-gray-800 hover:bg-gray-700 rounded-2xl text-center flex flex-col justify-center items-center '>
//                            <p className='text-2xl'>Book</p>
//                            <p className='text-2xl' >Now!</p>
//                           </div>
//                        </div>
//                     </div>
//                             <div className="relative w-[50%] h-full rounded-2xl overflow-hidden">
//                                       {isShow ? (
//                                         <div
//                                           className="transition-all duration-900 ease-in-out translate-x-5 opacity-100 bg-transparant p-4 rounded-lg"
//                                         >
//                                           <RideFormIndexPage />
//                                         </div>
//                                       ) : (
//                                         <div>
//                                             <video
//                                               src={hey}
//                                               autoPlay
//                                               loop
//                                               muted
//                                               playsInline
//                                               className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
//                                             />
//                                         </div>
                                      
//                                       )}
//                                 </div>
//                 </div>
//              </div>
//         </div>
//         </>
//     )
// }

// export default Page



import React, { useState } from 'react'
import { MdLanguage } from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import hand from  "../../assets/hand-banner.png"
import map from "../../assets/map.png"
import { UseContext } from '../../contextApi/context';
import RideFormIndexPage from './RideFormIndexPage';
import hey from"../../assets/vid-heylook.mp4"

function Page() {
  const [isShow , setIsshow] = useState(false);
  const { navigate } = UseContext();

  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Navbar */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 flex flex-col'>
        <div className='flex justify-between items-center w-full py-6'>
          {/* Left Nav */}
          <div className='flex flex-row flex-wrap items-center gap-4 sm:gap-6'>
            <p className='text-2xl sm:text-3xl font-bold cursor-pointer'>Savari</p>
            <p className='hidden sm:block cursor-pointer'>Company</p>
            <p className='hidden sm:block cursor-pointer'>Safety</p>
            <p className='hidden sm:block cursor-pointer'>Help</p>
          </div>

          {/* Right Nav */}
          <div className='flex flex-row items-center gap-4 sm:gap-8 text-sm sm:text-base'>
            <div className='flex items-center gap-1 cursor-pointer'>
              <MdLanguage className="text-lg" /> 
              <span>EN</span>
            </div>

            <div
              className='flex items-center gap-1 cursor-pointer group'
              onClick={() => navigate("/login")}
            >
              <IoMdLogIn className='group-hover:translate-x-1 transition-transform duration-500' />
              <span className="hidden sm:block">Login</span>
            </div> 

            <button
              onClick={() => navigate("/signup")}
              className='rounded-lg bg-white hover:bg-gray-200 text-black px-3 py-1 text-sm sm:text-base'
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className='flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 mt-10'>
          {/* Text */}
          <div className='text-center lg:text-left'>
            <div className='text-4xl sm:text-5xl mb-2'>Request</div>
            <div className='text-6xl sm:text-7xl lg:text-8xl font-bold'>A Ride Now!</div>
          </div>

          {/* Hand Image */}
          <div className='w-32 sm:w-40 lg:w-[20%]'>
            <img className='h-full w-full object-contain' src={hand} alt="hand" />
          </div>
        </div>

        {/* Map + RideForm/Video */}
        <div className='flex flex-col lg:flex-row gap-6 mt-10 w-full'>
          {/* Map + Book Button */}
          <div
            className='relative h-64 sm:h-80 lg:h-[400px] w-full lg:w-1/2 bg-cover bg-center rounded-2xl'
            style={{backgroundImage: `url(${map})`}}
          >
            <div className='absolute top-0 left-0 cursor-pointer h-34 w-34 sm:h-28 sm:w-28 bg-black rounded-br-2xl'>
              <div
                onClick={() => setIsshow(!isShow)}
                className='h-full w-full bg-gray-800 hover:bg-gray-700 rounded-2xl flex flex-col justify-center items-center'
              >
                <p className='text-lg sm:text-xl'>Book</p>
                <p className='text-lg sm:text-xl'>Now!</p>
              </div>
            </div>
          </div>

          {/* RideForm / Video */}
          <div className="relative h-64 sm:h-80 lg:h-[400px] w-full lg:w-1/2 rounded-2xl overflow-hidden">
            {isShow ? (
              <div className="h-full w-full p-4 bg-black/30 rounded-lg">
                <RideFormIndexPage />
              </div>
            ) : (
              <video
                src={hey}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page




function RideBooking() {
  const { navigate,pickup , setPickup, dropoff , setDropoff } = UseContext();
  return (
    <div className="bg-transparent p-6 rounded-lg max-w-md mx-auto">
      {/* Input Fields */}
      <div className="space-y-3">
        {/* Pickup Location */}
        <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow">
          <MdRadioButtonUnchecked className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Enter pickup location"
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            onChange={(e) => setPickup(e.target.value) }
          />
          <FaLocationArrow className="text-gray-400" />
        </div>

        {/* Destination */}
        <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow">
          <MdCheckBoxOutlineBlank className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Enter destination"
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
             onChange={(e) => setDropoff(e.target.value) }
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6 gap-4">
        <button onClick={() => navigate("/home")} className="flex-1 bg-black text-white border border-white px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition">
          Request now
        </button>
        <button className="flex-1 bg-gray-100 text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
          Schedule for later
        </button>
      </div>
    </div>
  );
}






function LocationSearchInput({ placeholder, onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch places from Google Places API
  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.predictions) {
        setSuggestions(data.predictions);
      }
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSelect = (place) => {
    setQuery(place.description);
    setSuggestions([]);
    if (onSelect) onSelect(place.description);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border shadow outline-none text-gray-700"
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white rounded-lg shadow mt-1 z-10">
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {place.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

















