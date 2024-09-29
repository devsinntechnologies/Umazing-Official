"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import HeaderSlider from "./HeaderSlider";

const items = [
  {
    label: <Link href="/fresh-fruit">Fresh Fruit</Link>,
    key: "fresh-fruit",
    icon: <MailOutlined color="green" />,
  },
  {
    label: <Link href="/vegetables">Vegetables</Link>,
    key: "vegetables",
    icon: <AppstoreOutlined color="green" />,
  },
  {
    label: <Link href="/river-fish">River Fish</Link>,
    key: "river-fish",
    icon: <SettingOutlined color="green" />,
  },
  {
    label: <Link href="/chicken-meat">Chicken & Meat</Link>,
    key: "chicken-meat",
    icon: <MailOutlined color="green" />,
  },
  {
    label: <Link href="/drink-water">Drink & Water</Link>,
    key: "drink-water",
    icon: <AppstoreOutlined color="green" />,
  },
  {
    label: <Link href="/yogurt-ice-cream">Yogurt & Ice Cream</Link>,
    key: "yogurt-ice-cream",
    icon: <SettingOutlined color="green" />,
  },
  {
    label: <a href="/cake-bread">Cake & Bread</a>,
    key: "cake-bread",
    icon: <MailOutlined color="green" />,
  },
  {
    label: <Link href="/butter-cream">Butter & Cream</Link>,
    key: "butter-cream",
    icon: <AppstoreOutlined color="green" />,
  },
  {
    label: <Link href="/cooking">Cooking</Link>,
    key: "cooking",
    icon: <SettingOutlined color="green" />,
  },
  {
    key: "all-categories",
    label: (
      <a
        href="/all-categories"
        className="text-blue-500 text-lg"
        rel="noopener noreferrer"
      >
        + View all Category
      </a>
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
          className="custom-sidebar-menu "
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
