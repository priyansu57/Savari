import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaRegUser } from 'react-icons/fa6';
import logo from "../../assets/Sevari_black_log.png"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { UseContext} from '../../contextApi/context';
import { toast } from 'react-toastify';

function UserSignup() {
const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

     const navigate = useNavigate();
   const {user , setUser} = UseContext();

  const handleChange =  (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("User Signup Data:", formData);
  

  //    const newUser = {
  //     fullname:{
  //           firstname:formData.firstName,
  //           lastname:formData.lastName
  //       },
  //      email:formData.email,
  //      password:formData.password,
  //   };

  //   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register` , newUser ,{withCredentials : true})

  //   console.log("User Signup Response from user:", response);
  //   if(response.status === 201){
  //     const data = response.data
       
  //     setUser(data.user);
  //      localStorage.setItem("userToken" , data.token);
  //      navigate("/home")
  //   }

  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("User Signup Data:", formData);

  const newUser = {
    fullname: {
      firstname: formData.firstName,
      lastname: formData.lastName,
    },
    email: formData.email,
    password: formData.password,
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser,
      { withCredentials: true }
    );

    console.log("User Signup Response:", response);

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("userToken", data.token);
      toast.success("Signup successful!");
      navigate("/home");
    }
  } catch (error) {
    console.error("Signup Error:", error);

    if (error.response) {
      // backend response (like 400, 401, etc.)
      toast.error(error.response.data.message || "Something went wrong!");
    } else if (error.request) {
      // no response from backend
      toast.error("No response from server. Please try again later.");
    } else {
      // any other error
      toast.error("Unexpected error occurred.");
    }
  }
};

    return (
        <>
     <div className='h-2 w-35 ml-4 mt-[-20px]' >
            <img src={logo} alt="Savari" />
        </div>
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className=" p-8  rounded-2xl  w-full max-w-md"
      >
        <div className='flex gap-4 items-center justify-center '>
             <FaRegUser className='text-3xl mb-6'  />
            <h2 className="text-3xl font-bold font-san text-center mb-6 text-gray-800">
               User Signup
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg font-semibold transition"
        >
          Create User Account
        </button>
               <p  className="text-gray-500/90 text-sm  mt-4 text-center">Already have a account ? <Link  className="text-indigo-400 hover:underline" to={"/login"} >Login here</Link></p>
      </form>
             <p className='mt-8'>By proceeding , you consent to get calls , whatsApp or SMS messages , including by automated means , from Savari and its affiliates to the number provided.</p>

    </div>
        </>
    )
}

export default UserSignup
