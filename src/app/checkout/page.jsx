"use client";
import { useSelector } from "react-redux"; // Assuming you're using Redux for state management
import BreadCrum from "@/components/BreadCrum";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"; // Assuming you have a toast for notifications

const Page = () => {
  const cartItems = useSelector((state) => state.cartSlice.items); // Access cart items from Redux store
  const [billingInfo, setBillingInfo] = useState({
    streetAddress: "",
    phone: "",
    shipDifferent: false,
  });
  const [selectedPayment, setSelectedPayment] = useState("");
  const { showToast } = useToast(); // Display feedback notifications

  const handleInputChange = (e) => {
    const { id, value, checked, type } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
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
    // Handle order placement logic here
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="shipDifferent"
              checked={billingInfo.shipDifferent}
              onChange={handleInputChange}
            />
            <label htmlFor="shipDifferent">Ship to a different address</label>
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
                  <h1 className="text-sm">{item.name} x{item.quantity}</h1>
                  <h1 className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</h1>
                </div>
              ))
            ) : (
              <h1 className="text-center">Your cart is empty.</h1>
            )}
          </div>

          {/* Subtotal, Shipping, and Total */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h1 className="text-sm">Subtotal:</h1>
              <h1 className="font-medium text-sm">${subtotal.toFixed(2)}</h1>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <h1 className="text-sm">Shipping:</h1>
              <h1 className="font-medium text-sm">Free</h1>
            </div>
            <hr />
            <div className="flex justify-between items-center">
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
