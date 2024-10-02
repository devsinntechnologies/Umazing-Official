import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify"; // Ensure this is imported
import 'react-toastify/dist/ReactToastify.css';
const fetchWishlist = async () => {
  const userId = localStorage.getItem("userId");
  console.log("Fetching wishlist for user ID:", userId); // Log user ID
  const response = await axios.get(`http://97.74.89.204:4000/favourite/getUserFavourite/${userId}`);

  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error("Failed to fetch wishlist items.");
  }
};

const addToWishlist = async (productId) => {
  const userId = localStorage.getItem("userId");
  console.log("Adding product to wishlist for user ID:", userId, "Product ID:", productId); // Log the request
  const response = await axios.post("http://97.74.89.204:4000/favourite/addToFavourite", {
    UserId: userId,
    ProductId: productId,
  });

  if (response.data.success) {
    return { ...response.data.data, Product: { id: productId } };
  } else {
    throw new Error("Failed to add product to wishlist: " + response.data.message);
  }
};

const ProductsCard = ({ product }) => {
  const queryClient = useQueryClient();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const { data: wishlistItems = [], isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
    enabled: !!localStorage.getItem("userId"),
  });

  const mutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (newItem) => {
      console.log("Product added to wishlist:", newItem); // Log on success
      queryClient.setQueryData(["wishlist"], (oldWishlist) => [
        ...oldWishlist,
        newItem,
      ]);
      setIsInWishlist(true);
      toast.success("Product added to your wishlist!");
    },
    onError: (error) => {
      console.error("Error adding to wishlist:", error); // Log error
      toast.error("Failed to add product to wishlist: " + error.message);
    }
  });

  const isProductInWishlist = wishlistItems.some(item => item.Product.id === product.id);

  const handleAddToWishlist = () => {
    if (!localStorage.getItem("userId")) {
      toast.warn("Please log in to add items to your wishlist.");
      return;
    }

    if (isProductInWishlist) {
      toast.info("This product is already in your wishlist.");
      return;
    }

    mutation.mutate(product.id);
  };

  if (isLoading) return <div>Loading wishlist...</div>;
  if (isError) return <div>Error fetching wishlist items.</div>;

  return (
    <div className="group lg:w-[280px] hover:shadow-x-[#00B207] hover:shadow-lg lg:h-[407px] border border-gray-300 rounded-xl relative hover:border-[#2C742F] sm:w-52 sm:h-80">
      <div>
        <Link href={`/details/${product.id}`}>
          <Image
            className="w-[98%] object-cover text-center"
            width={500}
            height={300}
            src={"http://97.74.89.204/uploads/products/3067216fdd3760ec9f46aa896ce48beb.jpeg"}
            alt={product.name}
          />
        </Link>

        <div className="absolute right-[10px] top-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className={`bg-[#F2F2F2] w-[40px] h-[40px] rounded-full flex justify-center cursor-pointer items-center mb-2`}
            onClick={handleAddToWishlist}
          >
            <FaHeart size={22} color={isInWishlist || isProductInWishlist ? "red" : "green"} />
          </div>
          <Link href={`/details/${product.id}`}>
            <div className="bg-[#F2F2F2] w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer mb-2">
              <Image width={20} height={20} src="/see.png" alt="View" />
            </div>
          </Link>
        </div>

        <div className="flex justify-between items-center px-3 pt-7">
          <div>
            <p className="text-[#4D4D4D] text-[14px]">{product.name}</p>
            <p className="text-[16px] py-1 font-medium">${product.basePrice}</p>
            <div className="flex">
              <Image width={100} height={100} className="w-[12px]" src="/Star.png" alt="Star" />
              <Image width={100} height={100} className="w-[12px]" src="/Star.png" alt="Star" />
              <Image width={100} height={100} className="w-[12px]" src="/Star.png" alt="Star" />
              <Image width={100} height={100} className="w-[12px]" src="/Star.png" alt="Star" />
              <Image width={100} height={100} className="w-[12px]" src="/StarEmpty.png" alt="Empty Star" />
            </div>
          </div>
          <div className="bg-[#F2F2F2] w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer">
            <Link href={`/details/${product.id}`}>
              <Image width={20} height={20} src="/bag.png" alt="Cart" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
