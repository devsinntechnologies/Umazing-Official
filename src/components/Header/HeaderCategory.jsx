"use client";
import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import HeaderSlider from "./HeaderSlider";

const items = [
  // Other categories
  {
    label: <Link href="/shop">Fresh Fruit</Link>,
    key: "fresh-fruit",
    icon: <MailOutlined color="green" />,
  },
  {
    label: <Link href="/shop">Vegetables</Link>,
    key: "vegetables",
    icon: <AppstoreOutlined color="green" />,
  },
  {
    label: <Link href="/shop">River Fish</Link>,
    key: "river-fish",
    icon: <SettingOutlined color="green" />,
  },
  {
    label: <Link href="/shop">Chicken & Meat</Link>,
    key: "chicken-meat",
    icon: <MailOutlined color="green" />,
  },
  {
    label: <Link href="/shop">Drink & Water</Link>,
    key: "drink-water",
    icon: <AppstoreOutlined color="green" />,
  },
  {
    label: <Link href="/shop">Yogurt & Ice Cream</Link>,
    key: "yogurt-ice-cream",
    icon: <SettingOutlined color="green" />,
  },
  {
    label: <a href="/shop">Cake & Bread</a>,
    key: "cake-bread",
    icon: <MailOutlined color="green" />,
  },
  {
    label: <Link href="/shop">Butter & Cream</Link>,
    key: "butter-cream",
    icon: <AppstoreOutlined color="green" />,
  },
  {
    label: <Link href="/shop">Cooking</Link>,
    key: "cooking",
    icon: <SettingOutlined color="green" />,
  },
  {
    key: "all-categories",
    label: (
      <Link
        href={{ pathname: "/shop", query: { viewAll: true } }} // Add query parameter here
        className="text-blue-500 text-lg"
        rel="noopener noreferrer"
      >
        + View all Category
      </Link>
    ),
  },
];

const HeaderCategory = () => {
  const [current, setCurrent] = useState("vegetables");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="flex w-[95vw] gap-5 mx-auto">
      <div className="w-[278px] hidden lg:flex border-[1px] border-gray-300 p-2">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={items}
          className="custom-sidebar-menu"
          style={{
            fontSize: "16px",
            fontWeight: "400",
            borderInlineEnd: "none",
          }}
        />
      </div>
      <HeaderSlider />
    </div>
  );
};

export default HeaderCategory;
