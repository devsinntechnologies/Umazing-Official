// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Stars from './Stars';
import Image from 'next/image';
import { X } from 'lucide-react';

const ReviewsCard = ({ review }) => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setData(review?.data || []);
  }, [review]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="w-full space-y-6 my-4">
        {data.map((item, index) => {
          const createdAtDate = new Date(item.createdAt);
          const hours = String(createdAtDate.getHours()).padStart(2, '0');
          const minutes = String(createdAtDate.getMinutes()).padStart(2, '0');
          const day = createdAtDate.getDate();
          const month = createdAtDate.toLocaleString('default', { month: 'long' });
          const year = createdAtDate.getFullYear();
          const formattedDate = `${hours}:${minutes} - ${day} ${month}-${year}`;

          return (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6
                         border border-gray-100 hover:border-primary"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20 shadow-md">
                    {item.User?.imageUrl ? (
                      <Image
                        src={`http://97.74.89.204/${item.User.imageUrl}`}
                        alt={item.User?.name || 'User image'}
                        fill
                        className='object-cover'
                      />
                    ) : (
                      <div className="w-full h-full text-primary border border-primary rounded-full flex items-center justify-center text-primary text-lg font-semibold">
                        {item.User?.name?.[0] || 'A'}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-lg font-semibold text-gray-800">
                      {item.User?.name || 'Anonymous'}
                    </h1>
                    <p className="text-xs text-gray-500">{formattedDate}</p>
                  </div>
                </div>
                <Stars rating={item.star} />
              </div>

              <div className="mt-4 text-gray-600 text-sm leading-relaxed">
                {item.comment || 'No comment provided.'}
              </div>
              
              {item.Review_Images && item.Review_Images.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {item.Review_Images.map((image, imgIndex) => (
                    <div 
                      key={imgIndex} 
                      className="group relative aspect-square w-20 rounded-xl overflow-hidden cursor-pointer 
                               ring-2 ring-primary/20 hover:ring-primary transition-all duration-300
                               shadow-md hover:shadow-xl"
                      onClick={() => handleImageClick(image.imageUrl)}
                    >
                      <Image
                        src={`http://97.74.89.204/${image.imageUrl}`}
                        alt={`Review image ${imgIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Enhanced Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-[90vw] bg-white rounded-3xl p-4 shadow-2xl
                         border-4 border-white/30">
            <button 
              className="absolute -top-4 -right-4 text-white bg-primary hover:bg-primary/90 
                         rounded-full w-8 h-8 flex items-center justify-center shadow-lg 
                         transition-transform duration-300 hover:scale-110 z-10
                         border-2 border-white"
              onClick={handleCloseModal}
            >
              <X size={20} />
            </button>
            <div className="w-full h-full flex items-center justify-center rounded-2xl overflow-hidden">
              <Image
                src={`http://97.74.89.204/${selectedImage}`}
                alt="Enlarged review image"
                width={800}
                height={800}
                className="object-contain max-h-[80vh] w-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewsCard;
