import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Address {
  id: string;
  title: string;
  details: string;
}

const AddressManager = () => {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [formState, setFormState] = useState({ title: '', details: '' });

  // Fetch addresses
  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/addresses'); // Replace with your API
      const data = await response.json();
      setAddresses(data);
    } catch (err) {
      setError('Failed to load addresses.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Add or Edit Address
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const url =
        dialogType === 'edit'
          ? `/api/addresses/${selectedAddress?.id}`
          : '/api/addresses';
      const method = dialogType === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!response.ok) throw new Error('Failed to save address');

      toast({
        title: dialogType === 'edit' ? 'Address updated' : 'Address added',
      });

      setIsDialogOpen(false);
      fetchAddresses(); // Refresh addresses
    } catch (err) {
      toast({ title: 'Failed to save address', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Address
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/addresses/${selectedAddress?.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete address');

      toast({ title: 'Address deleted'});
      setIsDialogOpen(false);
      fetchAddresses(); // Refresh addresses
    } catch (err) {
      toast({ title: 'Failed to delete address',  variant: 'destructive'  });
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = (type: 'add' | 'edit' | 'delete', address?: Address) => {
    setDialogType(type);
    setSelectedAddress(address || null);
    setFormState({ title: address?.title || '', details: address?.details || '' });
    setIsDialogOpen(true);
  };

  return (
    <div>
      <h1 className="text-lg font-semibold">Manage Addresses</h1>

      {/* Add Button */}
      <Button onClick={() => openDialog('add')} className="my-4">
        + Add Address
      </Button>

      {/* Address List */}
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && addresses.length === 0 && <p>No addresses found.</p>}

      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="p-4 border rounded flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{address.title}</h3>
              <p className="text-sm text-gray-500">{address.details}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                onClick={() => openDialog('edit', address)}
              >
                ✏️ Edit
              </Button>
              <Button
                variant="ghost"
                onClick={() => openDialog('delete', address)}
              >
                🗑️ Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'add' && 'Add Address'}
              {dialogType === 'edit' && 'Edit Address'}
              {dialogType === 'delete' && 'Delete Address'}
            </DialogTitle>
          </DialogHeader>

          {dialogType !== 'delete' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="space-y-4">
                <Input
                  // label="Title"
                  value={formState.title}
                  onChange={(e) =>
                    setFormState({ ...formState, title: e.target.value })
                  }
                  required
                />
                <Input
                  // label="Details"
                  value={formState.details}
                  onChange={(e) =>
                    setFormState({ ...formState, details: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          )}

          {dialogType === 'delete' && (
            <>
              <p>Are you sure you want to delete this address?</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="bg-red-500 text-white"
                >
                  {isLoading ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressManager;
