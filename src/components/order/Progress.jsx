import React from "react";

const Progress = () => {
  const steps = ["Order Placed", "Sewing", "Out for Delivery", "Success"];

  return (
    <div className="flex items-center lg:px-12 md:px-10 px-8 justify-around w-full my-10 ">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center relative">
          <div className="flex items-center justify-center">
            <span className="h-10 w-10 flex items-center justify-center rounded-full font-semibold relative z-10 text-transparent before:content-[''] before:h-10 before:w-10 before:bg-primary before:absolute before:left-1/2 before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2">
              {index + 1}
            </span>
            {index < steps.length - 1 && (
              <div className="absolute bg-primary h-0.5 xl:w-80 lg:w-60 md:w-52 w-48 left-1/2 top-5 transform  rounded-full"></div>
            )}
          </div>
          <div className="flex flex-col items-center mt-2">
            <span className="text-sm font-semibold">{step}</span>
            <span className="text-sm font-semibold">12 May 2023</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Progress;
