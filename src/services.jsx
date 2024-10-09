import axios from "axios";

export const ServiceAPI = "http://97.74.89.204:4000";

// Function to handle GET requests
export const GetAPI = async (endpoint) => {
  try {
    const response = await axios.get(`${ServiceAPI}/${endpoint}`);
    return response.data; // Return the full response data
  } catch (error) {
    console.error(`GET request to ${endpoint} failed:`, error);
    throw error; // Rethrow error for handling in the calling component
  }
};

// Function to handle POST requests
export const PostAPI = async (endpoint, payload, headers = {}) => {
  try {
    const response = await axios.post(`${ServiceAPI}/${endpoint}`, payload, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`POST request to ${endpoint} failed:`, error);
    throw error; // Rethrow error for handling in the calling component
  }
};

export const fetchCategories = async () => {
  const response = await GetAPI("category/getAllCategories");
  console.log("API Response:", response); // Log the full response to inspect it
  return response.data;
  // Adjust based on your actual response structure
};
// login API function using PostAPI
export const login = async (data) => {
  return await PostAPI("auth/login", data);
};
// registerUser API function using PostAPI
export const registerUser = async (userData) => {
  return await PostAPI("auth/register", userData);
};

// Fetch data based on 'viewAll' parameter using GetAPI
export const fetchShopData = async () => {
  return await GetAPI("product/allProducts?pageNo=1&pageSize=200"); // Makes the GET request using the GetAPI function
};

// Fetch product by ID using GetAPI
export const fetchProductById = async (id) => {
  return await GetAPI(`product/getById/${id}`);
};

// Function to fetch wishlist
export const fetchWishlistItems = async (userId) => {
  return await GetAPI(`favourite/getUserFavourite/${userId}`);
};

// Function to remove wishlist item
export const removeWishlistItemById = async (favouriteId) => {
  const response = await axios.delete(
    `${ServiceAPI}/favourite/removeFromFavourite/${favouriteId}`
  );
  // Assuming the response contains a success field
  return response.data;
};
