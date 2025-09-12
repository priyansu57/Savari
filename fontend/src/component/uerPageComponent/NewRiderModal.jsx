import { useState } from "react";
import { IoClose } from "react-icons/io5"; // close icon
import { UseContext } from "../../contextApi/context";

export default function NewRiderModal({ onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const isDisabled = !firstName || !lastName || !phone;
  const {setIsnewRider ,setSelected , isnewRider ,userRider , setUserRider} = UseContext();


  const handleToggle = () => {
    setIsnewRider(false);
  };

  const handleSubmit = (e) => {
       e.preventDefault();
        userRider.push(`${firstName} ${lastName}`);
        setIsnewRider(false);
        setSelected(`${firstName} ${lastName}`);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={handleToggle}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <IoClose size={24} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold">New rider</h2>
        <p className="text-sm text-gray-700 mt-1">
          Drivers will see this name.
        </p>

         <form onSubmit={handleSubmit} >
              {/* First Name */}
            <div className="mt-4">
              <label className="text-sm text-gray-700">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Last Name */}
            <div className="mt-3">
              <label className="text-sm text-gray-700">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Phone number */}
            <div className="mt-3">
              <label className="text-sm text-gray-700">Phone number</label>
              <div className="flex mt-1">
                <select className="border border-gray-300 rounded-l-md bg-gray-100 px-3 py-2 focus:outline-none">
                  <option value="IN">IN</option>
                  <option value="US">US</option>
                  <option value="UK">UK</option>
                </select>
                <input
                  type="tel"
                  placeholder="+91"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>


         

       

        {/* Info text */}
        <p className="text-xs text-gray-500 mt-3">
          Uber won't share this phone number with drivers
        </p>
        <p className="text-xs text-gray-500 mt-1">
          By tapping "Add rider", you confirm that your friend agreed to share
          their contact information with Uber and to receive SMS about this trip.
        </p>

        {/* Add rider button */}
        <button
          disabled={isDisabled}

          className={`mt-4 w-full py-3 rounded-md font-medium ${
            isDisabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Add rider
        </button>

      </form>

      </div>
    </div>
  );
}

