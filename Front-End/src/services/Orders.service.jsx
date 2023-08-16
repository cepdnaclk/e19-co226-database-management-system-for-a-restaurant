import axios from "axios";
import { API } from "./BaseApi";

import { confirmedOrders, OrdersTrial, waitingOrders } from "../data/Orders";

const API_URL = API;

export const fetchOrders = async () => {
    try {
      const response = await axios.get(
        API_URL + "/orders"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return OrdersTrial;
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

  export const handleForm = async (data,refresher) => {

    try {
      const response = await axios.post(API_URL + "/orders", data);
      console.log("Response:", response.data);
      refresher(true);
      return response.data
      // Handle successful response here, if needed
    } catch (error) {
      console.error("Error:", error);
      // alert("Error:", error);
      // Handle error here, if needed
    }
  };

  export const upgradeOrder = async (order,newStatus,refresher) =>{
    try{
      
      console.log(newStatus)
      const response = await axios.put(`${API_URL}/orders/upgrade/${order.id}/${newStatus}`,null,)
      refresher(true)
      return response.data
    }
    catch(error){
      console.error("Error:",error)
    }
  };


  export const payOrder = async (order,refresher) =>{
    try{
      
      const response = await axios.put(`${API_URL}/orders/pay/${order.id}`,null,)
      refresher(true)
      return response.data
    }
    catch(error){
      console.error("Error:",error)
    }
  };

  export const deleteOrder = async (order,refresher) =>{
    try{
      
      const response = await axios.delete(`${API_URL}/orders/${order.id}`,null,)
      refresher(true)
      return response.data
    }
    catch(error){
      console.error("Error:",error)
    }
  };