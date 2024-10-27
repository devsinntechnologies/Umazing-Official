"use client"
import { RotatingLines } from 'react-loader-spinner';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <RotatingLines strokeColor="#008080"
            strokeWidth="3"
            animationDuration="0.75"
            width="80"
            visible={true} />
  </div>
);

export default LoadingSpinner;

