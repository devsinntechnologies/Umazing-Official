// @ts-nocheck
"use client"
import { useGetAllOrdersQuery } from "@/hooks/UseOrders";
import { DataTable } from "@/components/DataTable";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/hoc/withAuth";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: ordersData, isLoading, isError } = useGetAllOrdersQuery({});
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
      accessorKey: "id",
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
      accessorKey: "totalAmount",
      cell: ({ getValue }) => `Rs. ${getValue()}`,
    },
    {
      header: "Items",
      accessorKey: "Order_Items",
      cell: ({ getValue }) => getValue().length,
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <button
          className="bg-primary text-white px-4 py-2 rounded-full"
          onClick={() => router.push(`/seller/order/${row.original.id}`)}
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="w-full py-6 min-h-[70vh]">
      <Breadcrumb/>
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
        My Orders
      </h1>
     <div className="w-full  mx-auto">
     <DataTable columns={columns} data={orders} isLoading={isLoading} />
     </div>
    </div>
  );
};

export default withAuth(Page);
