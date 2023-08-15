import React, { useState } from "react";
import { handleForm } from "../../services/Staff.service";
import styles from "../../styles/Staff/AddStaffForm.module.scss";
import { categories } from "../../data/Staff";

export const AddStaff = ({ onClose}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    category: "",
    position: "",
    assignedWork: "",
    description: "",
    imageUrl: "",
    salary: "",
    email: "",
    address: "",
    phone: [""],
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

  const handleSubmit = () => {
    // event.preventDefault();
    // console.log(ingredient);
    // console.log(category);

    try {
      const response = handleForm(formData);
      console.log("Response:", response);
      // Handle successful response here, if needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error here, if needed
    }
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className={styles.legend}>
            <strong>Add a New Staff Member</strong>
          </legend>
          <div className={styles.card_content}>
            <div className={styles.select}>
              <p>First Name &emsp;&emsp;&nbsp;:</p>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required="required"
              />
            </div>
            <div className={styles.select}>
              <p>Last Name &emsp;&emsp;&nbsp;:</p>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required="required"
              />
            </div>

            <div className={styles.select}>
              <p>Email &emsp;&emsp;&emsp;&emsp;&nbsp;&ensp;:</p>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required="required"
              />
            </div>
            <div className={styles.select}>
              <p>Address &emsp;&emsp;&emsp;&ensp;:</p>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required="required"
              />
            </div>

            <div className={styles.select}>
              <p>Select Category :</p>
              <select
                value={formData.category}
                onClick={handleChange}
                onChange={handleChange}
                id="category"
                name="category"
                required="requred"
              >
                <option disabled value="">
                  Select a Category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.select}>
              <p>Position &emsp;&emsp;&emsp;&ensp;:</p>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required="required"
                placeholder="Position"
              />
            </div>
            <div className={styles.select}>
              <p>Assigned Work &nbsp;:</p>
              <textarea
                name="assignedWork"
                value={formData.assignedWork}
                onChange={handleChange}
                required="required"
                placeholder="Assigned Work"
              />
            </div>
            <div className={styles.select}>
              <p>Description &emsp;&emsp;:</p>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required="required"
                placeholder="Description"
              />
            </div>
            <div className={styles.select}>
              <p>Image &emsp;&emsp;&emsp;&emsp;&nbsp;:</p>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required="required"
                placeholder="Paste a link to your image"
              />
            </div>
            <div className={styles.select}>
              <p>Salary &emsp;&emsp;&emsp;&emsp;&nbsp;:</p>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required="required"
                placeholder="Enter Salary"
              />
            </div>

            <div className={styles.itemSet}>
              {/* <p>Phone &emsp;&emsp;&emsp;&emsp;:</p> */}
              {formData.phone.map((phoneValue, index) => (
                <div key={index} className={styles.select}>
                  <input
                    type="phone"
                    name={`phone[${index}]`}
                    value={phoneValue}
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                    placeholder={`Phone Number ${index + 1}`}
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
              onClick={() => handleAddPhone()}
            >
              Add Phone
            </button>

            <button
              type="submit"
              className={styles.button}
            >
              Add Member
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
