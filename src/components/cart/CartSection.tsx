// @ts-nocheck
"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleX, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useGetUserCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} from "@/hooks/UseCart";
import { Skeleton } from "../ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import { CURRENCY } from "@/lib/constants";


interface CartItem {
  id: string;
  quantity: number;
  Product: {
    basePrice: number;
    name: string;
    Product_Images: { imageUrl: string }[];
  };
}

const CartSection = () => {
  const router = useRouter()
  const [cart, setCart] = useState([]);
  const { toast } = useToast();
  const [showLoader, setShowLoader] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});

  const [removeFromCart] = useRemoveFromCartMutation();
  const { data: cartData, isLoading: cartLoading, refetch } = useGetUserCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();

  useEffect(() => {
    if (cartData && cartData.data) {
      setCart(cartData.data);
    }
  }, [cartData]);

  useEffect(() => {
    if (cart.length > 0) {
      const allSelected = {};
      cart.forEach((item) => (allSelected[item.id] = item.quantity));
      setSelectedItems(allSelected);
    }
  }, [cart]);

  const updateQuantity = async (id, quantity) => {
    setUpdatingItemId(id);
    setShowLoader(true);
    try {
      await updateCartItem({ id, cartData: { quantity } });
      // Update the local state directly after a successful API call
      const updatedItems = cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      );

      // If the updated quantity is zero, remove from selectedItems
      setSelectedItems((prev) => {
        const newSelected = { ...prev };
        if (quantity === 0) {
          delete newSelected[id];
        } else if (newSelected[id]) {
          newSelected[id] = quantity; // Update existing selection
        }
        return newSelected;
      });

      // Update the cart state with the new items
      setCart(updatedItems);
    } catch (error) {
      toast({ title: "Error", description: "Failed to update quantity.", variant: "destructive" });
    } finally {
      setUpdatingItemId(null);
      setShowLoader(false);
    }
  };

  const removeItem = async (id) => {
    setUpdatingItemId(id);
    setShowLoader(true);
    try {
      await removeFromCart(id);
      // Remove the item from local state directly after successful API call
      const updatedItems = cart.filter(item => item.id !== id);
      setCart(updatedItems);

      // Remove from selectedItems if it's being removed
      setSelectedItems((prev) => {
        const newSelected = { ...prev };
        delete newSelected[id]; // Remove from selected items
        return newSelected;
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to remove item.", variant: "destructive" });
    } finally {
      setUpdatingItemId(null);
      setShowLoader(false);
    }
  };

  const handleSelectItem = (id, quantity) => {
    setSelectedItems((prev) => {
      const updated = { ...prev };
      updated[id] ? delete updated[id] : (updated[id] = quantity);
      return updated;
    });
  };

  const handleSelectAll = () => {
    if (Object.keys(selectedItems).length === cart.length) {
      setSelectedItems({});
    } else {
      const allSelected = {};
      cart.forEach((item) => (allSelected[item.id] = item.quantity));
      setSelectedItems(allSelected);
    }
  };

  const handleCheckout = () => {
    if (Object.keys(selectedItems).length === 0) {
      toast({ title: "Error", description: "Please select at least one product.", variant: "destructive" });
      return;
    }
    const selectedItemsArray = Object.entries(selectedItems).map(([id, quantity]) => ({ id, quantity }));
    localStorage.setItem("selectedItems", JSON.stringify(selectedItemsArray));
    // Optional: Navigate to the checkout page
    router.push("/checkout");
  };

  const shippingFee = 0;

  // Calculate selected subtotal directly from the cart state
  const selectedSubtotal = useMemo(() => {
    return Object.entries(selectedItems).reduce((total, [id, quantity]) => {
      const item = cart.find((item) => item.id === id);
      return item ? total + item.Product.basePrice * quantity : total;
    }, 0);
  }, [cart, selectedItems]);

  const total = selectedSubtotal + (selectedSubtotal ? shippingFee : 0);

  return (
    <div className="relative flex flex-col md:flex-row justify-center gap-4 lg:gap-8 py-8">
      {showLoader && <LoadingSpinner />}

      {cart.length ? (
        <div className="border shadow-lg rounded-lg p-2 md:p-3 w-full h-fit flex-1 flex flex-col gap-2">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={Object.keys(selectedItems).length === cart.length}
              onChange={handleSelectAll}
              className="mr-2"
            />
            <span>Select All</span>
          </div>
          {cart.map((item) => (
            <div key={item.id} className="h-[100px] lg:h-[126px] flex items-center gap-4 p-2 md:p-3 border rounded-lg shadow-sm bg-white relative">
              <input
                type="checkbox"
                checked={!!selectedItems[item.id]}
                onChange={() => handleSelectItem(item.id, item.quantity)}
                className="mr-2"
              />
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
                <p className="text-xs md:text-base lg:text-lg text-primary font-medium">{CURRENCY} {item.Product.basePrice}</p>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <CircleX
                      className={`text-destructive cursor-pointer w-5 ${updatingItemId === item.id ? "opacity-50 pointer-events-none" : ""}`}
                      size={24}
                    /></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                      Are you absolutely sure to remove this product from cart?
                   </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction   onClick={() => removeItem(item.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <div className="flex items-center gap-2 md:space-x-2 lg:space-x-4 p-1 rounded-2xl border md:border-primary">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full bg-primary text-white"
                    disabled={item.quantity <= 1 || updatingItemId === item.id}
                  >
                    <Minus size={16} className="size-3 lg:size-4" />
                  </button>
                  <span className="text-xs md:text-base font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full bg-primary text-white"
                    disabled={updatingItemId === item.id}
                  >
                    <Plus size={16} className="size-3 lg:size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        cartLoading ? <div className="border shadow-lg rounded-lg p-3 w-full flex-1 flex flex-col gap-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="w-full h-[80px] rounded-lg shadow-sm" />
          ))}
        </div> : (
          <div className=" w-full flex-1 text-lg flex items-center justify-center flex-col gap-2">
            <h1 className="text-lg font-semi">No products Found</h1>
            <Link href="/" className="bg-primary text-white rounded-full px-5 py-2 text-base">Shop Now</Link>
          </div>
        )
      )}

      <div className="fixed bottom-0 left-0 flex-row md:sticky border-t-2 md:border-none bg-white shadow-lg md:rounded-lg border p-4 flex md:flex-col gap-2 md:gap-5 w-full md:w-[270px] lg:w-[360px] xl:w-[400px] h-fit justify-between items-center">
        <h2 className="hidden md:block font-bold text-lg">Order Summary</h2>
        <div className=" md:w-full md:space-y-4">
          <div className="w-fit md:w-full flex md:block text-xs md:text-base">
            <div className="hidden sm:flex gap-2 md:justify-between mb-2">
              <p className="font-semibold">Subtotal:</p>
              <p>{CURRENCY} {selectedSubtotal}</p>
            </div>
            <div className="flex gap-2 md:justify-between mb-2">
              <p className="font-semibold">Shipping Fee:</p>
              <p>{shippingFee === 0 ? "Free Shipping" : <>{CURRENCY} {shippingFee}</>}</p>
            </div>
          </div>
          <hr className="hidden md:block w-full" />
          <div className="w-fit md:w-full flex gap-2 md:justify-between text-base sm:text-xs md:text-base md:mb-2 font-semibold">
            <p className="font-semibold">Total:</p>
            <p>{CURRENCY} {total}</p>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="md:w-full bg-primary text-white rounded-full px-5 py-1.5 text-sm sm:text-base lg::text-lg h-fit"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSection;
