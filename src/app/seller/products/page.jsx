"use client";
import React, { useEffect, useState } from "react";
import ProductsCard from "@/components/ProductsCard";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import withAuth from "@/components/hoc/withAuth";
import Link from "next/link";
import { useDeleteProductByIdMutation, useGetUserProductsQuery } from "@/hooks/UseProducts";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 12; 
  const [totalPages, setTotalPages] = useState(1); 

  const queryParams = {
    pageNo,
    pageSize,
  };
  const [productToDelete, setProductToDelete] = useState(null);
  const { data: productsData, isLoading, isError, refetch } = useGetUserProductsQuery(queryParams);
  const [deleteProduct, { data:resData, isSuccess: deleteSuccess, isLoading: deleting, isError: deleteError }] = useDeleteProductByIdMutation();


  useEffect(() => {
    if (productsData?.success) {
      setProducts(productsData.data);
      const pages = Math.ceil(productsData.total / pageSize); 
      setTotalPages(pages);
    }
  }, [productsData]);

  // Refetch products when pageNo changes
  useEffect(() => {
    refetch(); // Ensure refetch is triggered when pageNo changes
  }, [pageNo, refetch]);

  const handleDelete = (productId) => {
    deleteProduct(productId); 
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast({
        title: "Success",
        description: "Product deleted successfully.",
      });
      setProductToDelete(null); // Reset the product to delete
      refetch();
    }
    if(deleting){
      toast({
        title: "Deleting",
      });
    }

    if (deleteError || resData?.success === false) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  }, [deleteSuccess, deleteError, toast, deleting, refetch, resData]);


  return (
    <div className="flex flex-col gap-5 justify-center w-full">
      <h1 className="text-3xl font-bold text-primary">All Products</h1>
      {/* AlertDialog for Deleting Product */}
      {productToDelete && (
        <AlertDialog
          open={true}
          onOpenChange={() => setProductToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setProductToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(productToDelete)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {/* Loading & Error States */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(pageSize)].map((_, index) => (
            <Skeleton key={index} className="w-full h-[200px]" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-red-500 text-lg">
          Error loading products. Please try again.
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductsCard key={product.id} product={product} onDelete={() => setProductToDelete(product.id)}/>
          ))}
        </div>
      )}

{products.length === 0 && 
      <div className="w-full flex items-center justify-center gap-4 flex-col py-5">
        <p className="text-base">No products found.</p>
        <Link href="/seller/addProduct" className="bg-primary px-3 py-1.5 rounded-full text-white">
            Add Products
          </Link>
      </div>
      }

      {/* Pagination Component */}
      {products.length > 0 &&
      <div className="flex justify-center items-center my-10">
         <Pagination
          totalPages={totalPages}
          currentPage={pageNo}
          onPageChange={(page) => setPageNo(page)} // Update pageNo when a new page is selected
        />
      </div>
      }
    </div>
  );
};

export default withAuth(Page);
