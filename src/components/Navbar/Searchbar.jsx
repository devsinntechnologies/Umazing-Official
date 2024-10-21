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
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form's default submission behavior
    const currentParams = new URLSearchParams(window.location.search);
    const trimmedSearchTerm = searchTerm.trim();

    // Perform the search only if the trimmed search term is not empty
    if (trimmedSearchTerm) {
      currentParams.set('name', trimmedSearchTerm);
    } else {
      currentParams.delete('name'); // Remove 'name' query if the input is empty
    }

    router.push(`/search?${currentParams.toString()}`);
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

  // Determine if the search button should be disabled
  const isSearchDisabled = !searchTerm.trim(); // true if searchTerm is empty or whitespace

  return (
    <form className="items-center flex w-full md:w-1/2 border rounded-full overflow-hidden" onSubmit={handleSearch}>
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
            type="button" // Change to type="button" to prevent form submission on clear
            className="absolute top-[50%] -translate-y-[50%] right-2 size-6 md:size-8 text-primary rounded-full flex items-center justify-center p-1"
            onClick={handleClearSearch}
          >
            <X size={24} />
          </button>
        )}
      </div>
      <button
        className={`bg-primary py-2 px-3 text-white h-9 md:h-11 w-12 text-lg flex items-center justify-center gap-2 ${
          isSearchDisabled ? 'opacity-80' : 'opacity-100'
        }`}
        type="submit" // Submit the form when clicked
        disabled={isSearchDisabled} // Disable button if the search term is invalid
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default Searchbar;
