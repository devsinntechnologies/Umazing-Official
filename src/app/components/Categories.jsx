"use client"; // This makes the component a Client Component

import React, { useEffect, useState } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://97.74.89.204:4000/category/getAllCategories",

          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Await the response and parse it as JSON
        const data = await response.json();

        // Log the full response to check its structure
        console.log("Fetched Data:", data);

        // Check for categories in the data
        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else if (data && data.length) {
          setCategories(data);
        } else {
          setError("Unexpected response format: Expected an array");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message); // Set error message
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      {error && <p>Error: {error}</p>} {/* Display error if exists */}
      <p>Categories List:</p> {/* Add this for debugging */}
      <ul>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={index}>{category.name}</li> // Adjust according to your data structure
          ))
        ) : (
          <li>No categories available</li>
        )}
      </ul>
    </div>
  );
};

export default CategoriesPage;
