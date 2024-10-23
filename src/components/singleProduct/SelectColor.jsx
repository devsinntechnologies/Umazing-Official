import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const SelectSize = () => {
  return (
    <div>
        <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select Color" />
  </SelectTrigger>
  <SelectContent>
    
    <SelectItem value="red" >
    <div className="flex gap-3">
    <div className='size-4 bg-red-400 rounded-full'></div>
    <div>  Red</div>
    </div>
      </SelectItem>
      <SelectItem value="green" >
    <div className="flex gap-3">
    <div className='size-4 bg-green-400 rounded-full'></div>
    <div>  Green</div>
    </div>
      </SelectItem>
      <SelectItem value="blue" >
    <div className="flex gap-3">
    <div className='size-4 bg-blue-400 rounded-full'></div>
    <div>  Blue</div>
    </div>
      </SelectItem>
      <SelectItem value="black" >
    <div className="flex gap-3">
    <div className='size-4 bg-black rounded-full'></div>
    <div>  Black</div>
    </div>
      </SelectItem>
    
  </SelectContent>
</Select>

    </div>
  )
}

export default SelectSize