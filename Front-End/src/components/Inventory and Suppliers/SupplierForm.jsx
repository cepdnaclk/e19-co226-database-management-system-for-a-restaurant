import React, { useState } from 'react';
import { createSupplier } from '../../services/Inventory.service';
import styles from "../../styles/InventoryForm.module.scss";

export const SupplierForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: [''],
    item: [''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (index, value) => {
    const updatedPhone = [...formData.phone];
    updatedPhone[index] = value;
    setFormData({
      ...formData,
      phone: updatedPhone,
    });
  };

  const handleItemChange = (index, value) => {
    const updatedItem = [...formData.item];
    updatedItem[index] = value;
    setFormData({
      ...formData,
      item: updatedItem,
    });
  };

  const handleAddPhone = () => {
    setFormData({
      ...formData,
      phone: [...formData.phone, ''],
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

  const handleAddItem = () => {
    setFormData({
      ...formData,
      item: [...formData.item, ''],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItem = [...formData.item];
    updatedItem.splice(index, 1);
    setFormData({
      ...formData,
      item: updatedItem,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSupplier(formData);
    console.log(formData);
  };

  return (
    <div className={styles.card}>
    <form onSubmit={handleSubmit}>

    <legend className={styles.legend}>
            <strong>Add a Supplier</strong>
    </legend>
    <div className={styles.card_content}>
      <div className={styles.select}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className={styles.select}>
        <label htmlFor="address">Address</label>
        <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} />
      </div>

      <div className={styles.select}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} />
      </div>

      <div className={styles.select}>
        <label htmlFor="phone">Phone</label>
        {formData.phone.map((phoneValue, index) => (
          <div key={index}>
            <input
              type="text"
              name={`phone[${index}]`}
              value={phoneValue}
              onChange={(e) => handlePhoneChange(index, e.target.value)}
            />
            {index !== 0 && (
              <button type="button" onClick={() => handleRemovePhone(index)}>
                Remove Phone
              </button>
            )}
          </div>
        ))}

    </div >
        <button type="button" onClick={handleAddPhone}>
          Add Phone
        </button>
      

      <div>
        <label htmlFor="item">Item</label>
        {formData.item.map((itemValue, index) => (
          <div key={index}>
            <input
              type="text"
              name={`item[${index}]`}
              value={itemValue}
              onChange={(e) => handleItemChange(index, e.target.value)}
            />
            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveItem(index)}>
                Remove Item
              </button>
            )}
          </div>
        ))}
        </div>
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
      </div>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};


