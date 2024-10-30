"use client";
import { useSelector } from "react-redux";
import BreadCrumb from "@/components/BreadCrumb";
import { useState, ChangeEvent, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGetUserCartQuery } from "@/hooks/UseCart";
import withAuth from "@/components/hoc/withAuth";
import { useGetUserProfileQuery } from "@/hooks/UseAuth";
import { RootState } from "@/store/store";

interface BillingInfo {
  streetAddress: string;
  phone: string;
}

interface CartItem {
  id: number;
  Product: {
    id: number;
    name: string;
    basePrice: number;
  };
  quantity: number;
}

const Page: React.FC = () => {
  const { toast } = useToast();
  const isLoggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);
  const userId = useSelector((state: RootState) => state.authSlice.user?.id);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    if (userId && isLoggedIn) {
      setTriggerFetch(true);
    }
  }, [userId, isLoggedIn]);

  const {
    data: userProfile,
    error,
    isLoading,
    refetch,
  } = useGetUserProfileQuery(userId, {
    skip: !triggerFetch,
  });
  const { data: cartData, isLoading: cartLoading, isError: cartError } = useGetUserCartQuery(
    { skip: !isLoggedIn }
  );

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    streetAddress: "",
    phone: "",
  });
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const localStorageItems: { id: string; quantity: number; }[] = JSON.parse(localStorage.getItem("selectedItems") || "[]");
    
    // If no items in local storage, navigate back to the cart page
    if (localStorageItems.length === 0) {
      window.location.href = "/cart"; // Redirect to cart page
      return;
    }

    // Filter the cartData to get only items present in localStorage
    const filteredCartItems = cartData?.data.filter((item: CartItem) => 
      localStorageItems.some(localItem => localItem.id === item.id.toString())
    ) || [];

    setCartItems(filteredCartItems);
  }, [cartData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handlePlaceOrder = () => {
    if (!billingInfo.streetAddress || !billingInfo.phone) {
      toast({
        title: "Incomplete Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    const orderDetails = {
      OrderInfo: cartItems.map((item: CartItem) => ({
        ProductId: item.Product.id,
        quantity: item.quantity,
      })),
      receiverPhoneNo: billingInfo.phone,
      receiverAddress: billingInfo.streetAddress,
    };
    console.log(orderDetails);
  };

  const subtotal = cartItems.reduce((total, item) => total + item.Product.basePrice * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <>
      <BreadCrumb />
      <div className="flex w-full p-5 gap-10 flex-wrap md:flex-nowrap lg:px-10">
        <div className="w-full flex flex-col gap-5 md:w-[60%]">
          <h1 className="font-medium text-2xl">Billing Information</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="streetAddress" className="text-sm font-normal">
              Street Address
            </label>
            <input
              type="text"
              id="streetAddress"
              placeholder="Street Address"
              value={billingInfo.streetAddress}
              onChange={handleInputChange}
              className="border border-[#cbc9c9] rounded-md p-2 placeholder:text-base focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-normal">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Phone number"
              value={billingInfo.phone}
              onChange={handleInputChange}
              className="border border-[#cbc9c9] rounded-md p-2 placeholder:text-base focus:outline-none"
            />
          </div>
        </div>

        <div className="border border-[#E6E6E6] p-5 rounded-lg w-full md:w-[40%]">
          <h1 className="font-medium text-xl">Order Summary</h1>
          <div className="flex flex-col gap-4">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <h1 className="text-sm">{item.Product.name} x{item.quantity}</h1>
                  <h1 className="font-medium text-sm">${(item.Product.basePrice * item.quantity).toFixed(2)}</h1>
                </div>
              ))
            ) : (
              <h1 className="text-center">Your cart is empty.</h1>
            )}
          </div>

          <div className="mt-3">
            <div className="flex justify-between items-center py-3">
              <h1 className="text-sm">Subtotal:</h1>
              <h1 className="font-medium text-sm">${subtotal.toFixed(2)}</h1>
            </div>
            <hr />
            <div className="flex justify-between items-center py-3">
              <h1 className="text-sm">Shipping:</h1>
              <h1 className="font-medium text-sm">Free</h1>
            </div>
            <hr />
            <div className="flex justify-between items-center py-3">
              <h1 className="text-base">Total:</h1>
              <h1 className="font-semibold text-lg">${total.toFixed(2)}</h1>
            </div>
          </div>

          <h1 className="font-medium text-xl mt-4">Payment Method</h1>
          {["Cash on Delivery", "PayPal", "Amazon Pay"].map((method, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="radio"
                id={method}
                name="payment"
                checked={selectedPayment === method}
                onChange={() => setSelectedPayment(method)}
              />
              <label htmlFor={method} className="text-sm">{method}</label>
            </div>
          ))}

          <button
            onClick={handlePlaceOrder}
            className="w-full py-3 mt-4 bg-primary text-white rounded-full"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default withAuth(Page);
