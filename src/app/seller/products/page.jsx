"use client";
import React, { useEffect, useState } from "react";
import ProductsCard from "@/components/ProductsCard"; // Ensure this path is correct
import axios from "axios";
import Pagination from "@/components/Pagination";
import withAuth from "@/components/hoc/withAuth";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [pageNo, setPageNo] = useState(1); // Current page number
  const pageSize = 9; // Number of products to show per page
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://97.74.89.204:4000/product/getAllProducts"
        );
        setProducts(response.data.data); // Adjust based on actual API structure
        setTotalPages(Math.ceil(response.data.data.length / pageSize)); // Calculate total pages
      } catch (err) {
        setError("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);

  // Calculate the index of the first and last product on the current page
  const firstProductIndex = (pageNo - 1) * pageSize;
  const lastProductIndex = firstProductIndex + pageSize;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex); // Slice the products for the current page

  return (
    <div className="flex flex-col gap-5 justify-center w-full">
      <h1 className="text-3xl font-bold text-primary items-start">
        All Products
      </h1>
      {/* Error Message */}
      {error && <div>{error}</div>}

      {/* Products Grid */}
      {!error && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
          {currentProducts.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Component */}
      <div className="flex justify-center items-center my-10">
        <Pagination
          totalPages={totalPages} // Total pages for pagination
          currentPage={pageNo}
          onPageChange={(page) => setPageNo(page)} // Update pageNo when a new page is selected
        />
      </div>
    </div>
  );
};

export default withAuth(Page);
