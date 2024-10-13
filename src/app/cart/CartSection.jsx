"use client";
import Image from "next/image";
import capsi from "../images/capsi.jpg";
import { MdOutlineCancel } from "react-icons/md";
import red from "../images/red.jpg";
import { useState } from "react";
import Link from "next/link";

const CartSection = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Green Capsicum",
      price: 14.0,
      quantity: 5,
      image: capsi,
    },
    {
      id: 2,
      name: "Red Capsicum",
      price: 14.0,
      quantity: 1,
      image: red,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-center gap-3 px-4 py-8">
      {/* Cart Product Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:max-w-4xl">
        {/* Table Headers (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-4 gap-4 text-left mb-4">
          <p className="font-semibold">Product</p>
          <p className="font-semibold">Price</p>
          <p className="font-semibold">Quantity</p>
          <p className="font-semibold">Subtotal</p>
        </div>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <div key={item.id} className="border-b pb-4 mb-4">
            {/* Mobile View Layout */}
            <div className="md:hidden space-y-2">
              <div className="flex justify-between">
                <p className="font-semibold">Product:</p>
                <p>{item.name}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Price:</p>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Quantity:</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 border rounded text-xl"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 border rounded text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Subtotal:</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>

            {/* Desktop View Layout */}
            <div className="hidden md:grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center space-x-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-[55px] h-[40px] rounded-md"
                />
                <p className="text-sm font-medium">{item.name}</p>
              </div>
              <p className="text-gray-500">${item.price.toFixed(2)}</p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 border rounded text-xl"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 border rounded text-xl"
                >
                  +
                </button>
              </div>
              <div className="flex gap-5">
                <p className="text-lg font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <MdOutlineCancel
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 text-2xl"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Bottom Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6 gap-2">
          <button className="px-6 py-3 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 w-full sm:w-auto">
            Return to shop
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full sm:w-auto">
            Update Cart
          </button>
        </div>

        {/* Coupon Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-2">
          <p className="font-semibold">Coupon Code</p>
          <div className="flex w-full sm:w-auto py-1 px-2 items-center rounded-3xl border-2 border-gray-300">
            <input
              type="text"
              placeholder="Enter Code"
              className="w-full sm:w-[250px] bg-transparent outline-none"
            />
            <button className="bg-black text-white rounded-3xl py-2 px-3">
              Apply Coupon
            </button>
          </div>
        </div>
      </div>

      {/* Cart Total Section */}
      <div className="w-full md:w-1/4 flex flex-col justify-between bg-white shadow-md rounded-lg p-6 mt-8 md:mt-0">
        <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600">Subtotal:</p>
          <p className="font-medium">$84.00</p>
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600">Shipping:</p>
          <p className="font-medium">Free</p>
        </div>
        <div className="flex justify-between items-center border-t pt-2 mt-4">
          <p className="text-lg font-semibold">Total:</p>
          <p className="text-lg font-semibold">$84.00</p>
        </div>

        <Link href="/checkout">
          <button className="mt-6 w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Proceed to checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartSection;
