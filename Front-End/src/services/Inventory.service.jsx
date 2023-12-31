import axios from "axios";
import { API } from "./BaseApi";

import { authHeader } from "./auth_header";
import { ingredients_sample, suppliers_sample, null_inventory } from "../data/InventoryAndSuppliers";

const API_URL = API;

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

export const SearchInputChangeIngredients = async (event) => {
  try {
    const response = await axios.get(
      API_URL + `/ingredients/search?name=${event.target.value}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered ingredients:", error);
    // return null_inventory;
  }
};

export const SearchInputChangeSupply = async (event) => {
  try {
    const response = await axios.get(
      API_URL +  `/suppliers/search?name=${event.target.value}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered suppliers:", error);
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
export const createSupplier = (data) => {
  
  try {
    const response = axios.post(API_URL + "/suppliers", data);
    console.log("Response:", response.data);
    return response.data
    // Handle successful response here, if needed
  } catch (error) {
    console.error("Error:", error);
    // alert("Error:", error);
    // Handle error here, if needed
  }
};

export const createIngredient = (data) => {
  
  try {
    const response = axios.post(API_URL + "/ingredients", data);
    console.log("Response:", response.data);
    return response.data
    // Handle successful response here, if needed
  } catch (error) {
    console.error("Error:", error);
    // alert("Error:", error);
    // Handle error here, if needed
  }
};