// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Stars from './Stars';
import Image from 'next/image';

const ReviewsCard = ({ review }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(review?.data || []);
  }, [review]);

  // Helper function to format image URL
  const getFormattedImageUrl = (url: string) => {
    if (url?.startsWith('http://') || url?.startsWith('https://')) {
      return url;
    }
    return `http://97.74.89.204/${url}`;
  };

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
                      src={getFormattedImageUrl(item.User.imageUrl)}
                      alt={item.User?.name || 'User image'}
                      width={40}
                      height={40}
                      className='size-10 rounded-full'
                    />
                  )}
                </div>
                <h1 className="text-lg font-medium">{item.User?.name || 'Anonymous'}</h1>
              </div>
              <Stars rating={item.star} />
            </div>
            <p>{item.comment || 'No comment provided.'}</p>
            
            {/* Add review images */}
            {item.Review_Images && item.Review_Images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-4">
                {item.Review_Images.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative aspect-square size-20 border border-primary rounded-lg overflow-hidden">
                    <Image
                      src={getFormattedImageUrl(image.imageUrl)}
                      alt={`Review image ${imgIndex + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-sm text-gray-500 mt-2">{formattedDate}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsCard;
