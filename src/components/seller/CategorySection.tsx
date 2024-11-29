// "use client";
// import React from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const CategorySection = () => {
//     const { data: categories, isErrorCategories, isLoadingCategories } = useGetCategoriesQuery();
//     const validateForm = () => {
//       const requiredFields = [
//         "name",
//         "description",
//         "longDescription",
//         "basePrice",
//         "baseQuantity",
//         "city",
//         "condition",
//         "categoryId",
//       ];
  
//       for (const field of requiredFields) {
//         if (!productDetails[field]) {
//           toast({
//             variant: "destructive",
//             description: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
//           });
//           return false;
//         }
//       }
//   return (
//     <>
//       {/* Category Selection */}
//       <div className="mb-4 outline-none">
//         <label className="text-sm font-semibold">Category</label>
//         <Select
//           value={productDetails.categoryId}
//           onValueChange={(value) =>
//             setProductDetails((prevDetails) => ({
//               ...prevDetails,
//               categoryId: value,
//             }))
//           }
//           className="w-full mt-2 rounded-sm focus:outline-none focus:ring focus:ring-primary"
//         >
//           <SelectTrigger className="w-full h-10 px-3 flex items-center justify-between cursor-pointer rounded-sm">
//             <SelectValue placeholder="Select Category" />
//           </SelectTrigger>
//           <SelectContent className="bg-white rounded-sm shadow-lg">
//             {isLoadingCategories ? (
//               <SelectItem disabled>Loading...</SelectItem>
//             ) : isErrorCategories ? (
//               <SelectItem disabled>Error loading categories</SelectItem>
//             ) : (
//               categories?.data.map((category) => (
//                 <SelectItem key={category.id} value={category.id}>
//                   {category.name}
//                 </SelectItem>
//               ))
//             )}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Subcategory & Category Type */}
//       <div className="flex flex-col sm:flex-row mb-4 gap-3">
//         {/* Subcategory */}
//         <div className="outline-none w-full sm:w-1/2">
//           <label className="text-sm font-semibold">Sub Category</label>
//           <Select
//             value={productDetails.subCategoryId}
//             onValueChange={(value) =>
//               setProductDetails((prevDetails) => ({
//                 ...prevDetails,
//                 subCategoryId: value,
//               }))
//             }
//             className="w-full mt-2 rounded-sm focus:outline-none focus:ring focus:ring-primary"
//           >
//             <SelectTrigger className="w-full h-10 px-3 flex items-center justify-between cursor-pointer rounded-sm">
//               <SelectValue placeholder="Select Subcategory" />
//             </SelectTrigger>
//             <SelectContent className="bg-white rounded-sm shadow-lg">
//               {isLoadingCategories ? (
//                 <SelectItem disabled>Loading...</SelectItem>
//               ) : isErrorCategories ? (
//                 <SelectItem disabled>Error loading subcategories</SelectItem>
//               ) : (
//                 categories?.data.map((category) => (
//                   <SelectItem key={category.id} value={category.id}>
//                     {category.name}
//                   </SelectItem>
//                 ))
//               )}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Category Type */}
//         <div className="outline-none w-full sm:w-1/2">
//           <label className="text-sm font-semibold">Category Type</label>
//           <Select
//             value={productDetails.categoryTypeId}
//             onValueChange={(value) =>
//               setProductDetails((prevDetails) => ({
//                 ...prevDetails,
//                 categoryTypeId: value,
//               }))
//             }
//             className="w-full mt-2 rounded-sm focus:outline-none focus:ring focus:ring-primary"
//           >
//             <SelectTrigger className="w-full h-10 px-3 flex items-center justify-between cursor-pointer rounded-sm">
//               <SelectValue placeholder="Select Category Type" />
//             </SelectTrigger>
//             <SelectContent className="bg-white rounded-sm shadow-lg">
//               {isLoadingCategories ? (
//                 <SelectItem disabled>Loading...</SelectItem>
//               ) : isErrorCategories ? (
//                 <SelectItem disabled>Error loading category types</SelectItem>
//               ) : (
//                 categories?.data.map((category) => (
//                   <SelectItem key={category.id} value={category.id}>
//                     {category.name}
//                   </SelectItem>
//                 ))
//               )}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CategorySection;
