import { Trash } from 'lucide-react';
import Image from 'next/image'; // Ensure you're importing Image correctly
import React from 'react';

const OrderCard = () => {
  return (
    <div className='flex sm:w-[70%] w-[90%] h-auto  rounded-2xl border border-solid border-gray-300'>
       <div className="w-[20%] h-full rounded-l-2xl bg-black overflow-hidden">
          <Image
            src="/product.jpeg" // Ensure this path is correct
            alt=""
            width={100}
            height={100}
          />
        </div>
    
    <div className=' w-[80%] px-4 py-2'> {/* Updated border classes */}
        <h1 className='text-xl font-bold text-primary '>Product Name</h1> {/* Added margin left for spacing */}      
      <p className='text-sm truncate-multiline py-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, debitis.</p>
      <div className='flex justify-between pt-4'>
        <p>Quantity: 2</p>
        <p className='text-lg text-primary'><b>Total:</b> 4500</p>
      </div>
    </div>
    </div>
  );
}

export default OrderCard;
