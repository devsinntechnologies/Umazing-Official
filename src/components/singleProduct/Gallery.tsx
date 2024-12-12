// @ts-nocheck
"use client"
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Image from 'next/image';

const Gallery = (data) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isSSR, setIsSSR] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  useEffect(() => {
    if(data){
      setImages(data.data?.Product_Images);
    }
  }, [data]);
  if (isSSR) return null;


  return (
    <div className="w-full h-full overflow-hidden">
      {/* Main Gallery Swiper */}
      <Swiper
        loop={true}
        navigation={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]} // Registering modules in the component itself
        className="w-auto flex items-center justify-center h-[calc(100%-60px)] md:h-[calc(100%-80px)] overflow-hidden border border-gray-300 shadow-md p-2"

      >
        {images?.map((image, index) => (
          <div key={index} className="w-auto h-16 bg-primary">
            <SwiperSlide key={index}>
              <Image
                width={300}
                height={300}
                src={`http://97.74.89.204/${image.imageUrl}`}
                alt={`Image ${index}`}
                className="w-auto h-full p-3 object-cover mx-auto border-2 swiper-slide-active:border-primary border-transparent"
              />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
     <div className='px-4 py-2 md:py-5 overflow-x-auto'>
     <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={8}

        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]} // Registering modules for thumbnail swiper
        className="w-full h-auto py-4 px-3 flex justify-center items-center"
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index} className="size-10 flex justify-center items-center">
            <Image
              width={60}
              height={60}
              className="size-10 rounded-full object-cover cursor-pointer border-2 swiper-slide-thumb-active:border-primary border-transparent hover:border-primary/50"
              src={`http://97.74.89.204/${image.imageUrl}`}
              alt={`Thumbnail ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
     </div>
    </div>
  );
};

export default Gallery;
