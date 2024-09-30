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
