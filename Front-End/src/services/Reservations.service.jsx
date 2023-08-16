import axios from "axios";
import { API } from "./BaseApi";

import { cReservations, waitingList } from "../data/Reservations";

const API_URL = API;

export const fetchReservations = async () => {
    try {
      const response = await axios.get(
        API_URL + "/reservation"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return cReservations;
    }
  };

  export const fetchWaitings = async () => {
    try {
      const response = await axios.get(
        API_URL + "/waitingReservation"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Waitings:", error);
      return waitingList;
    }
  };

  export const handleForm = (data) => {

    try {
      const response = axios.post(API_URL + "/reservations", data);
      console.log("Response:", response.data);
      return response.data
      // Handle successful response here, if needed
    } catch (error) {
      console.error("Error:", error);
      // alert("Error:", error);
      // Handle error here, if needed
    }
  };