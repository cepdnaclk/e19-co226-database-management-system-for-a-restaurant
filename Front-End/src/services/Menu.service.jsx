import axios from "axios";
import { menuItemsData } from "../data/Menu";

const API_URL = "http://localhost:8080/api/v1";

export const fetchMenu = async () => {
    try {
      const response = await axios.get(
        API_URL + "/menuitem"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching menu:", error);
      return menuItemsData;
    }
  };