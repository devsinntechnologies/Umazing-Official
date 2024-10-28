"use client";
import { useSelector } from "react-redux";
import BreadCrum from "@/components/BreadCrum";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGetUserCartQuery } from "@/hooks/UseCart";

const Page = () => {
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const { data: cartData, isLoading: cartLoading, isError: cartError, refetch } = useGetUserCartQuery(
    { skip: !isLoggedIn }
  );
  const [billingInfo, setBillingInfo] = useState({
    streetAddress: "",
    phone: "",
  });
  const [selectedPayment, setSelectedPayment] = useState("");
  const { showToast } = useToast(); 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handlePlaceOrder = () => {
    if (!billingInfo.streetAddress || !billingInfo.phone) {
      showToast("Please fill in all billing information.", "error");
      return;
    }
    if (!selectedPayment) {
      showToast("Please select a payment method.", "error");
      return;
    }

    // Log order details in the specified format
    const orderDetails = {
      OrderInfo: cartData?.data.map(item => ({
        ProductId: item.Product.id,
        quantity: item.quantity,
      })),
      receiverPhoneNo: billingInfo.phone,
      receiverAddress: billingInfo.streetAddress,
    };
    console.log(orderDetails);

    // Continue with further order placement logic
  };

  // Calculate subtotal
  const cartItems = cartData?.data || [];
  const subtotal = cartItems.reduce((total, item) => total + item.Product.basePrice * item.quantity, 0);
  const shipping = 0; // Assuming free shipping
  const total = subtotal + shipping;

  return (
    <>
      <BreadCrum />
      <div className="flex w-full p-5 gap-10 flex-wrap md:flex-nowrap lg:px-10">
        {/* Billing Information */}
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

        {/* Order Summary */}
        <div className="border border-[#E6E6E6] p-5 rounded-lg w-full md:w-[40%]">
          <h1 className="font-medium text-xl">Order Summary</h1>
          <div className="flex flex-col gap-4">
            {/* Product Items */}
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

          {/* Subtotal, Shipping, and Total */}
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

          {/* Payment Method */}
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

          {/* Place Order Button */}
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

export default Page;
