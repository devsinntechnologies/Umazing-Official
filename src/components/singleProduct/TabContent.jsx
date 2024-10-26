import { useState } from 'react';
import ReviewsCard from './ReviewsCard';

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="w-full md:mx-10 mt-8">
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
            <p className="text-gray-700">
              Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at
              mauris. Maecenas tincidunt ligula a sem vestibulum pharetra.
            </p>
            <p className="mt-2 text-gray-700">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quo at reprehenderit beatae? Necessitatibus maiores pariatur fugit tempore eius dicta deserunt quo consequuntur amet obcaecati provident impedit perspiciatis quia aut mollitia corporis nemo esse rerum, eos ipsum cupiditate facilis sint voluptatibus praesentium! Illo enim veritatis quod facilis minima ullam nobis tempora libero non cumque quae rerum a quisquam magni, culpa in rem nulla ipsa, nihil corrupti inventore ratione qui ea! Earum laboriosam beatae iure soluta corporis eum doloremque, inventore veritatis molestiae atque consequatur cumque quia voluptatibus numquam optio asperiores incidunt. Magni cupiditate nam doloremque impedit quidem reiciendis esse deserunt numquam?
            </p>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="feedback-content sm:text-md text-sm">
         <h1 className='text-xl font-semibold'>4.5 Ratings</h1>
         <h3>22 Reviews</h3>
           <ReviewsCard/>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabComponent;
