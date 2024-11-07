// @ts-nocheck
import { useState } from 'react';
import ReviewsCard from './ReviewsCard';

const TabComponent = ({product, review}) => {
  const [activeTab, setActiveTab] = useState('description');

  // Calculate average rating with better null checks
  const avgRating = review?.data?.length > 0 
    ? (review.data.reduce((acc, curr) => {
        console.log('Accumulator:', acc, 'Current stars:', curr.star);
        const stars = parseFloat(curr.star) || 0;
        return acc + stars;
      }, 0) / review.data.length).toFixed(1)
    : '0.0';

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
            <h1 className='text-xl font-semibold'>{avgRating} Ratings</h1>
            <h3>{review?.data?.length || 0} Reviews</h3>
            <ReviewsCard review={review}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabComponent;
