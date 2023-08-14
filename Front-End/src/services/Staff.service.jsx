import axios from "axios";
import {staffData} from "../data/Staff";

const API_URL = "http://localhost:8080/api/v1";

export const fetchStaff = async () => {
    try {
      const response = await axios.get(
        API_URL + "/staff"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching staff:", error);
      return [];
    }
  };

export const handleForm = async (data,refresher) =>{
  try {
    const response = await axios.post(
      API_URL + "/staffAdd", data
    );
    console.log("Member Added",response.data);
    refresher(true);
    return response.data;
  } catch (error) {
    console.error("Error Adding Member:", error);
  }
}