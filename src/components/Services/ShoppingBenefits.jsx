import React from "react";
import { FaShippingFast, FaHeadset, FaShieldAlt, FaUndo } from "react-icons/fa"; // Use relevant icons

const ShoppingBenefits = () => {
  const benefits = [
    {
      icon: <FaShippingFast className="text-green-600 text-4xl" />,
      title: "Free Shipping",
      description: "Free shipping with discount",
    },
    {
      icon: <FaHeadset className="text-green-600 text-4xl" />,
      title: "Great Support 24/7",
      description: "Instant access to Contact",
    },
    {
      icon: (
        <FaShieldAlt className="text-white text-4xl bg-green-500 p-2 rounded-full" />
      ),
      title: "100% Secure Payment",
      description: "We ensure your money is safe",
    },
    {
      icon: <FaUndo className="text-green-600 text-4xl" />,
      title: "Money-Back Guarantee",
      description: "30 days money-back",
    },
  ];

  return (
    // Benefit Section
    <div className="flex flex-col md:flex-row justify-between items-center mt-10 w-[95vw] mx-auto bg-gray-100 py-5 px-3">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-center space-x-4 my-4 md:my-0">
          <div className="bg-gray-100 rounded-full p-3 flex items-center justify-center">
            {benefit.icon}
          </div>
          <div>
            <h3 className="font-semibold text-base text-black">
              {benefit.title}
            </h3>
            <p className="text-gray-500 text-sm">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingBenefits;
