import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

const CancelOrder = () => {
  return (
    <div>
        <Dialog>
  <DialogTrigger>
  <button className='px-2 py-1 border border-solid-primary rounded-lg text-primary hover hover:bg-primary text-xs hover:text-white'>Cancel</button> 
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
       <p> Are you sure to cancel this Order</p>
       <div className='flex justify-between'> 
        <div></div>
        <button className='px-3 py-1 border border-solid-primary rounded-sm  text-primary hover  text-lg hover:text-red-500'>Yes</button>
       </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>


 )
}

export default CancelOrder