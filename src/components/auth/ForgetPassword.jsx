import React, { useState } from "react";

const ForgetPassword = ({ onBack, onSubmitSuccess }) => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your password reset logic here
    setSuccessMessage("A reset link has been sent to your email.");
    setEmail(""); // Reset email input after submission
    onSubmitSuccess(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </div>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </form>
  );
};

export default ForgetPassword;
