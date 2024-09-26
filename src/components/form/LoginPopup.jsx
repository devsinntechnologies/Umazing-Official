import Image from 'next/image'; 
import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import ecobazaar from '../../app/images/ecobazaar.jpg';
import axios from 'axios';
import Link from 'next/link';

const LoginPopup = ({ isOpen, closePopup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 
      const data = { email, password };
  
    axios.post("http://97.74.89.204:4000/auth/login", data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function(res) {
        setLoading(false); 
        if (res.data.success) {
          alert(res.data.message); 
          alert(res.data.message); 
        } else {
          alert(res.data.message);
        }
      })
      .catch(function(error) {
        setLoading(false); 
        console.error('Login error:', error);
        alert('An error occurred during login.');
      });
  };
  
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-full max-w-sm sm:max-w-md rounded-lg shadow-lg relative">
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
            <h2 className="text-lg font-bold text-center">Login with your email & password</h2>
          </div>
        </div>

        {/* Form fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="text-right">
            <a href="#" className="text-blue-500 hover:underline text-sm sm:text-base">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 text-sm sm:text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Alternative login methods */}
        <div className="my-4 text-center">
          <p>Or</p>
        </div>
        <div className="space-y-2">
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base">
            Login with Google
          </button>
          <button className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 text-sm sm:text-base">
            Login with Mobile number
          </button>
        </div>

        {/* Signup option */}
        <div className="mt-4 text-center">
          <p>
            Don’t have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:underline text-sm sm:text-base">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
