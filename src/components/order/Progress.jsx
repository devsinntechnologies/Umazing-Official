import React from 'react';

const steps = [
  { label: "Pending", position: 1 },
  { label: "Confirmed", position: 2 },
  { label: "Out for Delivery", position: 3 },
  { label: "Success", position: 4 },
];

export default function Progress({ currentStep }) {
  return (
    <div className="flex items-center justify-between lg:space-x-4 space-x-2">
      {steps.map((step, index) => (
        <React.Fragment key={step.position}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-medium ${
                currentStep >= step.position ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              {step.position}
            </div>
            <span
              className={`text-sm mt-2 ${
                currentStep >= step.position ? 'text-blue-500 font-semibold' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 ${
                currentStep > step.position ? 'bg-blue-500' : 'bg-gray-300'
              } lg:mx-4 mx-2`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Usage example
// <Progress currentStep={2} />
