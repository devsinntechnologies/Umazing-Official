// @ts-nocheck
import React, { useState } from 'react'

const SelectSize = () => {
  const [selectedSize, setSelectedSize] = useState(null); // State to store selected size

  const handleSizeClick = (size) => {
    setSelectedSize(size); // Update the selected size when a button is clicked
  };

  return (
    <div>
      <h1 className='text-lg pb-2'>Size</h1>
      <div className='space-x-2'>
        {['SM', 'MD', 'LG', 'XL'].map((size) => (
          <button
            key={size}
            onClick={() => handleSizeClick(size)} // Call the handler on click
            className={`px-4 py-1 border border-solid-black text-primary ${
              selectedSize === size
                ? 'bg-primary text-white' // Highlight selected button
                : 'hover:bg-primary hover:text-white'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SelectSize;
