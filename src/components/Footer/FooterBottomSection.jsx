import React from 'react';
import pay from '../../app/images/pay.png';
import Image from 'next/image';

const FooterBottomSection = () => {
  return (
    <div className="bg-white w-[95vw] mx-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-4">
        {/* Copyright Text */}
        <p className="text-gray-500 text-sm text-center md:text-left">
          Ecobazar eCommerce © 2021. All Rights Reserved
        </p>

        {/* Payment Icons */}
        <div className="flex items-center justify-center md:justify-end space-x-2">
          <Image src={pay} width={300} />
        </div>
      </div>
    </div>
  );
};

export default FooterBottomSection;
