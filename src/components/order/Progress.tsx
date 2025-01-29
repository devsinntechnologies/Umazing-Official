import React from 'react';

interface Step {
  label: string;
  position: number;
}

const steps: Step[] = [
  { label: 'Pending', position: 1 },
  { label: 'Processing', position: 2 },
  { label: 'Shipped', position: 3 },
  { label: 'Delivered', position: 4 },
  { label: 'Success', position: 5 },
];

interface StepperProp {
  currentStep: number;
}

const Progress: React.FC<StepperProp> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between overflow-x-auto space-x-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.position}>
          <div className="flex flex-col items-center min-w-[60px]">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-white font-medium ${
                currentStep >= step.position ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              {step.position}
            </div>
            <span
              className={`text-xs text-center md:text-sm mt-2 ${
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
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Progress;
