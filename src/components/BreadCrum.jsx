import Image from "next/image";
import React from "react";

const BreadCrum = () => {
  return (
    <div className="w-full h-[100px]">
      <Image className="w-full h-full" src={"/Breadcrumbs.png"} width={2000} height={2000} alt="breadcrum" />
    </div>
  );
};

export default BreadCrum;
