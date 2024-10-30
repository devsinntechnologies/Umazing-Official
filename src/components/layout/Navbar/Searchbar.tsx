import { Search, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Searchbar: React.FC = () => {
  const router = useRouter();

  // State for the search term
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Function to handle search action
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

    // Use URLSearchParams to keep existing parameters and update the 'name' parameter
    const currentParams = new URLSearchParams(window.location.search);

    if (trimmedSearchTerm) {
      currentParams.set('name', trimmedSearchTerm);
    } else {
      currentParams.delete('name');
    }

    // Push updated URL with modified search parameters
    router.push(`/search?${currentParams.toString()}`);
  };

  // Function to clear the search input and remove 'name' from the URL
  const handleClearSearch = () => {
    setSearchTerm("");

    // Use URLSearchParams to keep existing parameters and remove only the 'name' parameter
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete('name');

    // Push updated URL with modified search parameters
    router.push(`/search?${currentParams.toString()}`);
  };

  // Effect to update searchTerm if the URL changes externally
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    setSearchTerm(currentParams.get('name') || ""); // Sync state with URL on initial load
  }, []);

  // Determine if the search button should be disabled
  const isSearchDisabled = !searchTerm.trim();

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
        {searchTerm.trim() && (
          <button
            type="button"
            className="absolute top-[50%] -translate-y-[50%] right-2 size-6 md:size-8 text-primary rounded-full flex items-center justify-center py-1"
            onClick={handleClearSearch}
          >
            <X size={24} />
          </button>
        )}
      </div>
      <button
        className={`bg-primary py-2 px-3 text-white h-9 md:h-11 w-14 text-lg flex items-center justify-center gap-2 ${
          isSearchDisabled ? 'opacity-80' : 'opacity-100'
        }`}
        type="submit"
        disabled={isSearchDisabled}
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default Searchbar;
