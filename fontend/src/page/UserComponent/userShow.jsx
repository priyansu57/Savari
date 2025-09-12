import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserShow({ text , user }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className="relative inline-block text-left"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* User button */}
      <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
        <button className="flex items-center gap-2 px-6 py-3 text-sm text-black rounded-full font-medium bg-gray-300/80 backdrop-blur">
          <FaUser className="text-lg" />
          {text}
        </button>
      </div>

      {/* Dropdown (UserShow) */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-2xl p-4 z-50">
          <h2 className="font-bold text-lg">{user && user?.fullname?.firstname ? user.fullname.firstname + " " + user?.fullname.lastname : "user"}</h2>
          <div className="grid grid-cols-3 gap-2 my-4">
            <div className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-lg">
              <span className="text-sm font-medium">Help</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-lg">
              <span className="text-sm font-medium">Wallet</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-lg">
              <span className="text-sm font-medium">Activity</span>
            </div>
          </div>

          <div className="py-2 border-t text-sm">
            <div className="flex justify-between">
              <span>Uber Cash</span>
              <span>₹0.00</span>
            </div>
            <div className="mt-2">Manage account</div>
            <div className="mt-2">Promotions</div>
          </div>

          <button className="text-red-500 mt-4 w-full text-center font-medium" onClick={() => navigate("/users/logout")}>
            Logout 
          </button>
        </div>
      )}
    </div>

   
  );
}

//"https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"

