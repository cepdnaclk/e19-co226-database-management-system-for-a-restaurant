import axios from "axios";
import { API } from "./BaseApi";

import {staffData} from "../data/Staff";

const API_URL = API;

export const fetchStaff = async () => {
    try {
      const response = await axios.get(
        API_URL + "/staff"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching staff:", error);
      return staffData;
    }
  };

export const handleForm = async (data) =>{
  try {
    const response = await axios.post(
      API_URL + "/staff", data
    );
    console.log("Member Added",response.data);
    refresher(true);
    return response.data;
  } catch (error) {
    console.error("Error Adding Member:", error);
  }
}