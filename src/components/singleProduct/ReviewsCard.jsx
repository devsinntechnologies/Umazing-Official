import React from 'react'
import Stars from './Stars'

const ReviewsCard = () => {
  return (
    <div className='w-full border space-y-3 rounded-lg border-solid-2px h-auto px-6 py-6 my-4 '>
   <div className='flex justify-between items-center'>
   <div className='flex gap-3 items-center'>   <div className='size-10  rounded-full bg-black'>
            <img src="/icon.svg" alt="" />
        </div>
        <h1 className='text-lg font-medium'>Azan Asim</h1></div>
        <Stars/>
   </div>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, amet?</p>
        <p>04:35 - 26 October-2024</p>

    </div>
  )
}

export default ReviewsCard