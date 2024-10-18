// import React, { useState } from "react";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import ecobazaar from "../../app/images/ecobazaar.jpg";
// import axios from "axios";
// import Lottie from "lottie-react";
// import Signupsuccess from "../form/LotieSuccess.json";
// import Signupcancel from "../form/LotieCancel.json";
// import { useMutation } from "@tanstack/react-query";
// import { registerUser } from "@/Services";
// import Image from "next/image";
// const SignupPopup = ({ isOpen, closePopup, LoginPopup }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNo, setPhoneNo] = useState("");
//   const [gender, setGender] = useState("male");
//   const [dob, setDob] = useState("");
//   const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
//   const [showCancelAnimation, setShowCancelAnimation] = useState(false);

//   const mutation = useMutation({
//     mutationFn: registerUser, // Use the function imported from Services.jsx
//     onSuccess: (data) => {
//       if (data.success) {
//         setShowSuccessAnimation(true);
//         setTimeout(() => {
//           setShowSuccessAnimation(false);
//           resetForm();
//           closePopup();
//         }, 3000);
//       } else {
//         handleFailure(data.message);
//       }
//     },
//     onError: (error) => {
//       console.error("Error during registration:", error);
//       handleFailure();
//     },
//   });

//   const resetForm = () => {
//     setName("");
//     setEmail("");
//     setGender("male");
//     setDob("");
//     setPhoneNo("");
//     setPassword("");
//   };

//   const handleFailure = (message = "Unknown error") => {
//     console.log("Registration failed: " + message);
//     setShowCancelAnimation(true);
//     setTimeout(() => {
//       setShowCancelAnimation(false);
//       closePopup();
//     }, 3000);
//   };

//   const signup = (e) => {
//     e.preventDefault();
//     mutation.mutate({
//       name,
//       email,
//       password,
//       phoneNo,
//       gender,
//       dob,
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-lg relative mx-4 sm:mx-0">
//         <button
//           className="absolute top-2 right-2 text-3xl font-semibold text-gray-500 hover:text-gray-700"
//           onClick={closePopup}
//         >
//           &times;
//         </button>

//         {showSuccessAnimation ? (
//           <Lottie animationData={Signupsuccess} />
//         ) : showCancelAnimation ? (
//           <Lottie animationData={Signupcancel} />
//         ) : (
//           <>
//             <div className="flex flex-col gap-3 justify-between items-center mb-4">
//               <div>
//                 <Image src={ecobazaar} width={150} alt="EcoBazaar Logo" />
//               </div>
//               <div>
//                 <h2 className="text-lg font-bold text-center">
//                   Register new account
//                 </h2>
//               </div>
//             </div>

//             <form className="space-y-4" onSubmit={signup}>
//               <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                 <FaUser className="text-gray-500 mr-2" />
//                 <input
//                   type="text"
//                   className="w-full focus:outline-none text-sm sm:text-base"
//                   placeholder="Enter your name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   minLength={3}
//                   maxLength={50}
//                 />
//               </div>
//               <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                 <FaEnvelope className="text-gray-500 mr-2" />
//                 <input
//                   type="email"
//                   className="w-full focus:outline-none text-sm sm:text-base"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                 <FaLock className="text-gray-500 mr-2" />
//                 <input
//                   type="password"
//                   className="w-full focus:outline-none text-sm sm:text-base"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   minLength={8}
//                 />
//               </div>
//               <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                 <input
//                   type="text"
//                   className="w-full focus:outline-none text-sm sm:text-base"
//                   placeholder="Enter your phone number"
//                   value={phoneNo}
//                   onChange={(e) => setPhoneNo(e.target.value)}
//                   maxLength={11}
//                   pattern="[0-9]{11}"
//                   required
//                 />
//               </div>
//               <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                 <input
//                   type="date"
//                   className="w-full focus:outline-none text-sm sm:text-base"
//                   value={dob}
//                   onChange={(e) => setDob(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="flex items-center border border-gray-300 p-2 rounded-md">
//                 <select
//                   className="w-full focus:outline-none text-sm sm:text-base"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                   required
//                 >
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 text-sm sm:text-base"
//               >
//                 Register
//               </button>
//             </form>

//             <div className="mt-4 text-center">
//               <p>
//                 Already have an account?{" "}
//                 <button
//                   onClick={LoginPopup}
//                   className="text-blue-500 hover:underline text-sm sm:text-base"
//                 >
//                   Login
//                 </button>
//               </p>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SignupPopup;
