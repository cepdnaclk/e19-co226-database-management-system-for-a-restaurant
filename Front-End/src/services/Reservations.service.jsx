import axios from "axios";
import { reservations, waitings } from "../data/Reservations";

const API_URL = "http://localhost:8080/api/v1";

export const fetchReservations = async () => {
    try {
      const response = await axios.get(
        API_URL + "/reservations"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return reservations;
    }
  };

  export const fetchWaitings = async () => {
    try {
      const response = await axios.get(
        API_URL + "/waitingReservations"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Waitings:", error);
      return waitings;
    }
  };