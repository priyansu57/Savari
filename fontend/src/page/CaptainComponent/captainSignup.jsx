import React, { useState } from 'react'
import { FaArrowRight, FaUser } from "react-icons/fa";
import { FaRegUser } from 'react-icons/fa6';
import captainLogo from "../../assets/test.png";
import { Link,  } from 'react-router-dom';
import { FaCar } from "react-icons/fa";
import { GiRaceCar } from "react-icons/gi";
import axios from 'axios';
import { UseCaptaionContext } from '../../contextApi/captainContext';
import { toast } from 'react-toastify';

function CaptainSignup() {
const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    color:"",
    plate:"",
    capacity:"",
    vehicleType:"",
  });

  const {captain , setCaptain , navigate } = UseCaptaionContext();

  const handleChange =  (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //         fullname:{
  //            firstname: formData.firstName,
  //            lastname: formData.lastName,
  //         },
  //         email: formData.email,
  //         password: formData.password,
  //         vehicle: {
  //           color: formData.color,
  //           plate: formData.plate,
  //           capacity: formData.capacity,
  //           vehicleType: formData.vehicleType,
  //         },
  //     };
    
  //   const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register` , payload  , {withCredentials: true} );

  //   if (res.status === 201) {
  //      const data = res.data;
  //      console.log(data);
  //      setCaptain(data.captain);
  //      localStorage.setItem("captainToken" , data.captain);
  //      navigate("/captain-home");
  //   }

  //   setFormData({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   color:"",
  //   plate:"",
  //   capacity:"",
  //   vehicleType:"",
  // })

  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    fullname: {
      firstname: formData.firstName,
      lastname: formData.lastName,
    },
    email: formData.email,
    password: formData.password,
    vehicle: {
      color: formData.color,
      plate: formData.plate,
      capacity: formData.capacity,
      vehicleType: formData.vehicleType,
    },
  };

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      payload,
      { withCredentials: true }
    );

    if (res.status === 201) {
      const data = res.data;
      console.log("Captain Registration Response:", data);

      setCaptain(data.captain);
      localStorage.setItem("captainToken", data.captainToken);

      toast.success("Captain registered successfully!");
      navigate("/captain-home");
    }
  } catch (error) {
    console.error("Captain Register Error:", error);

    if (error.response) {
      toast.error(error.response.data.message || "Registration failed!");
    } else if (error.request) {
      toast.error("No response from server. Please try again later.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } finally {
    // Reset form fields after attempt
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    });
  }
};

    return (
        <>
     <div className='h-2 w-35 ml-4 mt-[-20px]' >
            <img src={captainLogo} alt="Savari" />
        </div>
    <div className="flex justify-center items-center flex-col min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className=" p-8  rounded-2xl  w-full max-w-md"
      >
        <div className='flex gap-4 items-center justify-center '>
             <FaCar className='text-3xl mb-6'  />
            <h2 className="text-3xl font-bold font-san text-center mb-6 text-gray-800">
              Captain Signup
            </h2>
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            First Name :
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Last Name :
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Email :
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password :
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
            required
          />
        </div>

        {/* Vehicle Section */}
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Vehicle Details : </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Vehicle Color */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Color :
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Enter vehicle color"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none"
              required
            />
          </div>

          {/* Vehicle Plate */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Plate :
            </label>
            <input
              type="text"
              name="plate"
              value={formData.plate}
              onChange={handleChange}
              placeholder="Enter plate number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none"
              required
            />
          </div>

          {/* Vehicle Capacity */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Capacity :
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Seats"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none"
              required
              min="1"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Type :
            </label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600 focus:outline-none"
              required
            >
              <option value="">Select type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>



    {/* Submit Button  */}
         <button
          type="submit"
          className="w-full bg-black text-white mt-4 py-2 rounded-lg font-semibold transition"
        >
         Create Captain Account
        </button>

        <p  className="text-gray-500/90 text-sm  mt-4 text-center">Already have a account ? <Link  className="text-indigo-400 hover:underline" to={"/captain-login"} >Login here</Link></p>
      </form>
             <p className='mt-2'>By proceeding , you consent to get calls , whatsApp or SMS messages , including by automated means , from Savari and its affiliates to the number provided.</p>

    </div>
        </>
    )
}


export default CaptainSignup
