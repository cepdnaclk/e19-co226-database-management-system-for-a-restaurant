import React, { useState } from "react";
import { addCustomers } from "../../services/Customers.service";
import styles from "../../styles/Customer/CustomerForm.module.scss";

export const CustomerForm = ({onClose}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddPhone = () => {
    setFormData({
      ...formData,
      phone: [...formData.phone, ""],
    });
  };

  const handleRemovePhone = (index) => {
    const updatedPhone = [...formData.phone];
    updatedPhone.splice(index, 1);
    setFormData({
      ...formData,
      phone: updatedPhone,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomers(formData);
    console.log(formData);
    onClose();
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <legend className={styles.legend}>
          <strong>Add an Customer</strong>
        </legend>
        <div className={styles.card_content}>
          <div className={styles.select}>
            {/* <label htmlFor="name">Name &emsp;&emsp;&nbsp;:</label> */}
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              required = "true"
              onChange={handleChange}
              placeholder="First Name"
            />
          </div>

          <div className={styles.select}>
            {/* <label htmlFor="name">Name &emsp;&emsp;&nbsp;:</label> */}
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              required = "true"
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          <div className={styles.select}>
            {/* <label htmlFor="quantity">Quantity &ensp;&ensp;&nbsp;:</label> */}
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              required = "true"
              onChange={handleChange}
              placeholder="Address"
            />
          </div>

          <div className={styles.select}>
            {/* <label htmlFor="quantityType">Type &ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;:</label> */}
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              required = "true"
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className={styles.itemSet}>
            {/* <label htmlFor="phone">Phone &ensp;&ensp;: </label> */}
            {formData.phone.map((phoneValue, index) => (
              <div key={index} className={styles.select}>
                <input
                  type="phone"
                  name={`phone[${index}]`}
                  value={phoneValue}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                  placeholder={`Phone Number ${index+1}`}
                />
                {index !== 0 && (
                  <button
                    type="button"
                    className={styles.remove_button}
                    onClick={() => handleRemovePhone(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.item_button}
            onClick={handleAddPhone}
          >
            Add Phone
          </button>
        

        <button className={styles.button} type="submit">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};