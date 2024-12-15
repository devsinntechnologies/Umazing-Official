// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Stars from './Stars';
import Image from 'next/image';
import Gallery from './Gallery';

const ReviewsCard = ({ review }) => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setData(review?.data || []);
  }, [review]);

  // Function to handle image click
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
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
                        className='size-10 rounded-full'
                      />
                    )}
                  </div>
                  <h1 className="text-lg font-medium">{item.User?.name || 'Anonymous'}</h1>
                </div>
                <Stars rating={item.star} />
              </div>
              <p className='text-sm text-gray-500 py-3'>{item.comment || 'No comment provided.'}</p>
              
              {/* Add review images */}
              {item.Review_Images && item.Review_Images.length > 0 && (
                <div className="flex sm:gap-4 gap-2 my-4">
                  {item.Review_Images.map((image, imgIndex) => (
                    <div 
                      key={imgIndex} 
                      className="relative aspect-square size-20 border border-primary rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleImageClick(image)}
                    >
                      <Image
                        src={`http://97.74.89.204/${image.imageUrl}`}
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

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-[90vw] h-auto">
            <button 
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <Gallery data={selectedImage}/>
            {/* <Image
              src={selectedImage}
              alt="Enlarged review image"
              width={1200}
              height={800}
              className="object-contain w-full h-full"
            /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewsCard;
