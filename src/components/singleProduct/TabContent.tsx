// @ts-nocheck
import { useState } from 'react';
import ReviewsCard from './ReviewsCard';

const TabComponent = ({product, review}) => {
  const [activeTab, setActiveTab] = useState('description');
  console.log(review, "sdfldk")

  return (
    <div className="w-full ">
      {/* Tab navigation */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 sm:text-lg text-sm font-medium ${
            activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('description')}
        >
          Descriptions
        </button>
        <button
          className={`ml-4 px-4 py-2 sm:text-lg text-sm font-medium  ${
            activeTab === 'feedback' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('feedback')}
        >
          Customer Reviews
        </button>
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {activeTab === 'description' && (
          <div className="description-content sm:text-md text-sm">
            {product?.longDescription}
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="feedback-content sm:text-md text-sm">
         <h1 className='text-xl font-semibold'>4.5 Ratings</h1>
         <h3>{review?.data.length} Reviews</h3>
           <ReviewsCard review={review}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabComponent;
