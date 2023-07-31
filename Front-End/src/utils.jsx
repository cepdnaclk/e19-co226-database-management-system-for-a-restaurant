import { menuItemsData } from "./data/Menu";
import { useState,useEffect } from "react";

export const getTimeString = (time) => {
  const hour = Math.floor(time / 100);
  const minutes = time % 100;
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(
    new Date(
      `2000-01-01T${hour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    )
  );
};

export const getDateInFormat = (date) => {
  // Return Date in : "weekday, Month Day" format
  const dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", dateOptions).format(date);
};

export const calPrice = (quantity, item) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(menuItemsData.filter((item0) => { return(item0.id === parseInt(item));
    })
  );},[menuItemsData,item]);
  console.log(parseInt(item),quantity);
  const itemPrice = (items[0]? items[0].price: "0.00")
  const iPN = itemPrice.replace(/[^0-9.]/g, '');
  console.log(iPN);
  const price = quantity * parseInt(iPN);
  return price;
};
