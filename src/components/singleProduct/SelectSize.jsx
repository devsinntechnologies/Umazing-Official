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
    <SelectValue placeholder="Size" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="small">Small</SelectItem>
    <SelectItem value="medium">Medium</SelectItem>
    <SelectItem value="large">Large</SelectItem>
    <SelectItem value="extralarge">Extra Large</SelectItem>
  </SelectContent>
</Select>

    </div>
  )
}

export default SelectSize