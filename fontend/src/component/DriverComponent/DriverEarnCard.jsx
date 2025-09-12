import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaTachometerAlt, FaClipboardList } from "react-icons/fa";
import { PiArrowFatLineDownDuotone } from "react-icons/pi";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { UseCaptaionContext } from "../../contextApi/captainContext";

function DriverEarnCard() {
  const [visible, setVisible] = useState(true);
  const {captain} = UseCaptaionContext();

  return (
    <div className="w-2xl mx-auto absolute bottom-4 bg-white rounded-2xl shadow-lg overflow-hidden" >
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setVisible(!visible)} // hide card when avatar clicked
        >
          <img
            src="https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
            alt="profile"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-800 capitalize">{captain && captain?.fullname?.firstname ? captain.fullname.firstname + " " + captain?.fullname.lastname : "Captain"}</h2>
            <p className="text-sm text-gray-500">Basic level</p>
          </div>
        </div>

        <div className="flex justify-center cursor-pointer relative">
            {/* Oval Background */}
            <div onClick={() => setVisible(!visible)} className="text-2xl ">
              {visible ? <IoIosArrowDown /> : <IoIosArrowUp /> }
            </div>
            <div className="absolute top-4 w-52 h-15 bg-blue-300/50 rounded-full blur-sm "></div>
             <div className="absolute top-6 w-38 h-10 bg-blue-400/60 rounded-full blur-sm "></div>
            {/* Car Image */}
            <img
                src={"https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png"}
                alt="Car"
                className="relative w-20 h-20 object-contain "
            />
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold">$325.00</p>
          <p className="text-sm text-gray-400">Earned</p>
        </div>
      </div>

      {/* Animated Stats Card */}
      <AnimatePresence>
        {visible && (
          <motion.div
           key="stats" // important for AnimatePresence to track re-mount
            initial={{ y: 150, opacity: 0 }}   // when first mounted
            animate={{ y: 0, opacity: 1 }}     // when visible = true
            // exit={{ y: 150, opacity: 0 }}      // when visible = false
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-gray-900 grid grid-cols-3 text-center py-6"
          >
            <div>
              <FaClock className="mx-auto mb-2 text-white" size={24} />
              <p className="text-lg font-bold text-white">10.2</p>
              <p className="text-xs text-white">HOURS ONLINE</p>
            </div>
            <div>
              <FaTachometerAlt className="mx-auto mb-2 text-white" size={24} />
              <p className="text-lg font-bold text-white">30 KM</p>
              <p className="text-xs text-white">TOTAL DISTANCE</p>
            </div>
            <div>
              <FaClipboardList className="mx-auto mb-2 text-white" size={24} />
              <p className="text-lg font-bold text-white">20</p>
              <p className="text-xs text-white">TOTAL JOBS</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DriverEarnCard;
