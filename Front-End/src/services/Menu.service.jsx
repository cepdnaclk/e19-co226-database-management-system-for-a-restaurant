import axios from "axios";
import { API } from "./BaseApi";

import { menuItemsData, newMenu } from "../data/Menu";

const API_URL = API;

export const fetchMenu = async () => {
    try {
      const response = await axios.get(
        API_URL + "/menuitem"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching menu:", error);
      return newMenu;
    }
  };