// @ts-nocheck
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useGetCategoriesV2Query } from "@/hooks/UseCategories";
import { useGetAllAttributesQuery } from "@/hooks/UseAttributes";
import { useAddProductMutation } from "@/hooks/UseProducts";
import { X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast"
import Success from "@/components/misc/Success";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import withAuth from "@/components/hoc/withAuth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { data: categories, isErrorCategories, isLoadingCategories } = useGetCategoriesV2Query();
  const { data: attributesData, isErrorAttributes, isLoadingAttributes } = useGetAllAttributesQuery();
  const [addProduct, { isSuccess, error, data: responseData, isLoading }] = useAddProductMutation();
  const [subCategories, setSubCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);

console.log(categories)

  const handleModalClose = () => {
    if (responseData?.data?.product?.id) {
      router.push(`/details/${responseData.data.product.id}`);
    }
    setShowSuccessModal(false);
  };

  useEffect(() => {
    if (isLoading) {
      toast({
        title: "Item listing in progress",
        description: "Please wait while we are listing your item",
        duration: 2000,
      });
    } else if (isSuccess) {
      if (responseData?.success) {
        setShowSuccessModal(true);
      } else {
        toast({
          title: "Failed",
          description: responseData?.message || "Failed to add product",
          duration: 2000,
        });
      }
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to add product",
        duration: 2000,
      });
    }
  }, [isSuccess, isLoading, error, responseData, toast]);

  const [variants, setVariants] = useState([]);
  const [showVariants, setShowVariants] = useState(false);
  const [attributes, setAttributes] = useState([{ attribute: "", attributeName: "", attributeValues: [] }]);

  const generateVariants = () => {
    const newVariants = [];

    // Generate variants only if all attributes have been selected
    if (attributes.every((attr) => attr.attribute && attr.attributeValues.length > 0)) {
      // Generate combinations of attribute values
      const attributeValueCombinations = cartesian(attributes.map((attr) => attr.attributeValues));

      // Generate SKU for each variant
      attributeValueCombinations.forEach((combination) => {
        const sku = `${productDetails.name}-${combination.map((value) => value.name).join('-')}`;
        newVariants.push({
          sku: sku,
          quantity: 1,
          price: "",
          attributes: attributes.map((attr, index) => ({
            AttributeId: attr.attribute,
            AttributeValueId: attr.attributeValues[index]?.id,
          })),
        });
      });
    }

    setVariants(newVariants);
  };

  // Function to handle changes in variant price
  const handleVariantPriceChange = (index, price) => {
    const updatedVariants = [...variants];
    updatedVariants[index].price = price;
    setVariants(updatedVariants);
  };

  // Function to handle changes in variant stock quantity
  const handleVariantStockChange = (index, stockQuantity) => {
    const updatedVariants = [...variants];
    updatedVariants[index].stockQuantity = stockQuantity;
    setVariants(updatedVariants);
  };

  // Function to handle deletion of variant
  const handleDeleteVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  // Helper function to generate combinations of attribute values
  const cartesian = (arrays) => {
    return arrays.reduce((acc, curr) => {
      return acc.flatMap((x) => curr.map((y) => x.concat(y)));
    }, [[]]);
  };

  const [isAttrTable, setIsAttrTable] = useState(false)
  const toggleAttrtable = () => {
    setIsAttrTable(!isAttrTable);
  }
  useEffect(() => {
    generateVariants();
    setIsAttrTable(false)
  }, [attributes]);


  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const remainingSlots = 6 - images.length;

    if (files.length > remainingSlots) {
      toast({
        variant: "destructive",
        description: `You can upload a maximum of ${remainingSlots} more images`,
        duration: 2000,
      });
      return;
    }
    const newImages = files.map((file) => ({
      src: URL.createObjectURL(file),
      file,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handlePlaceholderClick = () => {
    if (images.length >= 6) {
      toast({
        variant: "destructive",
        description: "Maximum limit reached",
      });
    } else {
      fileInputRef.current.click();
    }
  };


  const handleAddAttribute = () => {
    setAttributes((prevAttributes) => [
      ...prevAttributes,
      { attribute: "", attributeName: "", attributeValues: [] }
    ]);
  };

  const handleRemoveAttribute = (index) => {
    if (attributes.length > 1) {
      setAttributes((prevAttributes) => prevAttributes.filter((_, idx) => idx !== index));
    }
  };

  const handleAttributeChange = (index, key, value, name) => {
    setAttributes((prevAttributes) =>
      prevAttributes.map((attrib, idx) =>
        idx === index ? { ...attrib, [key]: value, [`${key}Name`]: name } : attrib
      )
    );
  };

  const handleAddAttributeValue = (index, valueId, valueName) => {
    setAttributes((prevAttributes) =>
      prevAttributes.map((attrib, idx) =>
        idx === index
          ? { ...attrib, attributeValues: [...attrib.attributeValues, { id: valueId, name: valueName }] }
          : attrib
      )
    );
  };

  const handleRemoveAttributeValue = (index, valueIndex) => {
    setAttributes((prevAttributes) =>
      prevAttributes.map((attrib, idx) =>
        idx === index
          ? { ...attrib, attributeValues: attrib.attributeValues.filter((_, i) => i !== valueIndex) }
          : attrib
      )
    );
  };



  const getAttributeValues = (attributeId) => {
    if (!attributesData || !attributesData.data) {
      console.warn('attributesData is not available or empty');
      return [];
    }

    const attribute = attributesData.data.find((attr) => attr.id === attributeId);
    return attribute ? attribute.Attribute_Values : [];
  };

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle category selection
  const handleCategoryChange = (value) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      categoryId: value,
      subCategoryId: "", // Reset subcategory when category changes
      categoryTypeId: "", // Reset category type when category changes
    }));

    // Here you would typically fetch subcategories based on the selected category
    // For now, using mock data - replace this with your actual API call
    setSubCategories(categories?.data.find(cat => cat.id === value)?.subCategory || []);
    setCategoryTypes([]); // Reset category types
  };

  // Handle subcategory selection
  const handleSubCategoryChange = (value) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      subCategoryId: value,
      categoryTypeId: "", // Reset category type when subcategory changes
    }));

    // Here you would typically fetch category types based on the selected subcategory
    // For now, using mock data - replace this with your actual API call
    setCategoryTypes(subCategories.find(subcat => subcat.id === value)?.categoryType|| []);
  };

  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    longDescription: "",
    basePrice: "",
    baseQuantity: "",
    city: "",
    condition: "",
    claim: false,
    categoryId: "",
    subCategoryId: "",
    categoryTypeId: "",
    regularPrice: "",
    stockQuantity: "1",
    variants: [{
    }],
  });


  const validateForm = () => {
    const requiredFields = [
      "name",
      "description",
      "longDescription",
      "basePrice",
      "baseQuantity",
      // "city",
      // "condition",
      "categoryId",
    ];

    for (const field of requiredFields) {
      if (!productDetails[field]) {
        toast({
          variant: "destructive",
          description: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
        });
        return false;
      }
    }

    if (productDetails.description.length < 30 || productDetails.description.length > 200) {
      toast({
        variant: "destructive",
        description: "Description must be between 30 and 200 characters",
      });
      return false;
    }

    if (productDetails.longDescription.length < 80 || productDetails.longDescription.length > 800) {
      toast({
        variant: "destructive",
        description: "Long description must be between 80 and 800 characters",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("description", productDetails.description);
    formData.append("longDescription", productDetails.longDescription);
    formData.append("basePrice", productDetails.basePrice);
    formData.append("baseQuantity", productDetails.baseQuantity);
    formData.append("city", "Lahore");
    formData.append("condition", "New");
    formData.append("CategoryId", productDetails.categoryTypeId);
    formData.append("claim", productDetails.claim);
    for (let i = 0; i < images.length; i++) {

      formData.append("images", images[i].file)
    }
    console.log(productDetails)
    if (showVariants) {
      // Update the variants object based on the attributes
      // const newVariants = generateVariants(attributes);
      formData.append("variants", JSON.stringify(variants));
    }

    // for (let [key, value] of formData.entries()) {
    //   console.log("formData :")
    //   console.log(key, value);
    // }
    addProduct(formData)

  };

  const handleContinueAdding = () => {
    setProductDetails({
      name: "",
      description: "",
      longDescription: "",
      basePrice: "",
      baseQuantity: "",
      city: "",
      condition: "",
      claim: false,
      categoryId: "",
      regularPrice: "",
      stockQuantity: "",
      variants: [{
      }],
    });
    setAttributes([{ attribute: "", attributeName: "", attributeValue: "", attributeValueName: "" }]);
    setImages([]);
    setShowSuccessModal(false);
  };

  if (isLoadingAttributes) {
    return <div>Loading attributes...</div>;
  }

  if (isErrorAttributes) {
    return <div>Error loading attributes.</div>;
  }

  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary cursor-pointer">
          Add New Product</h3>
        <p className="text-gray-600 mt-2">Fill in the details to list your product</p>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <form className="w-full lg:w-2/3 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm">Product Name</label>
                <input
                  name="name"
                  value={productDetails.name}
                  onChange={handleInputChange}
                  className="w-full py-2 rounded-sm px-2 mt-2 border border-solid-black"
                  type="text"
                  placeholder="Type name here"
                />
              </div>
              <div>
                <label className="text-sm">Description</label>
                <textarea
                  name="description"
                  value={productDetails.description}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={200}
                  minLength={30}
                  className="w-full py-2 rounded-sm px-2 mt-2 border border-solid-black"
                  placeholder="Type description here (30-200 characters)"
                />
                <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                  {productDetails.description.length}/200
                </span>
              </div>
              <div >
                <label className="text-sm">Long Description</label>
                <textarea
                  name="longDescription"
                  value={productDetails.longDescription}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={600}
                  minLength={80}
                  className="w-full py-2 rounded-sm px-2 mt-2 border border-solid-black"
                  placeholder="Type long description here (80-600 characters)"
                />
                <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                  {productDetails.longDescription.length}/600
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Category Details</h2>
            <div className="mb-4 outline-none">
              <label className="text-sm font-semibold">Category</label>
              <Select
                value={productDetails.categoryId}
                onValueChange={handleCategoryChange}
                className="w-full mt-2 rounded-sm focus:outline-none focus:ring focus:ring-primary"
              >
                <SelectTrigger className="w-full h-10 px-3 flex items-center justify-between cursor-pointer rounded-sm">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-sm shadow-lg">
                  {isLoadingCategories ? (
                    <SelectItem disabled>Loading...</SelectItem>
                  ) : isErrorCategories ? (
                    <SelectItem disabled>Error loading categories</SelectItem>
                  ) : (
                    categories?.data.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row mb-4 gap-3">
              <div className="outline-none w-full sm:w-1/2">
                <label className="text-sm font-semibold">Sub Category</label>
                <Select
                  value={productDetails.subCategoryId}
                  onValueChange={handleSubCategoryChange}
                  disabled={!productDetails.categoryId}
                  className="w-full mt-2 rounded-sm focus:outline-none focus:ring focus:ring-primary"
                >
                  <SelectTrigger className="w-full h-10 px-3 flex items-center justify-between cursor-pointer rounded-sm">
                    <SelectValue placeholder="Select Sub Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-sm shadow-lg">
                    {subCategories.map((subCategory) => (
                      <SelectItem key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="outline-none w-full sm:w-1/2">
                <label className="text-sm font-semibold">Category Type</label>
                <Select
                  value={productDetails.categoryTypeId}
                  onValueChange={(value) =>
                    setProductDetails((prev) => ({ ...prev, categoryTypeId: value }))
                  }
                  disabled={!productDetails.subCategoryId}
                  className="w-full mt-2 rounded-sm focus:outline-none focus:ring focus:ring-primary"
                >
                  <SelectTrigger className="w-full h-10 px-3 flex items-center justify-between cursor-pointer rounded-sm">
                    <SelectValue placeholder="Select Category Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-sm shadow-lg">
                    {categoryTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Add Product Variants</h2>
            <div className="w-full">
              <div className="w-full py-2 rounded-sm px-2 mt-2 border border-solid-black flex justify-between items-center">
                {/* <input
                type="button"
                checked={showVariants}
                onChange={() => setShowVariants(!showVariants)}
                className="w-full py-2 rounded-sm px-2 mt-2 border border-solid-black"
              /> */}
                <h3>Variants</h3>
                <button
                  onClick={() => setShowVariants(!showVariants)}
                  className="text-sm bg-primary text-white px-4 py-2 rounded-sm"
                >Add Variants</button>
              </div>

              {showVariants && (
                <div className="mb-4">
                  <h4 className="text-lg font-bold mb-2">Attributes</h4>
                  {attributes.map((attr, index) => (
                    <div key={index} className="mb-4  p-2 rounded-sm">
                      <div className="flex justify-between items-center border border-solid-black">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="w-full h-10 rounded-sm mt-2  px-3 py-2 flex items-center  justify-between cursor-pointer">
                              <div>
                                {attr.attributeName || "Select Attribute"}
                              </div>
                              <span>&#x25BC;</span>
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {attributesData?.data.map((attribute) => (
                              <DropdownMenuItem
                                key={attribute.id}
                                onClick={() =>
                                  handleAttributeChange(index, "attribute", attribute.id, attribute.name)
                                }
                                disabled={attributes.find(attr => attr.attribute === attribute.id)}
                                style={{ color: attributes.find(attr => attr.attribute === attribute.id) ? 'red' : 'inherit' }}
                              >
                                {attribute.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>

                        </DropdownMenu>
                        {index > 0 && <button
                          type="button"
                          className="ml-2 text-destructive"
                          onClick={() => handleRemoveAttribute(index)}
                        >
                          <X size={20} />
                        </button>}
                      </div>

                      {attr.attribute && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="w-full h-10 rounded-sm mt-2  px-3 py-2 flex items-center justify-between cursor-pointer">
                              <div>
                                Select Attribute Values
                              </div>
                              <span>&#x25BC;</span>
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {getAttributeValues(attr.attribute).map((value) => (
                              <DropdownMenuItem
                                key={value.id}
                                onClick={() =>
                                  handleAddAttributeValue(index, value.id, value.value)
                                }
                                disabled={attributes[index].attributeValues.find(attrValue => attrValue.id === value.id)}
                                style={{ color: attributes[index].attributeValues.find(attrValue => attrValue.id === value.id) ? 'red' : 'inherit' }}
                              >
                                {value.value}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>

                        </DropdownMenu>
                      )}

                      <div className="flex flex-wrap mt-2">
                        {attr.attributeValues?.map((value, valueIndex) => (
                          <div
                            key={valueIndex}
                            className="bg-black text-gray-200 rounded-full px-4 py-2 mr-2 mb-2 flex items-center"
                          >
                            <span className="mr-1">{value.name}</span>
                            <button
                              type="button"
                              className="text-white font-bold"
                              onClick={() => handleRemoveAttributeValue(index, valueIndex)}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="my-4 px-4 py-2 rounded-sm text-sm bg-primary text-white transition duration-200"
                    onClick={handleAddAttribute}
                  >
                    Add Attribute
                  </button>
                  <hr />
                  <button
                    type="button"
                    className="mt-2 px-4 py-2 rounded-sm text-sm bg-primary text-white transition duration-200"
                    onClick={toggleAttrtable}
                  >
                    Generate Variants
                  </button>
                </div>
              )}
            </div>

            {showVariants && isAttrTable && (
              <div>
                <h4 className="text-lg font-bold mb-2">Variants</h4>
                <Table>
                  <TableCaption>A list of variants</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Sr</TableHead>
                      <TableHead className="w-[100px]">SKU</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock Quantity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {variants.map((variant, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{variant.sku}</TableCell>
                        <TableCell>
                          <input
                            type="text"
                            value={variant.price}
                            onChange={(e) => handleVariantPriceChange(index, e.target.value)}
                            placeholder="Price"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            value={variant.stockQuantity}
                            onChange={(e) => handleVariantStockChange(index, e.target.value)}
                            placeholder="Stock Quantity"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <button onClick={() => handleDeleteVariant(index)}>Delete</button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

        </form>

        <div className="w-full lg:w-1/3 lg:ml-10 mt-5 lg:mt-0">
          <div className="mb-4">
            <div
              className="w-full h-[264px] overflow-hidden rounded-sm mt-2 flex flex-wrap gap-2 items-center border border-solid-black justify-center cursor-pointer"
              onClick={handlePlaceholderClick}
            >
              {images.length === 0 ? (
                <span className="text-gray-500">Click to upload</span>
              ) : (
                <div className="relative w-72 h-64">
                  <Image
                    src={images[0].src}
                    alt="Uploaded"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap mt-2 gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-24 rounded-sm flex items-center  justify-center ${index === 0 ? "border-blue-500" : ""
                    }`}
                >
                  <Image
                    src={image.src}
                    alt={`Uploaded ${index}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-sm border-solid-black border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 mt-1 mr-1 bg-white text-destructive rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <div
                className="w-24 h-24 rounded-sm flex mb-4 items-center justify-center cursor-pointer border border-solid-black"
                onClick={handlePlaceholderClick}
              >
                <span className="text-gray-500">+</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden border border-solid-black"
                />
              </div>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Pricing & Stock</h2>
            <div className="space-y-4">
              <div className="w-full">
                <label className="text-sm">Price</label>
                <input
                  name="basePrice"
                  value={productDetails.basePrice}
                  onChange={handleInputChange}
                  className=" w-full h-10 rounded-sm px-2 mt-2 border border-solid-black"
                  type="number"
                  placeholder="Enter price"
                  min="0"
                />
              </div>
              <div className="w-full ">
                <label className="text-sm">Quantity</label>
                <input
                  name="baseQuantity"
                  value={productDetails.baseQuantity}
                  onChange={handleInputChange}
                  className="  base w-full h-10 rounded-sm px-2 mt-2 border border-solid-black"
                  type="number"
                  placeholder="Enter quantity"
                  min="0"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center mt-3 justify-end w-full">
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-2 w-full py-3 rounded-sm text-md  bg-[#F5F5F5] border hover:border-primary hover:bg-primary text-primary hover:text-white transition duration-200"
            >
              {isLoading ? " Adding..." : "Add Product"}
            </button>
          </div>

        </div>

      </div>

      {showSuccessModal && (
        <div className="z-50 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 fixed top-0 left-0">
          <div className="w-[290px] h-[300px] mx-2 sm:mx-0 sm:w-[420px] sm:h-[380px] flex items-center flex-col justify-around rounded-lg bg-secondary px-2 py-3 sm:p-5 shadow-lg">
            <Success />
            <p className="text-sm sm:text-base font-medium py-2 mx-auto w-fit">Your Product has been listed successfully!</p>
            <div className="flex items-center justify-center gap-3">
              <Button className="mx-auto bg-primary text-white" variant={"outline"} onClick={handleModalClose}>View Product
              </Button>
              <Button className="mx-auto" onClick={handleContinueAdding} variant={"outline"}>Continue Adding
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Page);
