import { useState } from "react";
import { handleForm } from "../../services/Orders.service";
import styles from "../../styles/Orders/OrderForm.module.scss";
import { calPrice } from "../../utils";


export const OrderForm = ({ menuItems, onClose }) => {
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});

  const handleSubmit = (event) => {
    // event.preventDefault();

    const data = {
      listofItems: selectedItems.map((item) => ({
        itemId: item.id,
        quantity: parseInt(itemQuantities[item.id],10)
      })),
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

  const handleItemAdd = (selectedItemtId) => {
    const selectedItem = menuItems.find((item) => item.id === selectedItemtId);
    setSelectedItems([...selectedItems, selectedItem]);
  };

  const handleQuantityChange = (event, itemId) => {
    setItemQuantities({ ...itemQuantities, [itemId]: event.target.value });
  };

  const handleItemRemove = (selectedIngredientId) => {
    setSelectedItems(selectedItems.filter((ingredient) => ingredient.id !== selectedIngredientId));
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
                defaultValue=""
                onChange={(input) => handleItemAdd(parseInt(input.target.value, 10))}
                id="item"
                name="item"
              >
                <option disabled value="">
                  Select an Item
                </option>
                {menuItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.category} || {item.title} || {item.price}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.selectItems}>
            {selectedItems.map((item) => (
              <div key={item.id} className={styles.showItems}>
                <p>{item.title} -{' '}</p>
                <input
                  type="number"
                  min="0"
                  defaultValue={0}
                  value={itemQuantities[item.id] || ''}
                  onChange={(e) => handleQuantityChange(e, item.id)}
                />
                <button type="button" onClick={() => handleItemRemove(item.id)}>
                  X
                </button>
              </div>
            ))}
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
              <p className={styles.price}>Rs. {calPrice(selectedItems,itemQuantities)}.00</p>
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