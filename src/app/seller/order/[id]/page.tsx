// @ts-nocheck
"use client"
import { useGetAllOrdersQuery } from "@/hooks/UseOrders";
import { DataTable } from "@/components/DataTable";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const OrdersPage = () => {
  const { toast } = useToast();
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery({});

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
          onClick={() => navigate(`/orderDetail/${row.original.id}`)}
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
     <div className="w-full lg:w-[80%] mx-auto">
     <DataTable columns={columns} data={orders?.data} isLoading={isLoading} />
     </div>
    </div>
  );
};

export default OrdersPage;
