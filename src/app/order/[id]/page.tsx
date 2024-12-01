// @ts-nocheck
"use client";
import withAuth from '@/components/hoc/withAuth';
import Progress from '@/components/order/Progress';
import { DataTable } from '@/components/DataTable';
import { useGetSingleOrderQuery } from '@/hooks/UseOrders';
import { useParams } from 'next/navigation';
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';
import { CURRENCY } from "@/lib/constants";

interface Product {
  name: string;
  basePrice: number;
  claim: boolean;
  CategoryId: string;
  city: string;
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "basePrice",
    header: "Base Price",
    cell: ({ getValue }) => `{CURRENCY} ${getValue()}`,
  },
  {
    accessorKey: "claim",
    header: "Claim",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  },
  {
    accessorKey: "qty",
    header: "Quantity",
  },
  {
    accessorKey: "city",
    header: "City",
  },
];

const Page = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetSingleOrderQuery(id);

  if (isLoading) return <div className="text-center py-10">Loading order details...</div>;
  if (isError || !data?.success) return <div className="text-center py-10">Error loading order details.</div>;

  const currentStep = data.data.status === 'success' ? 2 : 1;

  // Extract and format order info
  const orderDate = format(new Date(data.data.orderDate), 'yyyy-MM-dd HH:mm');
  const receiverPhoneNo = data.data.receiverPhoneNo;
  const receiverAddress = data.data.receiverAddress;
  const totalAmount = data.data.totalAmount;

  // Map order items to fit the Product interface for the table
  const products = data.data.Order_Items.map((item) => ({
    name: item.Product.name,
    basePrice: item.Product.basePrice,
    claim: item.Product.claim,
    qty: item.quantity,
    city: item.Product.city,
  }));

  return (
    <div className="w-full min-h-[70vh] py-10 space-y-10 px-4 md:px-10 bg-gray-50">
      {/* Order Progress */}
      <div className="w-full">
        <Progress currentStep={currentStep} />
      </div>

      {/* Order Details Section */}
      <div className="border rounded-md p-4 shadow-sm bg-white space-y-4 md:space-y-0 md:flex md:items-center md:justify-between text-sm md:text-base font-medium">
        <div className="space-y-1 md:space-y-0 ">
          <div className="text-gray p-2 rounded-md">
            <span className="font-bold text-primary">Order Date:</span> {orderDate}
          </div>
          <div className="text-gray p-2 rounded-md">
            <span className="font-bold text-primary">Receiver Phone:</span> {receiverPhoneNo}
          </div>
          <div className="text-gray p-2 rounded-md">
            <span className="font-bold text-primary">Receiver Address:</span> {receiverAddress}
          </div>
          <div className="text-gray p-2 rounded-md">
          <span className="font-bold text-primary">Total Amount:</span> {CURRENCY} {totalAmount}
        </div>
        </div>
      
      </div>

      {/* Order Items Table */}
      <div className="flex justify-center items-center w-full bg-white rounded-lg shadow-sm p-4 overflow-x-auto">
        <DataTable columns={columns} data={products} isLoading={isLoading}/>
      </div>
    </div>
  );
};

export default withAuth(Page);
