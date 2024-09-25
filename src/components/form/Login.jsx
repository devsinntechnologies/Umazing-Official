'use client'
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { FiMail } from 'react-icons/fi'; // Icon for Email
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Icons for password visibility
import ecobazaar from '../../app/images/ecobazaar.jpg';
import Image from 'next/image';
import Link from 'next/link'; // Correct import for Link component

const Login = ({ isOpen, setIsOpen }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className={`fixed inset-0 z-40 ${isOpen ? 'backdrop-blur-sm' : ''}`} />
      
      <Popup open={isOpen} modal onClose={() => setIsOpen(false)}>
        {close => (
          <div className="relative bg-white rounded-lg shadow-lg mx-auto p-5 z-50">
            {/* Close button */}
            <button className="absolute top-0 right-0 p-2 text-2xl text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              &times;
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image src={ecobazaar} alt="Logo" className="w-[140px]" />
            </div>

            {/* Form title */}
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">Login with your email & password</h2>
            </div>

            {/* Email input */}
            <div className="mb-4 relative">
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
            <div className="mb-4 relative">
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

            {/* Forgot password */}
            <div className="flex justify-end mb-4">
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>

            {/* Login button */}
            <button className="w-full bg-green-600 text-white rounded-lg py-2 mb-4 hover:bg-green-700">
              Login
            </button>

            {/* Or section */}
            <div className="flex items-center justify-center mb-4">
              <div className="h-px bg-gray-300 w-1/4"></div>
              <p className="mx-3 text-sm text-gray-500">Or</p>
              <div className="h-px bg-gray-300 w-1/4"></div>
            </div>

            {/* Login with Google */}
            <button className="w-full bg-blue-600 text-white rounded-lg py-2 mb-4 hover:bg-blue-700">
              Login with Google
            </button>

            {/* Login with Mobile Number */}
            <button className="w-full bg-gray-500 text-white rounded-lg py-2 mb-4 hover:bg-gray-600">
              Login with Mobile number
            </button>

           {/* Signup section */}
           <div className="text-center text-sm">
              Don't have an account? <Link href="/signup" className="text-green-600 hover:underline">Sign Up</Link>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Login;
