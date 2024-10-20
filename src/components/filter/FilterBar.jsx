"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/hooks/UseCategories";
import { useGetAllOffersQuery } from "@/hooks/UseOffers";

const FilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch categories and offers data
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const { data: offers, isLoading: isLoadingOffers } = useGetAllOffersQuery();

  // Initialize filter states from search parameters
  const initialParams = {
    condition: searchParams.get("condition") || "",
    city: searchParams.get("city") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    claim: searchParams.get("claim") === "true",
    categoryId: searchParams.get("categoryId") || "",
    offerId: searchParams.get("offerId") || "",
  };

  const [selectedParams, setSelectedParams] = useState(initialParams);

  // Update URL with filter changes
  const updateURL = (key, value) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (value !== "") {
      currentParams.set(key, value.toString());
    } else {
      currentParams.delete(key);
    }
    router.push(`?${currentParams.toString()}`);
  };

  // Save specific filter
  const handleSaveFilter = (key) => {
    updateURL(key, selectedParams[key]);
  };

  // Reset specific filter
  const handleResetFilter = (key) => {
    setSelectedParams((prev) => ({
      ...prev,
      [key]: "",
    }));
    updateURL(key, "");
  };

  return (
    <div className="w-full md:w-[260px] px-3 py-2 bg-white h-full overflow-y-scroll border border-primary">
      <h1 className="text-xl font-bold mb-4">Filters</h1>

      {/* Categories Section */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-lg font-medium mb-3">All Categories</h1>
        {isLoadingCategories ? (
          <div className="w-full space-y-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="w-full h-7 rounded-md mb-3" />
            ))}
          </div>
        ) : (
          <div>
            {categories?.data?.map((category) => (
              <div className="flex gap-2 items-center mb-2" key={category.id}>
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedParams.categoryId === category.id}
                  onChange={(e) =>
                    setSelectedParams({ ...selectedParams, categoryId: e.target.value })
                  }
                  className="accent-primary"
                />
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2 mt-2">
          <button
            className="text-xs text-primary underline"
            onClick={() => handleResetFilter("categoryId")}
          >
            Clear
          </button>
          <button
            className="text-xs text-primary underline"
            onClick={() => handleSaveFilter("categoryId")}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Offers Section */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-lg font-medium mb-3">Offers</h1>
        {isLoadingOffers ? (
          <div className="w-full space-y-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="w-full h-7 rounded-md mb-3" />
            ))}
          </div>
        ) : (
          <div>
            {offers?.data?.map((offer) => (
              <div className="flex gap-2 items-center mb-2" key={offer.id}>
                <input
                  type="radio"
                  name="offer"
                  value={offer.id}
                  checked={selectedParams.offerId === offer.id}
                  onChange={(e) =>
                    setSelectedParams({ ...selectedParams, offerId: e.target.value })
                  }
                  className="accent-primary"
                />
                <p>{offer.offerName}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2 mt-2">
          <button
            className="text-xs text-primary underline"
            onClick={() => handleResetFilter("offerId")}
          >
            Clear
          </button>
          <button
            className="text-xs text-primary underline"
            onClick={() => handleSaveFilter("offerId")}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Condition Section */}
      <div className="py-4 border-b">
        <h1 className="text-lg font-medium mb-3">Condition</h1>
        <div className="flex gap-2 items-center mb-2">
          <input
            type="radio"
            name="condition"
            value="New"
            checked={selectedParams.condition === "New"}
            onChange={(e) => setSelectedParams({ ...selectedParams, condition: e.target.value })}
            className="accent-primary"
          />
          <p>New</p>
        </div>
        <div className="flex gap-2 items-center mb-2">
          <input
            type="radio"
            name="condition"
            value="Used"
            checked={selectedParams.condition === "Used"}
            onChange={(e) => setSelectedParams({ ...selectedParams, condition: e.target.value })}
            className="accent-primary"
          />
          <p>Used</p>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className="text-xs text-primary underline"
            onClick={() => handleResetFilter("condition")}
          >
            Clear
          </button>
          <button
            className="text-xs text-primary underline"
            onClick={() => handleSaveFilter("condition")}
          >
            Apply
          </button>
        </div>
      </div>

      {/* City Section */}
      <div className="py-4 border-b">
        <h1 className="text-lg font-medium mb-3">City</h1>
        <input
          type="text"
          value={selectedParams.city}
          onChange={(e) => setSelectedParams({ ...selectedParams, city: e.target.value })}
          className="border rounded px-2 py-1 w-full"
          placeholder="Enter city"
        />
        <div className="flex gap-2 mt-2">
          <button
            className="text-xs text-primary underline"
            onClick={() => handleResetFilter("city")}
          >
            Clear
          </button>
          <button
            className="text-xs text-primary underline"
            onClick={() => handleSaveFilter("city")}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Price Filter Section */}
      <div className="py-4 border-b">
        <h1 className="text-lg font-medium mb-3">Price</h1>
        <div className="flex flex-col gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={selectedParams.minPrice}
            onChange={(e) => setSelectedParams({ ...selectedParams, minPrice: e.target.value })}
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={selectedParams.maxPrice}
            onChange={(e) => setSelectedParams({ ...selectedParams, maxPrice: e.target.value })}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className="text-xs text-primary underline"
            onClick={() => handleResetFilter("minPrice")}
          >
            Clear Min
          </button>
          <button
            className="text-xs text-primary underline"
            onClick={() => handleResetFilter("maxPrice")}
          >
            Clear Max
          </button>
          <button
            className="text-xs text-primary underline"
            onClick={() => handleSaveFilter("minPrice")}
          >
            Apply
          </button>
          <button
            className="text-xs text-primary underline"
            onClick={() => handleSaveFilter("maxPrice")}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Claim Checkbox */}
      <div className="py-4 border-b">
        <h1 className="text-lg font-medium mb-3">Claim</h1>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={selectedParams.claim}
            onChange={(e) => setSelectedParams({ ...selectedParams, claim: e.target.checked })}
            className="accent-primary"
          />
          <p>Claimable Products</p>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className="text-xs text-primary underline"
            onClick={() => handleResetFilter("claim")}
          >
            Clear
          </button>
          <button
            className="text-xs text-primary underline"
            onClick={() => handleSaveFilter("claim")}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
