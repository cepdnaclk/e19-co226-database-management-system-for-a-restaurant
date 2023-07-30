import axios from "axios";
import { authHeader } from "./auth_header";
import { ingredients_sample, suppliers_sample } from "../data/InventoryAndSuppliers";

const API_URL = "http://localhost:8080/api/v1";

export const fetchIngredients = async () => {
  try {
    const response = await axios.get(
      API_URL + "/ingredients"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return ingredients_sample;
  }
};
export const fetchSuppliers = async () => {
  try {
    const response = await axios.get(
      API_URL + "/suppliers");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return suppliers_sample;
  }
};

export const SearchInputChange = async (event) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/ingredients/search?name=${event.target.value}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered ingredients:", error);
  }
};

export const handleForm = (data) => {

  try {
    const response = axios.post(API_URL + "/supply", data);
    console.log("Response:", response.data);
    return response.data
    // Handle successful response here, if needed
  } catch (error) {
    console.error("Error:", error);
    // alert("Error:", error);
    // Handle error here, if needed
  }
};
