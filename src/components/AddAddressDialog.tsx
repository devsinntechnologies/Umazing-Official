// AddAddressDialog.tsx
import { useState, ChangeEvent } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AddAddressDialogProps {
  onSubmit: (address: string, phone: string) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
}

const AddAddressDialog: React.FC<AddAddressDialogProps> = ({ onSubmit, isOpen, onClose, isLoading }) => {
  const [streetAddress, setStreetAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "streetAddress") setStreetAddress(value);
    if (id === "phone") setPhone(value);
  };

  const handleAddAddress = async () => {
    if (!streetAddress.trim() || !phone.trim()) {
      toast({
        title: "Incomplete Information",
        description: "Please enter both address and phone number.",
        variant: "destructive",
      });
      return;
    }

    await onSubmit(streetAddress.trim(), phone.trim());
    setStreetAddress("");  
    setPhone("");
    onClose(); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <label htmlFor="streetAddress" className="text-sm font-normal">Street Address</label>
          <input
            type="text"
            id="streetAddress"
            placeholder="Street Address"
            value={streetAddress}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 placeholder:text-base focus:outline-none"
          />
          <label htmlFor="phone" className="text-sm font-normal">Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Phone number"
            value={phone}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 placeholder:text-base focus:outline-none"
            pattern="\d*"
            maxLength={10} 
          />
        </div>
        <Button onClick={handleAddAddress} className="mt-4" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressDialog;
