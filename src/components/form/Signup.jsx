'use client'
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { FiMail } from 'react-icons/fi'; // Icon for Email
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Icons for password visibility
import { FaUser } from 'react-icons/fa'; // Icon for Name
import ecobazaar from '../../app/images/ecobazaar.jpg';
import Image from 'next/image';
import Link from 'next/link'; // Correct import for Link component

const Signup = ({ isOpen, setIsOpen }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className={`fixed inset-0 z-40 ${isOpen ? 'backdrop-blur-sm' : ''}`} />
      
      <Popup open={isOpen} modal onClose={() => setIsOpen(false)}>
        {close => (
          <div className="relative w-[300px] md:w-[500px] bg-white rounded-lg shadow-lg mx-auto p-4 sm:p-8 z-50">
            {/* Close button */}
            <button className="absolute top-0 right-0 p-2 text-2xl text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              &times;
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <Image src={ecobazaar} alt="Logo" className="w-[100px] sm:w-[140px]" />
            </div>

            {/* Form title */}
            <div className="text-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">Register new account</h2>
            </div>

            {/* Name input */}
            <div className="mb-3 sm:mb-4 relative">
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                placeholder="Enter your name"
              />
              <FaUser className="absolute top-9 right-3 text-gray-400" />
            </div>

            {/* Email input */}
            <div className="mb-3 sm:mb-4 relative">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                placeholder="Enter your email"
              />
              <FiMail className="absolute top-9 right-3 text-gray-400" />
            </div>

            {/* Password input */}
            <div className="mb-3 sm:mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                placeholder="Enter your password"
              />
              <div
                className="absolute top-9 right-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>

            {/* Register button */}
            <button className="w-full bg-green-600 text-white rounded-lg py-2 mb-4 hover:bg-green-700">
              Register
            </button>
          
           {/* Login link */}
           <div className="text-center text-sm">
              Already have an account? <Link href="/login" className="text-green-600 hover:underline">Login</Link>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Signup;
