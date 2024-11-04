// @ts-nocheck
import { CircleX, Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Order } from '@/lib/types'; // Adjust the import according to your file structure

interface OrderCardProps {
  data: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.Order_Items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-4 border rounded-lg shadow-md bg-white"
        >
          <div className="flex-shrink-0 h-24 w-24 md:h-32 md:w-32">
          </div>
          <div className="flex-grow">
            <h3 className="text-sm md:text-lg font-semibold truncate">
              {item.Product.name}
            </h3>
            <p className="text-primary font-medium">Rs. {item.Product.basePrice}</p>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
          </div>
          <button aria-label="Cancel Order" className="text-destructive cursor-pointer">
            <CircleX size={24} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
