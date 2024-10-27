import React, { useEffect, useState } from 'react';
import Stars from './Stars';
import Image from 'next/image';

const ReviewsCard = ({ review }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(review?.data || []); // Default to an empty array if review.data is undefined
  }, [review]);

  return (
    <div className="w-full space-y-6 my-4">
      {data.map((item, index) => {
        // Format the date for each review
        const createdAtDate = new Date(item.createdAt);
        const hours = String(createdAtDate.getHours()).padStart(2, '0');
        const minutes = String(createdAtDate.getMinutes()).padStart(2, '0');
        const day = createdAtDate.getDate();
        const month = createdAtDate.toLocaleString('default', { month: 'long' });
        const year = createdAtDate.getFullYear();
        const formattedDate = `${hours}:${minutes} - ${day} ${month}-${year}`;

        return (
          <div key={index} className="border rounded-lg border-solid h-auto px-6 py-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-black overflow-hidden">
                  {item.User?.imageUrl && (
                    <Image
                      src={`http://97.74.89.204/${item.User.imageUrl}`}
                      alt={item.User?.name || 'User image'}
                      width={40}
                      height={40}
                    />
                  )}
                </div>
                <h1 className="text-lg font-medium">{item.User?.name || 'Anonymous'}</h1>
              </div>
              <Stars rating={item.star} />
            </div>
            <p>{item.comment || 'No comment provided.'}</p>
            <p>{formattedDate}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsCard;
