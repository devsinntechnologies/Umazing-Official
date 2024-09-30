import axios from "axios";

export const ServiceAPI = "http://97.74.89.204:4000";

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
