import { Trash } from 'lucide-react';
import Image from 'next/image'; // Ensure you're importing Image correctly
import React from 'react';
import CancelOrder from './CancelOrder';

const OrderCard = () => {
  return (
    <div className='flex sm:w-[70%] w-[100%] h-auto  rounded-2xl border border-solid border-gray-300'>
       <div className="w-[20%] rounded-l-2xl bg-black overflow-hidden">
       <Image
        src="/images/test.png" // Correct path for the public directory
        alt="description"
        width={100}
        height={100}
      />

        </div>
    
    <div className=' w-[80%] sm:px-4 sm:py-2 px-2 py-1'> {/* Updated border classes */}
<div className='flex justify-between items-center'>
<h1 className='sm:text-xl text-lg font-bold text-primary'>Product Name</h1> {/* Added margin left for spacing */}      
<CancelOrder/>
</div>

      <p className='sm:text-sm text-xs truncate-multiline '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, debitis.</p>
      <div className='flex justify-between py-2 sm:text-lg text-sm'>
        <p>Qty: 2</p>
        <p className=' text-primary'><b>Total:</b> 4500</p>
      </div>
    </div>
    </div>
  );
}

export default OrderCard;
