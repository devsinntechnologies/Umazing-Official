"use client"

import React from 'react'
import Link from 'next/link';


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  

const page = () => {
  return (
    <div>
        <div className='flex justify-center sm:my-10 my-5 sm:text-4xl text-2xl font-semibold'>
        Order History
    </div>
<div>
<Table>
  <TableCaption>A list of your recent orders.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="sm:text-md text-xs font-semibold text-primary">ID</TableHead>
      <TableHead className="sm:text-md text-xs font-semibold text-primary">PRICE</TableHead>
      <TableHead className="sm:text-md text-xs font-semibold text-primary">QUANTITY</TableHead>
      <TableHead className="sm:text-md text-xs font-semibold text-primary">DETAILS</TableHead>

      {/* <TableHead className="text-right">Amount</TableHead> */}
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium sm:text-md text-xs">1234567</TableCell>
      <TableCell className="font-medium sm:text-md text-xs">4500</TableCell>
      <TableCell className="font-medium sm:text-md text-xs">34</TableCell>
      <TableCell>
      <Link href="/orderDetail">
        <button className='bg-primary px-3 py-2 text-white sm:text-md text-xs rounded-lg'>
            View Details
        </button></Link>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium sm:text-md text-xs">1234567</TableCell>
      <TableCell className="font-medium sm:text-md text-xs">4500</TableCell>
      <TableCell className="font-medium sm:text-md text-xs">34</TableCell>
      <TableCell>
        <Link href="/orderDetail">
        <button className='bg-primary px-3 py-2 text-white sm:text-md text-xs rounded-lg'>
            View Details
        </button></Link>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>

</div>
    </div>
  ) 
}

export default page