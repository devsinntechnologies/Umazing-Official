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
    <div className="w-full overflow-hidden">
      {/* Main Gallery Swiper */}
      <Swiper
        loop={true}
        navigation={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]} // Registering modules in the component itself
        className="w-full h-auto flex items-center justify-center overflow-hidden"

      >
        {images?.map((image, index) => (
          <div key={index} className="h-20 bg-primary">
            <SwiperSlide key={index}>
              <Image
                width={300}
                height={300}
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
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={60}
              height={60}
              className="w-10 h-10 rounded-full object-cover"
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
