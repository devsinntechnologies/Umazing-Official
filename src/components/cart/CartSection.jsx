"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleX, Minus, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {
  useGetUserCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} from "@/hooks/UseCart";
import { Skeleton } from "../ui/skeleton";

const CartSection = () => {
  const userId = useSelector((state) => state.authSlice?.user?.id);
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const { toast } = useToast();

  const { data: cartData, isLoading: cartLoading, isError: cartError, refetch } = useGetUserCartQuery(userId, { skip: !isLoggedIn });
  const [updateCartItem, { isLoading: updatingCart, isError: updateCartError, data: updateData }] = useUpdateCartItemMutation();
  const [removeFromCart, { isLoading: removingCart, isError: removeCartError, data: removeData }] = useRemoveFromCartMutation();

  useEffect(() => {
    if (cartLoading) {
      toast({
        title: "Loading...",
        description: "Fetching cart data...",
      });
    }
    if (cartError) {
      toast({
        title: "Error",
        description: "Failed to fetch cart data.",
        variant: "destructive",
      });
    }
    if (updateData?.success) {
      toast({
        title: "Success",
        description: updateData.msg || "Cart updated successfully.",
      });
    }
    if (updateCartError) {
      toast({
        title: "Error",
        description: "Failed to update cart.",
        variant: "destructive",
      });
    }
    if (removeData?.success) {
      toast({
        title: "Success",
        description: removeData.msg || "Item removed successfully.",
      });
    }
    if (removeCartError) {
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    }
  }, [cartLoading, cartError, updateData, updateCartError, removeData, removeCartError, toast]);

  const updateQuantity = (id, quantity) => {
    updateCartItem({ id, cartData: { quantity } });
    refetch();
  };

  const removeItem = (id) => {
    removeFromCart(id);
    refetch();
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 py-8">
      {/* Cart Items Section */}
      {cartData?.data && <div className="border shadow-lg rounded-lg p-1 sm:p-2 md:p-3 w-full flex-1 flex flex-col gap-2">
        {cartData?.data?.map((item) => (
          <div key={item.id} className="h-[80px] md:h-[100px] lg:h-[126px] flex items-center gap-4 p-2 md:p-3 border rounded-lg shadow-sm bg-white relative">
            <div className="flex-shrink-0 h-full">
              <Image
                src={`http://97.74.89.204/${item?.Product?.Product_Images[0].imageUrl}`}
                alt={item.Product?.name}
                width={100}
                height={100}
                className="w-[70px] md:w-[100px] h-full rounded-md object-cover"
              />
            </div>
            <div className="flex-grow h-full">
              <h3 className="text-xs sm:text-sm md:text-lg font-semibold h-9 truncate-multiline overflow-hidden">{item.Product?.name}</h3>
              <p className="text-xs sm:text-sm md:text-lg text-primary font-medium">${item.Product.basePrice}</p>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
                <CircleX
                  onClick={() => removeItem(item.id)}
                  className="text-destructive cursor-pointer w-5"
                  size={24}
                  disabled={removingCart}
                />
              <div className="flex items-center gap-2 md:space-x-4 p-1 rounded-2xl border md:border-primary">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-primary text-white"
                  disabled={updatingCart}
                >
                  <Minus size={16} className="size-3"/>
                </button>
                <span className="text-xs md:text-base font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-primary text-white"
                  disabled={updatingCart}
                >
                  <Plus size={16} className="size-3"/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      }

      {cartLoading &&
        <div className="border shadow-lg rounded-lg p-3 w-full flex-1 flex flex-col gap-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="w-full h-[80px] rounded-lg shadow-sm" />
          ))}
        </div>
      }

      {/* Cart Total Section */}
      <div className="w-full md:w-[320px] lg:w-[380px] bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-600">Subtotal:</p>
          <p className="font-semibold">
            ${cartData?.items?.reduce((total, item) => total + item.price * item.quantity, 0)}
          </p>
        </div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-600">Shipping:</p>
          <p className="font-semibold">₹100.00</p>
        </div>
        <div className="flex justify-between items-center border-t pt-3 mt-3">
          <p className="text-lg font-semibold">Total:</p>
          <p className="text-lg font-semibold">
            ₹{cartData?.items?.reduce((total, item) => total + item.price * item.quantity, 0) + 100}
          </p>
        </div>
        <Link href="/checkout">
          <button className="mt-6 w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark">
            Proceed to checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartSection;
