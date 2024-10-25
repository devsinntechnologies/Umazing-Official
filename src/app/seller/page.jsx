"use client";
import Link from "next/link";
import { Package } from "lucide-react";
import ProductsCard from "@/components/ProductsCard"; // Ensure this path is correct
import { useEffect, useState } from "react";
import withAuth from "@/components/hoc/withAuth";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteProductByIdMutation, useGetUserProductsQuery } from "@/hooks/UseProducts";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const { toast } = useToast();
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const userName = useSelector((state) => state.authSlice?.userProfile?.name);
  const [products, setProducts] = useState([]);
  const pageNo = "1";        //number
  const pageSize = "6";   //number
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
    }
  }, [productsData]);

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
    <div className="w-full flex flex-col gap-5">
      {/* Header Section */}
      <h1 className="text-2xl font-semibold text-primary">
        {`Welcome Back, ${userName}`}
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <StatCard
          icon={<Package color="white" />}
          stat={productsData?.total || 0}
          label="Total Products"
        />
      </div>

      {/* Recent Products Section */}
      <h1 className="text-2xl font-semibold text-primary">Recent Products</h1>

      {/* Loading & Error States */}
      {isLoading && (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(6)].map((_, index) => (
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
      {products.length > 0 && (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.slice(0, 5).map((product) => (
            <ProductsCard key={product.id} product={product} onDelete={() => setProductToDelete(product.id)} />
          ))}
        </div>
      )}

      {products.length === 0 && !isLoading && (
        <div className="w-full flex items-center justify-center gap-4 flex-col py-5">
          <p className="text-base">No products found.</p>
          <Link href="/seller/addProduct" className="bg-primary px-3 py-1.5 rounded-full text-white">
            Add Products
          </Link>
        </div>
      )}

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
    </div>
  );
};

const StatCard = ({ icon, stat, label }) => (
  <div className="flex gap-5 bg-[#f3f4f6] py-5 px-6 w-full rounded-md items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <div className="p-4 bg-primary rounded-full">
      {icon}
    </div>
    <div>
      <h1 className="text-xl font-semibold">{stat}</h1>
      <h2 className="text-lg font-medium">{label}</h2>
    </div>
  </div>
);

export default withAuth(Page);
