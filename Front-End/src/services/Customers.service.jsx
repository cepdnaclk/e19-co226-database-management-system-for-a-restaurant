import { Customers } from "../data/Customers";

import axios from "axios";
const API_URL = "http://localhost:8080/api/v1";

export const fetchCustomers = async(data) => {
    try {
      const response = await axios.get(
        API_URL + "/customers", data
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      return [];
    }
  };

export const addCustomers = async() => {
  try {
    const response = await axios.post(
      API_URL + "/customers"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding customers:", error);
    return [];
  }
};
