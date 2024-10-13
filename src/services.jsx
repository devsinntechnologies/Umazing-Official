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
export const fetchShopData = async (categoryId, pageNo, pageSize) => {
  if (categoryId) {
    return await GetAPI(
      `product/allProducts?CategoryId=${categoryId}&pageNo=${pageNo}&pageSize=${pageSize}`
    );
  } else {
    return await GetAPI(
      `product/allProducts?pageNo=${pageNo}&pageSize=${pageSize}`
    );
  }
  // Makes the GET request using the GetAPI function
};

// export const fetchProductsByCategoryId = async (categoryId) => {
//   try {
//     const response = await axios.get(
//       `http://97.74.89.204:4000/product/allProducts?CategoryId=${categoryId}&pageNo=1&pageSize=2`
//     );
//     console.log("Response data from API:", response.data); // Log response data
//     return response.data.data; // Return just the data
//   } catch (error) {
//     console.error(
//       "Error fetching products:",
//       error.response?.data || error.message
//     ); // Log detailed error
//     throw error; // Rethrow error for handling in the calling function
//   }
// };

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
