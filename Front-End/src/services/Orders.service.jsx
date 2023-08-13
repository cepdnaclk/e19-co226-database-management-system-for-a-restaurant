import axios from "axios";
import { confirmedOrders, OrdersTrial, waitingOrders } from "../data/Orders";

const API_URL = "http://localhost:8080/api/v1";

export const fetchOrders = async () => {
    try {
      const response = await axios.get(
        API_URL + "/orders"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return confirmedOrders;
    }
  };

  export const fetchWaitingOrders = async () => {
    try {
      const response = await axios.get(
        API_URL + "/waitingOrders"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching waiting orders:", error);
      return OrdersTrial;
    }
  };

  export const handleForm = (data) => {

    try {
      const response = axios.post(API_URL + "/orders", data);
      console.log("Response:", response.data);
      return response.data
      // Handle successful response here, if needed
    } catch (error) {
      console.error("Error:", error);
      // alert("Error:", error);
      // Handle error here, if needed
    }
  };