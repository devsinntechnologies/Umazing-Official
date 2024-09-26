import Image from 'next/image';
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import ecobazaar from '../../app/images/ecobazaar.jpg';
import Link from 'next/link';

const SignupPopup = ({ isOpen, closePopup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-lg relative mx-4 sm:mx-0">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-3xl font-semibold text-gray-500 hover:text-gray-700"
          onClick={closePopup}
        >
          &times;
        </button>

        {/* Header with image and title */}
        <div className="flex flex-col gap-3 justify-between items-center mb-4">
          <div>
            <Image src={ecobazaar} width={150} alt="EcoBazaar Logo" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-center">Register new account</h2>
          </div>
        </div>

        {/* Form fields */}
        <form className="space-y-4">
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full focus:outline-none text-sm sm:text-base"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              className="w-full focus:outline-none text-sm sm:text-base"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border border-gray-300 p-2 rounded-md">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              className="w-full focus:outline-none text-sm sm:text-base"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 text-sm sm:text-base"
          >
            Register
          </button>
        </form>

        {/* Login option */}
        <div className="mt-4 text-center">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-green-500 hover:underline text-sm sm:text-base">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;
