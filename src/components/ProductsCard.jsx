import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductsCard = ({ product }) => {
  return (
    <>
      <div className="group lg:w-[280px]  hover:shadow-x-[#00B207] hover:shadow-lg lg:h-[407px] border border-gray-300 rounded-xl relative hover:border-[#2C742F] sm:w-52 sm:h-80 ">
        <div>
          <Link href={`/details/eecd0ca6557194f575f68e65fc62bc94`}>
            <Image
              className="w-[98%] object-cover text-center"
              width={500}
              height={300}
              src={
                "http://97.74.89.204/uploads/products/3067216fdd3760ec9f46aa896ce48beb.jpeg"
              }
              alt={product.name}
            />
          </Link>

          {/* Button view */}
          <div className="absolute right-[10px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link href={"/wishlist"}>
              <div className="bg-[#F2F2F2] w-[40px] h-[40px] rounded-full flex justify-center cursor-pointer items-center mb-2">
                <Image width={20} height={20} src="/Heart.png" alt="Favorite" />
              </div>
            </Link>
            <Link href="/details">
              <div className="bg-[#F2F2F2] w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer mb-2">
                <Image width={20} height={20} src="/see.png" alt="View" />
              </div>
            </Link>
          </div>

          <div className="flex justify-between items-center px-3 pt-7">
            <div>
              <p className="text-[#4D4D4D] text-[14px]">{product.name}</p>
              <p className="text-[16px] py-1 font-medium">$ {product.basePrice}</p>
              <div className="flex">
                <Image
                  width={100}
                  height={100}
                  className="w-[12px]"
                  src="/Star.png"
                  alt="Star"
                />
                <Image
                  width={100}
                  height={100}
                  className="w-[12px]"
                  src="/Star.png"
                  alt="Star"
                />
                <Image
                  width={100}
                  height={100}
                  className="w-[12px]"
                  src="/Star.png"
                  alt="Star"
                />
                <Image
                  width={100}
                  height={100}
                  className="w-[12px]"
                  src="/Star.png"
                  alt="Star"
                />
                <Image
                  width={100}
                  height={100}
                  className="w-[12px]"
                  src="/StarEmpty.png"
                  alt="Empty Star"
                />
              </div>
            </div>
            <div className="bg-[#F2F2F2] w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer">
              <Link href={"/details"}>
                <Image width={20} height={20} src="/bag.png" alt="Cart" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCard;