// @ts-nocheck
"use client";
import { useSelector } from "react-redux";
import BreadCrumb from "@/components/BreadCrumb";
import { useState, ChangeEvent, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGetUserCartQuery } from "@/hooks/UseCart";
import withAuth from "@/components/hoc/withAuth";
import { useAddUserAddressMutation, useDeleteAddressByIdMutation, useGetUserProfileQuery } from "@/hooks/UseAuth";
import { RootState } from "@/store/store";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useCreateOrderMutation } from "@/hooks/UseOrders";

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

interface Address {
  id: string;
  address: string;
  phoneNo: string;
}

const Page: React.FC = () => {
  const { toast } = useToast();
  const isLoggedIn = useSelector((state: RootState) => state.authSlice.isLoggedIn);
  const userId = useSelector((state: RootState) => state.authSlice.user?.id);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [address, setAddress] = useState<Address[]>([]);
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({ streetAddress: "", phone: "" });
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (userId && isLoggedIn) {
      setTriggerFetch(true);
    }
  }, [userId, isLoggedIn]);

  const { data: userProfile, error, isLoading, refetch } = useGetUserProfileQuery(userId, { skip: !triggerFetch });
  const { data: cartData, isLoading: cartLoading } = useGetUserCartQuery({ skip: !isLoggedIn });
  const [addAddress, { data: resData, isLoading: addingAddress }] = useAddUserAddressMutation();
  const [deleteAddress] = useDeleteAddressByIdMutation();
  const [createOrder, { data: resDataOrder, isLoading: placingOrder }] = useCreateOrderMutation()

  useEffect(() => {
    setAddress(userProfile?.data?.addresses || []);
  }, [userProfile]);

  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem("selectedItems") || "[]");
    if (localStorageItems.length === 0) {
      window.location.href = "/cart";
      return;
    }
    const filteredCartItems = cartData?.data.filter((item: CartItem) =>
      localStorageItems.some((localItem) => localItem.id === item.id.toString())
    ) || [];
    setCartItems(filteredCartItems);
  }, [cartData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddress(addressId);
      toast({
        title: "Address Deleted",
        description: "The address has been deleted successfully.",
      });
      refetch(); // Refresh the addresses after deletion
    } catch (error) {
      toast({
        title: "Error Deleting Address",
        description: "There was an issue deleting your address. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
        toast({
            title: "No Address Selected",
            description: "Please select an address for delivery.",
            variant: "destructive",
        });
        return;
    }

    const orderDetails = {
        OrderInfo: cartItems.map((item: CartItem) => ({
            ProductId: item.Product.id,
            quantity: item.quantity,
        })),
        receiverPhoneNo: selectedAddress.phoneNo,
        receiverAddress: selectedAddress.address,
    };

    console.log(orderDetails);
    
    try {
        const response = await createOrder(orderDetails).unwrap(); // Unwrap to get the result
        if (response.success) {
            toast({
                title: "Order Placed",
                description: "Your order has been placed successfully!",
            });
            localStorage.removeItem("selectedItems"); // Clear local storage
            window.location.href = "/orders"; // Redirect to orders page
        } else if (response.success === false) { // Use else if here
            toast({
                title: "Order Failed",
                description: response.message, // Show the actual error message from response
                variant: "destructive",
            });
        }
    } catch (error) {
        toast({
            title: "Error Placing Order",
            description: error.data.message,
            variant: "destructive",
        });
    }
};



  const subtotal = cartItems.reduce((total, item) => total + item.Product.basePrice * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleAddAddress = async () => {
    try {
      if (!billingInfo.streetAddress || !billingInfo.phone) {
        toast({
          title: "Incomplete Information",
          description: "Please enter both address and phone number.",
          variant: "destructive",
        });
        return;
      }

      await addAddress({
        address: billingInfo.streetAddress,
        phoneNo: billingInfo.phone,
        UserId: userId,
      });

      if (resData?.success) {
        toast({
          title: "Address Added",
          description: "Your new address has been added successfully!",
        });
        setIsDialogOpen(false);
        refetch();
      }
    } catch (error) {
      toast({
        title: "Error Adding Address",
        description: "There was an issue adding your address. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <BreadCrumb />
      <div className="flex w-full p-5 gap-10 flex-wrap md:flex-nowrap lg:px-10">
        <div className="w-full flex flex-col gap-5 md:w-[60%]">
          <h1 className="font-medium text-2xl">Billing Information</h1>

          {isLoading ? (
            <Skeleton className="h-16 w-full" />
          ) : address.length > 0 ? (
            address.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddress(addr)}
                className={`relative w-full bg-gray-200 rounded-md p-4 cursor-pointer transition-all duration-300 border border-transparent ${selectedAddress?.id === addr.id ? "!border-primary bg-foreground text-primary" : "bg-foreground"
                  }`}
              >
                <p className="text-sm md:text-base 2xl:text-lg font-semibold">{addr.address}</p>
                <p className="text-xs md:text-sm 2xl:text-base  text-gray-600">{addr.phoneNo}</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <X className="absolute top-3 right-3 size-4 text-destructive cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteAddress(addr.id)} className="bg-destructive">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))
          ) : (
            <p>No address found.</p>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Add More</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <label htmlFor="streetAddress" className="text-sm font-normal">
                  Street Address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  placeholder="Street Address"
                  value={billingInfo.streetAddress}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 placeholder:text-base focus:outline-none"
                />
                <label htmlFor="phone" className="text-sm font-normal">Phone</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Phone number"
                  value={billingInfo.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 placeholder:text-base focus:outline-none"
                />
              </div>
              <Button onClick={handleAddAddress} className="mt-4" disabled={addingAddress}>
                {addingAddress ? "Adding..." : "Add"}
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full md:w-[40%]">
          <h1 className="font-medium text-2xl">Order Summary</h1>
          {cartLoading ? (
            <Skeleton className="h-16 w-full" />
          ) : cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.Product.name} x {item.quantity}</span>
                  <span>Rs. {item.Product.basePrice * item.quantity}</span>
                </div>
              ))}
              <hr />
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>{shipping === 0 ? "Free Shipping" : `Rs. ${shipping}`}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>
              <Button disabled={placingOrder} onClick={handlePlaceOrder} className="w-full mt-4">
                {placingOrder ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(Page);