import { useState } from "react";
import { handleForm } from "../../services/Orders.service";
import styles from "../../styles/OrderForm.module.scss";
import { calPrice } from "../../utils";


export const OrderForm = ({ menuItems, onClose }) => {
  const [item, setItem] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (event) => {
    // event.preventDefault();

    const data = {
      item: item,
      quantity: quantity, // Replace 'quantity' with the actual quantity value
      address: address,
      number: number,
      date: new Date(), // Replace 'date' with the actual date value
      time: (new Date()).getHours+ ":" + (new Date()).getMinutes, // Replace 'time' with the actual time value
    };

    try {
      const response = handleForm(data);
      console.log("Response:", response);
      // Handle successful response here, if needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error here, if needed
    }
  };

  return (
    <div className={styles.card}>
        {/* <button className={styles.close_button}>X</button> */}
      <form onSubmit={onClose}>
        <fieldset>
          <legend className={styles.legend}>
            <strong>Make a New Order</strong>
          </legend>
          <div className={styles.card_content}>
            <div className={styles.select}>
              <p>Select Item :</p>
              <select
                value={item}
                onClick={(input) => setItem(input.target.value)}
                onChange={(input) => setItem(input.target.value)}
                id="ingredient"
                name="ingredient"
              >
                <option disabled selected hidden></option>
                {menuItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.category} || {item.title} || {item.price}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.select}>
              <p>Quantity &ensp;&ensp;:</p>
              <input
                type="number"
                value={quantity}
                onChange={(input) => setQuantity(input.target.value)}
                required="requred"
              />
            </div>
            <div className={styles.select}>
              <p>Address &ensp;&ensp;:</p>
              <input
                type="text"
                value={address}
                onChange={(input) => setAddress(input.target.value)}
              />
            </div>
            <div className={styles.select}>
              <p>Telephone :</p>
              <input
                type="text"
                value={number}
                onChange={(input) => setNumber(input.target.value)}
              />
            </div>
            <div className={styles.select}>
              <p>Price &emsp;&emsp;&ensp;:&ensp;</p>
              <p className={styles.price}>Rs. {calPrice(parseInt(quantity),parseInt(item))}.00</p>
            </div>
            <button type="submit" className={styles.button} onClick={handleSubmit()}>
              Submit Order
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};