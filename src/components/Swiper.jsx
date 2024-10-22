import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const Gallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false); // Ensures that Swiper is only rendered on the client
  }, []);

  const Product_Images = [
    {
      id: "0c7c15a99f1f6860cd326c7e99059d6b",
      imageUrl: "uploads/products/fbddc92815567b42346d3f6d58f54bd8.jpeg"
    },
    {
      id: "5009fc30be4b74c24c9acdeddcc6232f",
      imageUrl: "uploads/products/454831425a0e306b729a4426b8d26cb3.png"
    },
    {
      id: "de362500f4ec968600082acc8a855df0",
      imageUrl: "uploads/products/4a09dc4c53f5c45911c253e40dcdcd72.jpeg"
    }
  ];

  if (isSSR) return null;

  return (
    <div className="w-full">
      {/* Main Gallery Swiper */}
      <Swiper
        loop={true}
        navigation={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]} // Registering modules in the component itself
        className="w-full h-80"

      >
        {Product_Images.map((image, index) => (
        <div className="h-20 bg-primary">
            <SwiperSlide key={index}>
            <img 
              src={`http://97.74.89.204/${image.imageUrl}`} 
              alt={`Image ${index}`} 
              className="w-full h-full object-cover" 
            />
          </SwiperSlide>
        </div>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={-300}
        slidesPerView={4}
        
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]} // Registering modules for thumbnail swiper
        className="w-full mt-4 h-24  "
      >
        {Product_Images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-10 h-10 rounded-full object-cover "
              src={`http://97.74.89.204/${image.imageUrl}`}
              alt={`Thumbnail ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
