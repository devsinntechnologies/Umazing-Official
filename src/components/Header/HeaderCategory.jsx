// "use client";
// import React, { useState } from "react";
// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// import { Menu } from "antd";
// import Link from "next/link";
// import HeaderSlider from "./HeaderSlider";

// const items = [
//   // Other categories
//   {
//     label: <Link href="/shop">Fresh Fruit</Link>,
//     key: "fresh-fruit",
//     icon: <MailOutlined color="green" />,
//   },
//   {
//     label: <Link href="/shop">Vegetables</Link>,
//     key: "vegetables",
//     icon: <AppstoreOutlined color="green" />,
//   },
//   {
//     label: <Link href="/shop">River Fish</Link>,
//     key: "river-fish",
//     icon: <SettingOutlined color="green" />,
//   },
//   {
//     label: <Link href="/shop">Chicken & Meat</Link>,
//     key: "chicken-meat",
//     icon: <MailOutlined color="green" />,
//   },
//   {
//     label: <Link href="/shop">Drink & Water</Link>,
//     key: "drink-water",
//     icon: <AppstoreOutlined color="green" />,
//   },
//   {
//     label: <Link href="/shop">Yogurt & Ice Cream</Link>,
//     key: "yogurt-ice-cream",
//     icon: <SettingOutlined color="green" />,
//   },
//   {
//     label: <a href="/shop">Cake & Bread</a>,
//     key: "cake-bread",
//     icon: <MailOutlined color="green" />,
//   },
//   {
//     label: <Link href="/shop">Butter & Cream</Link>,
//     key: "butter-cream",
//     icon: <AppstoreOutlined color="green" />,
//   },
//   {
//     label: <Link href="/shop">Cooking</Link>,
//     key: "cooking",
//     icon: <SettingOutlined color="green" />,
//   },
//   {
//     key: "all-categories",
//     label: (
//       <Link
//         href={{ pathname: "/shop", query: { viewAll: true } }} // Add query parameter here
//         className="text-blue-500 text-lg"
//         rel="noopener noreferrer"
//       >
//         + View all Category
//       </Link>
//     ),
//   },
// ];

// const HeaderCategory = () => {
//   const [current, setCurrent] = useState("vegetables");

//   const onClick = (e) => {
//     setCurrent(e.key);
//   };

//   return (
//     <div className="flex w-[95vw] gap-5 mx-auto">
//       <div className="w-[278px] hidden lg:flex border-[1px] border-gray-300 p-2">
//         <Menu
//           onClick={onClick}
//           selectedKeys={[current]}
//           mode="vertical"
//           items={items}
//           className="custom-sidebar-menu"
//           style={{
//             fontSize: "16px",
//             fontWeight: "400",
//             borderInlineEnd: "none",
//           }}
//         />
//       </div>
//       <HeaderSlider />
//     </div>
//   );
// };

// export default HeaderCategory;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCategories } from "@/Services";
import HeaderSlider from "./HeaderSlider";
import Link from "next/link"; // Import Link from Next.js

export default function HeaderCategory() {
  const [data, setData] = useState([]);

  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
      setData(response); // Set fetched data
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    loadCategories(); // Call fetch on component mount
  }, []);

  return (
    <div className=" flex  justify-center items-center gap-2 ">
      <ul className="hidden w-[19vw] lg:flex flex-col gap-2 justify-center border-[1px] border-solid border-black py-2 px-2">
        {data &&
          data.map((category, index) => (
            <Link href={`/shop/${category.id}`} key={index}>
              <li className="w-full border-[#E6E6E6] flex justify-around items-center px-2  gap-6 cursor-pointer transition-shadow duration-150 ease-in-out hover:bg-[#2C742F] hover:rounded-md hover:text-white">
                <Image
                  src={
                    category.imageUrl
                      ? `http://97.74.89.204/${category.imageUrl}`
                      : "/placeholder-image.jpg"
                  }
                  alt={category.name || "No name available"}
                  width={100}
                  height={100}
                  className="object-cover rounded-md mb-2 w-8"
                />
                <h3 className="text-sm text-left flex-grow">
                  {category.name || "Unknown Category"}
                </h3>
              </li>
            </Link>
          ))}
      </ul>
      <HeaderSlider />
    </div>
  );
}
