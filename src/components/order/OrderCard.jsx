import { Trash } from 'lucide-react'
import React from 'react'

const OrderCard = () => {
  return (
    <div className='w-[70%] h-auto px-4 py-2 rounded-lg justify-center border border-solid-gray space-y-4'>
<div className='flex justify-between'>
<h1 className='text-xl font-bold text-primary'>Product Name</h1>
<Trash/>
</div>
<p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, debitis.</p>
<div className='flex justify-between'>
<p>Quantity: 2</p>
<p className='text-lg'> <b>Total:</b>4500</p>



</div>
    </div>
  )
}

export default OrderCard