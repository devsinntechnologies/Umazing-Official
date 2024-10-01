import axios from "axios";

export const ServiceAPI = "http://97.74.89.204:4000";

// Categories API function
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${ServiceAPI}/category/getAllCategories`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// login API function
export const login = async (data) => {
  try {
    const response = await axios.post(`${ServiceAPI}/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Throw error for react-query's onError
  }
};

// registerUser API function
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${ServiceAPI}/auth/register`, userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error; // Let the error bubble up to be handled in the calling component.
  }
};

// Shop API function
export const ShopAPI = async (isViewAll) => {
  try {
    const endpoint = isViewAll
      ? `${ServiceAPI}/category/getAllCategories?pageNo=1&pageSize=100`
      : `${ServiceAPI}/product/allProducts?pageNo=1&pageSize=200`;

    const response = await axios.get(endpoint);
    return response.data.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it in page.jsx
  }
};

// Fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const { data } = await axios.get(`${ServiceAPI}/product/getById/${id}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching product:", error.message);
    throw error; // You can handle this error in the calling component
  }
};
