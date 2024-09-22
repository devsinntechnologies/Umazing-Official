import BreadCrum from "@/components/BreadCrum";
import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const WishlistPage = () => {
  return (
    <>
      <BreadCrum />
      <div>
        <main className="container md:w-[80%] mx-auto px-4 md:px-6 lg:px-8 py-8 mt-20">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            My Wishlist
          </h1>

          <div
            id="overflow"
            className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg"
          >
            <table className="w-[96%] divide-y divide-gray-200 table-fixed">
              <thead>
                <tr>
                  <th className="w-[170px] md:w-1/3 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="w-[150px] md:w-1/4 table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="w-[150px] md:w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Status
                  </th>
                  <th className="w-[150px] md:w-1/6 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">

                {/* Row 1 */}
                <tr className="text-sm sm:text-lg">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="/mirch.png"
                        alt="Mirchi"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Mirchi
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$14.99</div>
                    <div className="text-sm text-gray-500 line-through">
                      $20.00
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-700">
                      In Stock
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium">
                    <button className="w-[115px] py-3 text-white px-4 rounded-full bg-[#00B207]">
                      Add to Cart
                    </button>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium">
                    <Image src={"/close.png"}
                      id="change"
                      width={15} height={15} alt="close" />
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="text-sm sm:text-lg">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="/culi.png"
                        alt="Culi"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Culi
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$17.99</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-700">
                      In Stock
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium">
                    <button className="w-[115px] py-3 text-white px-4  rounded-full bg-[#00B207]">
                      Add to Cart
                    </button>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium">
                    <Image src={"/close.png"}
                      id="change"
                      width={15} height={15} alt="close" />
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="text-sm sm:text-lg">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="/japani.png"
                        alt="Japani"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Japani
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$14.99</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-red-100 text-red-700">
                      Out of Stock
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium">
                    <button
                      className="w-[115px] py-3 text-white px-4 rounded-full bg-gray-300"
                      disabled
                    >
                      Add to Cart
                    </button>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium">
                    <Image id="change" src={"/close.png"} width={15} height={15} alt="close" />
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="text-sm sm:text-lg">
                  <td className="py-8  whitespace-nowrap">
                    <div className="flex">
                    <div className="text-sm">
                      <p className="px-4 sm:px-6 mt-1">Share:</p>
                    </div>
                    <div className="flex space-x-4 px-4 sm:px-1">

                      <FontAwesomeIcon
                        icon={faFacebook}
                        size="2"
                        className="text-green-500 bg-white  w-6"
                      />

                      <FontAwesomeIcon icon={faTwitter} size="2" className=" bg-white text-black w-6" />

                      <FontAwesomeIcon icon={faLinkedin} size="2" className="text-black w-6" />
                    </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default WishlistPage;
