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
  const [phone, setPhone] = useState("+92 ");
  const { toast } = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "streetAddress") setStreetAddress(value);
    if (id === "phone") {
      let phoneValue = value.replace('+92 ', '').replace(/\D/g, '');
      
      if (phoneValue.length <= 10) {
        const formattedValue = `+92 ${phoneValue}`;
        setPhone(formattedValue);
      }
    }
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
          <div className="relative flex items-center">
            <span className="absolute left-2 text-gray-800">+92</span>
            <input
              type="tel"
              id="phone"
              placeholder="3001234567"
              value={phone.replace('+92 ', '')}
              onChange={handleInputChange}
              className="pl-12 w-full border border-gray-300 rounded-md p-2 placeholder:text-base focus:outline-none"
              maxLength={10}
            />
          </div>
        </div>
        <Button onClick={handleAddAddress} className="mt-4" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressDialog;
