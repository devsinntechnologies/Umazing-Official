// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/hooks/UseCategories";
import { useGetAllOffersQuery } from "@/hooks/UseOffers";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { CURRENCY } from "@/lib/constants";


const FilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch categories and offers data
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery({});
  const { data: offers, isLoading: isLoadingOffers } = useGetAllOffersQuery({});

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
  const [minPrice, setMinPrice] = useState(
    initialParams.minPrice ? parseInt(initialParams.minPrice) : 0
  );
  const [maxPrice, setMaxPrice] = useState(
    initialParams.maxPrice ? parseInt(initialParams.maxPrice) : 0
  );

  const conditionData = ["New", "Used"];
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

  const handleSelect = (key, value) => {
    setSelectedParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePriceChange = () => {
    const currentParams = new URLSearchParams(window.location.search);

    if (minPrice && maxPrice) {
      currentParams.set("minPrice", minPrice);
      currentParams.set("maxPrice", maxPrice);
    } else {
      currentParams.delete("minPrice");
      currentParams.delete("maxPrice");
    }

    router.push(`?${currentParams.toString()}`);
  };

  const clearPriceFilters = () => {
    setMinPrice(0);
    setMaxPrice(0);

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete("minPrice");
    currentParams.delete("maxPrice");

    router.push(`?${currentParams.toString()}`);
  };
  const handleResetFilters = () => {
    // Reset selected parameters to their initial values
    setSelectedParams({
      categoryId: "",
      city: "",
      claim: false,
      minPrice: 0,
      maxPrice: 0,
      condition: "", // Added condition reset
      offerId: "",   // Added offerId reset
    });

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete("categoryId");
    currentParams.delete("city");
    currentParams.delete("claim");
    currentParams.delete("minPrice");
    currentParams.delete("maxPrice");
    currentParams.delete("condition"); // Added condition deletion
    currentParams.delete("offerId");    // Added offerId deletion

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div>
      <div className="hidden md:block w-full md:w-[260px] px-3 py-2 rounded-lg bg-white max-h-full h-fit overflow-y-scroll border border-primary">
        <h1 className="text-xl font-bold ">Filters</h1>
        <Button onClick={handleResetFilters}> Reset All </Button>
        {/* Categories Section */}
        <div className="border-b pb-2 ">
          {/* <h1 className="text-lg font-medium ">All Categories</h1> */}
          {isLoadingCategories ? (
            <div className="w-full space-y-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="w-full h-7 rounded-md " />
              ))}
            </div>
          ) : (
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium ">
                    {selectedParams.categoryId
                      ? categories?.data?.find(
                        (category) => category.id === selectedParams.categoryId
                      )?.name || "All Categories"
                      : "All Categories"}
                  </AccordionTrigger>
                  <AccordionContent>
                    {categories?.data?.map((category) => (
                      <div
                        className={`flex gap-2 items-center  cursor-pointer p-2 rounded-md ${selectedParams.categoryId === category.id
                          ? "bg-primary text-white"
                          : ""
                          }`}
                        key={category.id}
                        onClick={() => handleSelect("categoryId", category.id)}
                      >
                        <p>{category.name}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* {categories?.data?.map((category) => (
                <div
                  className={`flex gap-2 items-center  cursor-pointer p-2 rounded-md ${
                    selectedParams.categoryId === category.id
                      ? "bg-primary text-white"
                      : ""
                  }`}
                  key={category.id}
                  onClick={() => handleSelect("categoryId", category.id)}
                >
                  <p>{category.name}</p>
                </div>
              ))} */}
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
        <div className="border-b pb-2">
          {/* <h1 className="text-lg font-medium ">Offers</h1> */}
          {isLoadingOffers ? (
            <div className="w-full space-y-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="w-full h-7 rounded-md " />
              ))}
            </div>
          ) : (
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium ">
                    Offers
                  </AccordionTrigger>
                  <AccordionContent>
                    {offers?.data?.map((offer) => (
                      <div
                        className={`flex gap-2 items-center  cursor-pointer p-2 rounded-md ${selectedParams.offerId === offer.id
                          ? "bg-primary text-white"
                          : ""
                          }`}
                        key={offer.id}
                        onClick={() => handleSelect("offerId", offer.id)}
                      >
                        <p>{offer.offerName}</p>
                      </div>
                    ))}{" "}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* {offers?.data?.map((offer) => (
                <div
                  className={`flex gap-2 items-center  cursor-pointer p-2 rounded-md ${
                    selectedParams.offerId === offer.id
                      ? "bg-primary text-white"
                      : ""
                  }`}
                  key={offer.id}
                  onClick={() => handleSelect("offerId", offer.id)}
                >
                  <p>{offer.offerName}</p>
                </div>
              ))} */}
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
        <div className="py-2 border-b">
          {/* <h1 className="text-lg font-medium ">Condition</h1> */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium ">
                Condition
              </AccordionTrigger>
              <AccordionContent>
                {conditionData.map((condition) => (
                  <div
                    className={`flex gap-2 items-center  cursor-pointer p-2 rounded-md ${selectedParams.condition === condition
                      ? "bg-primary text-white"
                      : ""
                      }`}
                    key={condition}
                    onClick={() => handleSelect("condition", condition)}
                  >
                    <p>{condition}</p>
                  </div>
                ))}{" "}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
        <div className="py-2 border-b">
          {/* <h1 className="text-lg font-medium ">City</h1> */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium ">
                City
              </AccordionTrigger>
              <AccordionContent>
                <input
                  type="text"
                  value={selectedParams.city}
                  onChange={(e) => handleSelect("city", e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  placeholder="Enter city"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
        <div className="py-2 border-b">
          {/* <h1 className="text-lg font-medium ">Price</h1> */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium ">
                Price
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-row gap-x-2 items-center">
                  <div className="flex items-center border border-gray-300 px-3 py-2 rounded gap-2">
                    <span>{CURRENCY} </span>
                    <input
                      type="number"
                      min={0}
                      max={999999}
                      value={minPrice}
                      placeholder="Min"
                      className="w-full border-none outline-none"
                      onChange={(e) => {
                        const newMinPrice = Math.min(parseInt(e.target.value) || 0, 999999);
                        setMinPrice(newMinPrice.toString().replace(/^0+(?=\d)/, ''));
                        setMaxPrice(Math.max(maxPrice, newMinPrice + 1)); // Ensure maxPrice is higher than minPrice
                      }}
                    />
                  </div>
                  <div className="flex items-center border border-gray-300 px-3 py-2 rounded gap-2">
                    <span>{CURRENCY} </span>
                    <input
                      type="number"
                      min={minPrice + 1}
                      max={999999}
                      value={maxPrice}
                      placeholder="Max"
                      className="w-full border-none outline-none"
                      onChange={(e) => {
                        const newMaxPrice = Math.min(parseInt(e.target.value) || minPrice + 1, 999999);
                        setMaxPrice(newMaxPrice.toString().replace(/^0+(?=\d)/, ''));
                      }}
                    />
                  </div>
                </div>{" "}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* <div className="flex flex-row gap-x-2 items-center">
            <div className="flex items-center border border-gray-300 px-3 py-2 rounded gap-2">
              <span>{CURRENCY} </span>
              <input
                type="number"
                min={0}
                value={minPrice}
                placeholder="Min"
                className="w-full border-none outline-none"
                onChange={(e) => {
                  const newMinPrice = parseInt(e.target.value) || 0;
                  setMinPrice(newMinPrice);
                  setMaxPrice(Math.max(maxPrice, newMinPrice + 1)); // Ensure maxPrice is higher than minPrice
                }}
              />
            </div>
            <div className="flex items-center border border-gray-300 px-3 py-2 rounded gap-2">
              <span>{CURRENCY} </span>
              <input
                type="number"
                min={minPrice + 1}
                value={maxPrice}
                placeholder="Max"
                className="w-full border-none outline-none"
                onChange={(e) => {
                  const newMaxPrice = parseInt(e.target.value) || minPrice + 1;
                  setMaxPrice(newMaxPrice);
                }}
              />
            </div>
          </div> */}
          <div className="flex gap-2 mt-2">
            <button
              className="text-xs text-primary underline"
              onClick={clearPriceFilters}
            >
              Clear
            </button>
            <button
              className="text-xs text-primary underline"
              onClick={handlePriceChange}
            >
              Apply
            </button>
          </div>
        </div>

        {/* Claim Checkbox */}
        <div className="py-2 border-b">
          {/* <h1 className="text-lg font-medium ">Claim</h1> */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium ">
                Claim
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={selectedParams.claim}
                    onChange={(e) =>
                      setSelectedParams({
                        ...selectedParams,
                        claim: e.target.checked,
                      })
                    }
                    className="accent-primary"
                  />
                  <p>Claimable Products</p>
                </div>{" "}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={selectedParams.claim}
              onChange={(e) =>
                setSelectedParams({
                  ...selectedParams,
                  claim: e.target.checked,
                })
              }
              className="accent-primary"
            />
            <p>Claimable Products</p>
          </div> */}
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
      {/* Sheet */}
      <Sheet>
        <SheetTrigger className="md:hidden flex items-center gap-2 bg-primary text-white w-fit px-3 py-1.5 rounded-full text-sm ">
          <Filter size={14} /> Filter
        </SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle>Filter</SheetTitle>
          </SheetHeader>
          <div className="w-full h-[300px] px-3 py-2 rounded-lg bg-white overflow-y-scroll md:hidden grid grid-cols-1">
            {/* Categories Section */}
            <div className="border-b pb-2 ">
              {/* <h1 className="text-lg font-medium ">All Categories</h1> */}
              {isLoadingCategories ? (
                <div className="w-full flex items-center gap-3">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton key={idx} className="w-10 h-4 rounded-md" />
                  ))}
                </div>
              ) : (
                <div className="w-full overflow-x-scroll">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-lg font-medium ">
                        {selectedParams.categoryId
                          ? categories?.data?.find(
                            (category) => category.id === selectedParams.categoryId
                          )?.name || "All Categories"
                          : "All Categories"}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          className={`grid grid-cols-${categories?.data?.length} gap-3`}
                        >
                          {categories?.data?.map((category) => (
                            <div
                              className={`w-full cursor-pointer px-3 py-2 rounded-full ${selectedParams.categoryId === category.id
                                ? "bg-primary text-white"
                                : ""
                                }`}
                              key={category.id}
                              onClick={() =>
                                handleSelect("categoryId", category.id)
                              }
                            >
                              {category.name}
                            </div>
                          ))}
                        </div>{" "}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* <div
                    className={`grid grid-cols-${categories?.data?.length} gap-3`}
                  >
                    {categories?.data?.map((category) => (
                      <div
                        className={`w-full cursor-pointer px-3 py-2 rounded-full ${
                          selectedParams.categoryId === category.id
                            ? "bg-primary text-white"
                            : ""
                        }`}
                        key={category.id}
                        onClick={() => handleSelect("categoryId", category.id)}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div> */}
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
            <div className="border-b pb-2 ">
              {/* <h1 className="text-lg font-medium ">Offers</h1> */}
              {isLoadingOffers ? (
                <div className="w-full space-y-2">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton
                      key={idx}
                      className="w-full h-7 rounded-md "
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-lg font-medium ">
                        Offers
                      </AccordionTrigger>
                      <AccordionContent>
                        {offers?.data?.map((offer) => (
                          <div
                            className={`flex gap-2 items-center  cursor-pointer p-2 rounded-md ${selectedParams.offerId === offer.id
                              ? "bg-primary text-white"
                              : ""
                              }`}
                            key={offer.id}
                            onClick={() => handleSelect("offerId", offer.id)}
                          >
                            <p>{offer.offerName}</p>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* {offers?.data?.map((offer) => (
                    <div
                      className={`flex gap-2 items-center  cursor-pointer p-2 rounded-md ${
                        selectedParams.offerId === offer.id
                          ? "bg-primary text-white"
                          : ""
                      }`}
                      key={offer.id}
                      onClick={() => handleSelect("offerId", offer.id)}
                    >
                      <p>{offer.offerName}</p>
                    </div>
                  ))} */}
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
            <div className="py-2 border-b">
              {/* <h1 className="text-lg font-medium ">Condition</h1> */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium ">
                    Condition
                  </AccordionTrigger>
                  <AccordionContent>
                    {conditionData.map((condition) => (
                      <div
                        className={`flex gap-2 items-center  cursor-pointer p-2 rounded-md ${selectedParams.condition === condition
                          ? "bg-primary text-white"
                          : ""
                          }`}
                        key={condition}
                        onClick={() => handleSelect("condition", condition)}
                      >
                        <p>{condition}</p>
                      </div>
                    ))}{" "}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* {conditionData.map((condition) => (
                <div
                  className={`flex gap-2 items-center  cursor-pointer p-2 rounded-md ${
                    selectedParams.condition === condition
                      ? "bg-primary text-white"
                      : ""
                  }`}
                  key={condition}
                  onClick={() => handleSelect("condition", condition)}
                >
                  <p>{condition}</p>
                </div>
              ))} */}
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
            <div className="py-2 border-b">
              {/* <h1 className="text-lg font-medium ">City</h1> */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium ">
                    City
                  </AccordionTrigger>
                  <AccordionContent>
                    <input
                      type="text"
                      value={selectedParams.city}
                      onChange={(e) => handleSelect("city", e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                      placeholder="Enter city"
                    />{" "}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* <input
                type="text"
                value={selectedParams.city}
                onChange={(e) => handleSelect("city", e.target.value)}
                className="border rounded px-2 py-1 w-full"
                placeholder="Enter city"
              /> */}
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
            <div className="py-2 border-b">
              {/* <h1 className="text-lg font-medium ">Price</h1> */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium ">
                    Price
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-row gap-x-2 items-center">
                      <div className="flex items-center border border-gray-300 px-3 py-2 rounded gap-2">
                        <span>{CURRENCY} </span>
                        <input
                          type="number"
                          min={0}
                          max={999999}
                          value={minPrice}
                          placeholder="Min"
                          className="w-full border-none outline-none"
                          onChange={(e) => {
                            const newMinPrice = Math.min(parseInt(e.target.value) || 0, 999999);
                            setMinPrice(newMinPrice.toString().replace(/^0+(?=\d)/, ''));
                            setMaxPrice(Math.max(maxPrice, newMinPrice + 1)); // Ensure maxPrice is higher than minPrice
                          }}
                        />
                      </div>
                      <div className="flex items-center border border-gray-300 px-3 py-2 rounded gap-2">
                        <span>{CURRENCY} </span>
                        <input
                          type="number"
                          min={minPrice + 1}
                          max={999999}
                          value={maxPrice}
                          placeholder="Max"
                          className="w-full border-none outline-none"
                          onChange={(e) => {
                            const newMaxPrice = Math.min(parseInt(e.target.value) || minPrice + 1, 999999);
                            setMaxPrice(newMaxPrice.toString().replace(/^0+(?=\d)/, ''));
                          }}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* <div className="flex flex-row gap-x-2 items-center">
                <div className="flex items-center border border-gray-300 px-3 py-2 rounded gap-2">
                  <span>{CURRENCY} </span>
                  <input
                    type="number"
                    min={0}
                    value={minPrice}
                    placeholder="Min"
                    className="w-full border-none outline-none"
                    onChange={(e) => {
                      const newMinPrice = parseInt(e.target.value) || 0;
                      setMinPrice(newMinPrice);
                      setMaxPrice(Math.max(maxPrice, newMinPrice + 1)); // Ensure maxPrice is higher than minPrice
                    }}
                  />
                </div>
                <div className="flex items-center border border-gray-300 px-3 py-2 rounded gap-2">
                  <span>{CURRENCY} </span>
                  <input
                    type="number"
                    min={minPrice + 1}
                    value={maxPrice}
                    placeholder="Max"
                    className="w-full border-none outline-none"
                    onChange={(e) => {
                      const newMaxPrice =
                        parseInt(e.target.value) || minPrice + 1;
                      setMaxPrice(newMaxPrice);
                    }}
                  />
                </div>
              </div> */}
              <div className="flex gap-2 mt-2">
                <button
                  className="text-xs text-primary underline"
                  onClick={clearPriceFilters}
                >
                  Clear
                </button>
                <button
                  className="text-xs text-primary underline"
                  onClick={handlePriceChange}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Claim Checkbox */}
            <div className="py-2 border-b">
              {/* <h1 className="text-lg font-medium ">Claim</h1> */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium ">
                    Claim
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked={selectedParams.claim}
                        onChange={(e) =>
                          setSelectedParams({
                            ...selectedParams,
                            claim: e.target.checked,
                          })
                        }
                        className="accent-primary"
                      />
                      <p>Claimable Products</p>
                    </div>{" "}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={selectedParams.claim}
                  onChange={(e) =>
                    setSelectedParams({
                      ...selectedParams,
                      claim: e.target.checked,
                    })
                  }
                  className="accent-primary"
                />
                <p>Claimable Products</p>
              </div> */}
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterBar;
