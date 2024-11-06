// @ts-nocheck
"use client"
import { useGetSellerOrdersQuery, useUpdateOrderMutation } from "@/hooks/UseOrders";
import { DataTable } from "@/components/DataTable";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/hoc/withAuth";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: ordersData, isLoading, isError ,refetch} = useGetSellerOrdersQuery({});
  const [orders,setOrders] = useState([])

  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData.data)
    }
  }, [ordersData])

  if (isError) {
    toast({
      title: "Error",
      description: "Failed to load orders. Please try again.",
    });
  }

  const columns = [
    {
      header: "Order ID",
      accessorKey: "OrderId",
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Total Amount",
      accessorKey: "price",
      cell: ({ getValue }) => `Rs. ${getValue()}`,
    },
    {
      header: "Product",
      accessorKey: "Product.name",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {row.original.status === "complete" ? (
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-full cursor-not-allowed"
              disabled
            >
              Completed
            </button>
          ) : (
            <button
              className="bg-primary text-white px-4 py-2 rounded-full"
              onClick={() => handleUpdateStatus(row.original.id)}
            >
              Complete
            </button>
          )}
        </div>
      ),
    },
  ];

  const [updateOrder] = useUpdateOrderMutation();

  const handleUpdateStatus = async (id: string) => {
    try {
      const response = await updateOrder({ 
        id,
        status: "complete" 
      }).unwrap();
      
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
      refetch();

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full py-6 min-h-[70vh]">
      <Breadcrumb/>
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
        Orders
      </h1>
     <div className="w-full  mx-auto">
     <DataTable columns={columns} data={orders} isLoading={isLoading} />
     </div>
    </div>
  );
};

export default withAuth(Page);
