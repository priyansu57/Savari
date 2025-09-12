import React from "react";
import { UseContext } from "../../contextApi/context";
import { FaUser } from "react-icons/fa";

function Dropupper () {
    const [isOpen, setIsOpen] = React.useState(false);
   

   
    const { setIsnewRider , userRider ,selected ,setSelected} = UseContext();
      const countries = ["For me" , "Other"];
    const handleSelect = (country) => {
        setSelected(country);
        setIsOpen(false);

        console.log("userRider :" , userRider);
        

        if (country === "Other") {
            setIsnewRider(true);
        };

    };

    return (
        <div className="flex flex-col w-44 text-sm relative">
            <button type="button" onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-4 pr-2 py-2 flex justify-between items-center  border rounded-2xl bg-black text-white border-gray-300 shadow-sm  focus:outline-none"
            >
                <div className="flex justify-center items-center gap-2 ">
                    <span><FaUser /> </span>  
                     <span>{selected}</span>
                </div>
                <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <ul className="w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 ">
                    {userRider.map((country) => (
                        <li key={country} className="px-4 py-2  hover:bg-black hover:text-white cursor-pointer" onClick={() => handleSelect(country)} >
                            {country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default  Dropupper