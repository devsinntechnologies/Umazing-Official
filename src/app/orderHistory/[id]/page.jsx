"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      // Simulate a delay for loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Simulate fetched data
      setOrders([
        { id: '1234567', price: '4500', quantity: '34' },
        { id: '7654321', price: '2500', quantity: '12' },
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className='w-full h-[60vh]'>
      <div className='flex justify-center sm:my-10 my-5 sm:text-4xl text-2xl font-semibold'>
        Order History
      </div>
      <div className='md:mx-32 sm:mx-16 mx-5 border border-solid-primary rounded-lg divide-y divide-gray-200 shadow-sm shadow-primary'>
        <Table className='w-full divide-y divide-gray-200'>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="sm:text-lg text-xs font-semibold text-primary">ID</TableHead>
              <TableHead className="sm:text-lg text-xs font-semibold text-primary">PRICE</TableHead>
              <TableHead className="sm:text-lg text-xs font-semibold text-primary">QUANTITY</TableHead>
              <TableHead className="sm:text-lg text-xs font-semibold text-primary">DETAILS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <>
                {/* Render skeletons if loading */}
                <TableRow>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton className="h-10" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton className="h-10" /></TableCell>
                </TableRow>
              </>
            ) : (
              // Render actual data when not loading
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium sm:text-md text-xs">{order.id}</TableCell>
                  <TableCell className="font-medium sm:text-md text-xs">{order.price}</TableCell>
                  <TableCell className="font-medium sm:text-md text-xs">{order.quantity}</TableCell>
                  <TableCell>
                    <Link href="/orderDetail">
                      <button className='bg-primary px-3 py-2 text-white sm:text-md text-xs rounded-lg'>
                        View Details
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Page;
