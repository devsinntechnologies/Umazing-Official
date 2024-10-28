"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleX, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {
  useGetUserCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} from "@/hooks/UseCart";
import { setCartData } from "@/slice/cartSlice";  // Import your cart slice
import { Skeleton } from "../ui/skeleton";
import LoadingSpinner from "../Navbar/LoadingSpinner";

const CartSection = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const cart = useSelector((state) => state.cartSlice);  // Access cart state from Redux
  const { toast } = useToast();
  const [showLoader, setShowLoader] = useState(false);
  const [refetching, setRefetching] = useState(false);

  const { data: cartData, isLoading: cartLoading, isError: cartError, refetch } = useGetUserCartQuery(
    { skip: !isLoggedIn }
  );
  const [updateCartItem, { isLoading: updatingCart, isError: updateCartError, data: updateData }] = useUpdateCartItemMutation();
  const [removeFromCart, { isLoading: removingCart, isError: removeCartError, data: removeData }] = useRemoveFromCartMutation();

  // Handle cart updates and loading spinner visibility
  useEffect(() => {
    if (cartLoading || updatingCart || removingCart || refetching) {
      setShowLoader(true);
      toast({ title: "Loading...", description: "Processing request...", duration: 500 });
    } else {
      setShowLoader(false);
    }

    if (cartData && cartData.data) {
      dispatch(setCartData({ items: cartData.data, cartId: cartData.id }));
    }

    if (cartError) toast({ title: "Error", description: "Failed to fetch cart data.", variant: "destructive" });
    if (updateData?.success) toast({ title: "Success", description: "Cart updated successfully." });
    if (updateCartError) toast({ title: "Error", description: "Failed to update cart.", variant: "destructive" });
    if (removeData?.success) toast({ title: "Success", description: "Item removed successfully." });
    if (removeCartError) toast({ title: "Error", description: "Failed to remove item from cart.", variant: "destructive" });
  }, [cartLoading, updatingCart, removingCart, cartData, cartError, updateData, updateCartError, removeData, removeCartError, dispatch, toast, refetching]);

  const updateQuantity = async (id, quantity) => {
    await updateCartItem({ id, cartData: { quantity } });
    setRefetching(true);
    await refetch();
    setRefetching(false);
  };

  const removeItem = async (id) => {
    await removeFromCart(id);
    setRefetching(true);
    await refetch();
    setRefetching(false);
  };

  const shippingFee = 200;
  const subtotal = useMemo(() => (
    (cart.items || []).reduce((total, item) => total + item.Product.basePrice * item.quantity, 0)
  ), [cart.items]);
  const total = subtotal + shippingFee;

  return (
    <div className="relative flex flex-col md:flex-row justify-center gap-4 lg:gap-8 py-8">
      {/* Loader Overlay */}
      {showLoader && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}

      {/* Cart Items Section */}
      {cart.items.length ? (
        <div className="border shadow-lg rounded-lg p-2 md:p-3 w-full h-fit flex-1 flex flex-col gap-2">
          {cart.items.map((item) => (
            <div key={item.id} className="h-[100px] lg:h-[126px] flex items-center gap-4 p-2 md:p-3 border rounded-lg shadow-sm bg-white relative">
              <div className="flex-shrink-0 h-full">
                <Image
                  src={`http://97.74.89.204/${item.Product.Product_Images[0].imageUrl}`}
                  alt={item.Product.name}
                  width={100}
                  height={100}
                  className="w-[70px] md:w-[100px] h-full rounded-md object-cover"
                />
              </div>
              <div className="flex-grow h-full">
                <h3 className="text-xs md:text-base lg:text-lg font-semibold h-9 truncate-multiline">{item.Product.name}</h3>
                <p className="text-xs md:text-base lg:text-lg text-primary font-medium">Rs. {item.Product.basePrice}</p>
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
                    disabled={updatingCart || item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xs md:text-base font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full bg-primary text-white"
                    disabled={updatingCart}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !cartLoading && (
          <div className="w-full flex-1 text-lg flex items-center justify-center flex-col gap-3">
            No Products In Cart
            <Link href="/">
              <button className="text-base bg-primary text-white rounded-full px-4 py-2">
                Continue Shopping
              </button>
            </Link>
          </div>
        )
      )}

      {cartLoading && (
        <div className="border shadow-lg rounded-lg p-3 w-full flex-1 flex flex-col gap-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="w-full h-[80px] rounded-lg shadow-sm" />
          ))}
        </div>
      )}

      {/* Cart Total Section */}
      <div className="fixed left-0 bottom-0 md:static w-full md:w-[280px] lg:w-[360px] xl:w-[380px] h-fit bg-white shadow-lg border md:rounded-lg px-2 py-1 md:p-6 flex items-center justify-between md:block">
        <h2 className="text-lg font-bold hidden md:block mb-6">Order Summary</h2>
        <div className="space-y-2 md:space-y-4">
          <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
            <p className="text-gray-600">Subtotal:</p>
            <p className="font-semibold">Rs. {subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
            <p className="text-gray-600">Shipping:</p>
            <p className="font-semibold">Rs. {shippingFee.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm md:text-base md:mt-6 md:border-t pt-4">
          <p className="text-gray-600">Total:</p>
          <p className="font-bold">Rs. {total.toFixed(2)}</p>
        </div>
        <Link href={`/checkout`}>
          <button className="mt-1.5 md:mt-6 w-full px-3 py-2 md:px-4 md:py-3 bg-primary text-white text-sm md:text-base font-medium rounded-lg">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartSection;
