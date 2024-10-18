"use client";
import ShopComponent from "@/components/ShopComponents/page";

const ShopByCategory = ({ params }) => {
  const { id } = params; // Get the dynamic category ID
  return <ShopComponent categoryId={id} />; // Pass the categoryId to ShopComponent
};

export default ShopByCategory;
