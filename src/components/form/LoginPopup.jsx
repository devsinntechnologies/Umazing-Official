import Image from 'next/image'; 
import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import ecobazaar from '../../app/images/ecobazaar.jpg';
import axios from 'axios';
import Link from 'next/link';
import Lottie from 'lottie-react';
import SignupSuccess from '../form/LotieSuccess.json';  // Success animation JSON
import SignupCancel from '../form/LotieCancel.json';   // Error animation JSON
import jwt_decode from 'jwt-decode';  // Ensure this import is correct

const LoginPopup = ({ isOpen, closePopup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showErrorAnimation, setShowErrorAnimation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setError('Your session has expired. Please log in again.');
          localStorage.removeItem('authToken');
          setIsLoggedIn(false); // User is not logged in
        } else {
          setIsLoggedIn(true); // User is already logged in
        }
      } catch (error) {
        console.error('Token decoding error:', error);
        setError('Error decoding token. Please log in again.');
        localStorage.removeItem('authToken');
        setIsLoggedIn(false); // User is not logged in
      }
    } else {
      setIsLoggedIn(false); // No token found, user is not logged in
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShowSuccessAnimation(false);
    setShowErrorAnimation(false);

    const data = { email, password };

    try {
      const res = await axios.post("http://97.74.89.204:4000/auth/login", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.success) {
        localStorage.setItem('authToken', res.data.data.token);
        setShowSuccessAnimation(true);
        setIsLoggedIn(true); // User logged in successfully
        setTimeout(() => {
          setShowSuccessAnimation(false);
        }, 3000);
      } else {
        setShowErrorAnimation(true);
        setError(res.data.message);
        setTimeout(() => {
          setShowErrorAnimation(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setShowErrorAnimation(true);
      setError('An error occurred during login.');
      setTimeout(() => {
        setShowErrorAnimation(false);
      }, 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false); // User logged out
    setError('You have logged out.');
  };

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

        {isLoggedIn ? ( // Show logout option if logged in
          <div>
            <p>You are already logged in.</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 text-sm sm:text-base mt-4"
            >
              Logout
            </button>
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
                <Lottie animationData={SignupSuccess} loop={false} />
              </div>
            )}

            {showErrorAnimation && (
              <div className="mt-4">
                <Lottie animationData={SignupCancel} loop={false} />
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
                <Link href="/signup" className="text-blue-500 hover:underline text-sm sm:text-base">
                  Sign Up
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
