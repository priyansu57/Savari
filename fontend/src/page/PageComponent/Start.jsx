import React from 'react'
import logo from "../../assets/Sevari_black_log.png"
import sevariImg from "../../assets/Savari-image.png"
import { Link } from 'react-router-dom'
import sevari from "../../assets/Servari.png"
// import assetsIcon from "../assets/"
import { FaArrowRight } from "react-icons/fa6";
import videoFile from "../../assets/vid-heylook.mp4";
import add from "../../assets/vid-savari.mp4"
import HeroSection from './test'
import Page from './Page'


function Start() {
    return (
        // <div className=" flex justify-center items-center bg-black h-screen">
        //    <div style={{backgroundImage: `url(${sevariImg})`}} className='  bg-center bg-cover  flex flex-col justify-between items-center  h-[90vh] pt-8 mt-8 w-[30rem] rounded-lg  bg-red-400'>
        //       <div className='h-2 w-35 relative left-[-10em] top-[-2em]' >
        //             <img src={logo} alt="Savari" />
        //         </div>
        //         <div className='bg-white  text-center mb-4  rounded-lg  pb-7 py-4 px-4  '>
        //             <h2 className='text-3xl font-bold ' >Get Started with  Savari </h2>
        //                 <Link to={"/login"} className='group flex items-center gap-2 px-7 mt-5 md:px-9 bg-black h-12
        //                     hover:bg-primary-dull transition rounded text-white cursor-pointer  justify-between '><span className='font-medium'> Continue</span>
        //                     <FaArrowRight  className=' transition group-focus:translate-x-1 group-hover:translate-x-1 '/>
        //                  </Link>
        //         </div>
        //    </div>
        // </div>
    //      <div className="relative w-full h-screen overflow-hidden">
    //   {/* Background video */}
    //   <video
    //     src={add}
    //     autoPlay
    //     loop
    //     muted
    //     playsInline
    //     className="absolute top-0 left-0 w-full h-full object-cover"
    //   />

    //   {/* Overlay content */}
    //   <div className="relative z-10 flex items-center justify-center h-full bg-black/40">
    //     <h1 className="text-white text-4xl md:text-6xl font-bold">
    //       Welcome to Savari 🚖
    //     </h1>
    //     <Link to={"/login"} className='group flex items-center gap-2 px-7 mt-5 md:px-9 bg-black h-12
    //                         hover:bg-primary-dull transition rounded text-white cursor-pointer  justify-between '><span className='font-medium'> Continue</span>
    //                         <FaArrowRight  className=' transition group-focus:translate-x-1 group-hover:translate-x-1 '/>
    //                      </Link>
    //   </div>
    // </div>
    // <HeroSection />
    <Page />
    )
}

export default Start
