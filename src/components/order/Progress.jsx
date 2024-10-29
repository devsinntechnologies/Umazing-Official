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
              className={`md:w-10 md:h-10 w-6 h-6 flex items-center justify-center rounded-full text-white md:text-lg text-sm font-medium ${
                currentStep >= step.position ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              {step.position}
            </div>
            <span
              className={`md:text-sm text-[10px] mt-2 ${
                currentStep >= step.position ? 'text-primary font-semibold' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 ${
                currentStep > step.position ? 'bg-primary' : 'bg-gray-300'
              } `}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Usage example
// <Progress currentStep={2} />
