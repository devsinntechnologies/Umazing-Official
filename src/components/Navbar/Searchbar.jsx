import { Search, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the initial 'name' value from the URL query parameters
  const initialName = searchParams.get('name') || "";
  
  // State for the search term
  const [searchTerm, setSearchTerm] = useState(initialName);

  // Function to handle search action
  const handleSearch = () => {
    const currentParams = new URLSearchParams(window.location.search);
    const trimmedSearchTerm = searchTerm.trim();

    // Don't perform the search if the search term is empty or whitespace
    if (trimmedSearchTerm) {
      currentParams.set('name', trimmedSearchTerm);
      router.push(`/search?${currentParams.toString()}`);
    } else {
      currentParams.delete('name'); // Remove 'name' query if the input is empty
      router.push(`/search?${currentParams.toString()}`);
    }
  };

  // Function to clear the search input and remove 'name' from the URL
  const handleClearSearch = () => {
    setSearchTerm(""); // Clear the search term in the state
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete('name'); // Remove 'name' from query parameters
    router.push(`/search?${newParams.toString()}`); // Push the updated URL
  };

  // Effect to update searchTerm if the URL changes externally
  useEffect(() => {
    setSearchTerm(initialName); // Sync state with URL on initial load
  }, [initialName]);

  return (
    <div className="items-center flex w-full md:w-1/2 border rounded-full overflow-hidden">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search products"
          className="w-full text-sm md:text-base px-3 py-2 rounded-md outline-none focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Show the clear button only if there's a search term */}
        {searchTerm.trim() && (
          <button
            className="absolute top-[50%] -translate-y-[50%] right-2 size-6 md:size-8 text-primary rounded-full flex items-center justify-center bg-secondary p-1"
            onClick={handleClearSearch}
          >
            <X size={24} />
          </button>
        )}
      </div>
      <button
        className="py-2 px-3 text-white bg-primary h-9 md:h-11 w-12 text-lg flex items-center justify-center gap-2"
        onClick={handleSearch}
      >
        <Search size={18} />
      </button>
    </div>
  );
};

export default Searchbar;
