import axios from "axios";
import { confirmedOrders, waitingOrders } from "../data/Orders";

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
      return waitingOrders;
    }
  };