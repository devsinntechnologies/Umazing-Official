import Image from 'next/image'; 
import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import ecobazaar from '../../app/images/ecobazaar.jpg';
import axios from 'axios';
import Lottie from 'lottie-react';
import LottieSuccess from '../form/LotieSuccess.json';  // Success animation JSON
import LottieCancel from '../form/LotieCancel.json';   // Error animation JSON
import jwt_decode from 'jwt-decode';  
import { useMutation } from '@tanstack/react-query'; 

const LoginPopup = ({ isOpen, closePopup, openSignupPopup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showErrorAnimation, setShowErrorAnimation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        jwt_decode(token); 
        setIsLoggedIn(true); 
      } catch (error) {
        console.error('Token decoding error:', error);
        setError('Error decoding token. Please log in again.');
        localStorage.removeItem('authToken'); 
        setIsLoggedIn(false); 
      }
    } else {
      setIsLoggedIn(false); 
    }
  }, []);
  
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`http://97.74.89.204:4000/auth/login`, data, {
        headers: {
          'Content-Type':'application/json',
        }
      });
      return response.data; // Return the response data
    },
    onSuccess: (data) => {
      if (data.success) {
        // Clear any previous error
        setError('');
        setShowErrorAnimation(false); // Ensure error animation is not visible
   
        // Set the token and update states
        localStorage.setItem('authToken', data.data.token);
        setEmail(''); // Clear email input
        setPassword(''); // Clear password input
        setShowSuccessAnimation(true); // Show success animation
        setIsLoggedIn(true); // User logged in successfully
   
        setTimeout(() => {
          setShowSuccessAnimation(false); // Hide success animation after 3 seconds
          closePopup(); // Close popup on successful login
        }, 3000);
      } else {
        setShowSuccessAnimation(false); // Ensure success animation is not visible
        setShowErrorAnimation(true); // Show error animation
        setError(data.message);
        setTimeout(() => {
          setShowErrorAnimation(false); // Hide error animation after 3 seconds
        }, 3000);
      }
    },
   
    onError: (error) => {
      // Ensure success animation is not visible
      setShowSuccessAnimation(false);
      // Show error animation
      setShowErrorAnimation(true);
      setError('An error occurred during login.');
      setTimeout(() => {
        setShowErrorAnimation(false); // Hide error animation after 3 seconds
      }, 3000);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setShowSuccessAnimation(false);
    setShowErrorAnimation(false);
    
    // Call the mutation with email and password
    mutation.mutate({ email, password });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-full max-w-sm sm:max-w-md rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-3xl font-semibold text-gray-500 hover:text-gray-700"
          onClick={closePopup}
        >
          &times;
        </button>
        
        <div className="flex flex-col gap-3 justify-between items-center mb-4">
          <div>
            <Image src={ecobazaar} width={150} alt="EcoBazaar Logo" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-center">Login with your email & password</h2>
          </div>
        </div>

        {isLoggedIn ? (
          <div className="text-center">
            <Lottie animationData={LottieSuccess} size={18} loop={false} />
            <p className="mt-4 text-green-600 font-semibold text-sm sm:text-base">User successfully logged in</p>
          </div>
        ) : (
          <>
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
                  minLength="8"
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
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 text-sm sm:text-base"
              >
                Login
              </button>
            </form>

            {showSuccessAnimation && (
              <div className="mt-4">
                <Lottie animationData={LottieSuccess} size={24} loop={false} />
              </div>
            )}

            {showErrorAnimation && (
              <div className="mt-4">
                <Lottie animationData={LottieCancel} loop={false} />
              </div>
            )}

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

            <div className="mt-4 text-center">
              <p>
                Don’t have an account?{' '}
                <button onClick={openSignupPopup} className="text-blue-500 hover:underline text-sm sm:text-base">Sign Up</button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
