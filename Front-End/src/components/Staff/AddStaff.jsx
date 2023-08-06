import { useState } from "react";
import { handleForm } from "../../services/Inventory.service";
import styles from "../../styles/Staff/AddStaffForm.module.scss";
import { categories } from "../../data/Staff";

export const AddStaff = ({onClose}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState("");
  const [assignedWork, setAssignedWork] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = () => {
    // event.preventDefault();
    // console.log(ingredient);
    // console.log(category);

    const data = {
      name: name, 
      category: category, 
      position: position, 
      assignedWork: assignedWork, 
      description: description, 
      image: image, 
      salary: salary, 
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
            <strong>Add a New Staff Memeber</strong>
          </legend>
          <div className={styles.card_content}>
            <div className={styles.select}>
              <p>Name &emsp;&emsp;&emsp;&emsp;&nbsp;:</p>
              <input
                type="text"
                value={name}
                onChange={(input) => setName(input.target.value)}
                required="requred"
              />
            </div>
            <div className={styles.select}>
              <p>Select Category :</p>
              <select
                value={category}
                onClick={(input) => setCategory(input.target.value)}
                onChange={(input) => setCategory(input.target.value)}
                id="category"
                name="category"
                required="requred"
              >
                <option disabled value="">
                Select a Category
              </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.select}>
              <p>Position &ensp;&emsp;&emsp;&emsp;:</p>
              <input
                type="number"
                value={position}
                onChange={(input) => setPosition(input.target.value)}
                required="requred"
              />
            </div>
            <div className={styles.select}>
              <p>Assigned Work &nbsp;:</p>
              <textarea
                type="text"
                value={assignedWork}
                onChange={(input) => setAssignedWork(input.target.value)}
                required="requred"
              />
            </div>
            <div className={styles.select}>
              <p>Description &emsp;&emsp;:</p>
              <textarea
                type="text"
                value={description}
                onChange={(input) => setDescription(input.target.value)}
                required="requred"
              />
            </div>
            <div className={styles.select}>
              <p>Image &emsp;&emsp;&emsp;&emsp;&nbsp;:</p>
              <input
                type="link"
                value={image}
                onChange={(input) => setImage(input.target.value)}
                required="requred"
                placeholder="Paste a link to your image"
              />
            </div>
            <div className={styles.select}>
              <p>Salary &emsp;&emsp;&emsp;&emsp;&nbsp;:</p>
              <input
                type="number"
                value={salary}
                onChange={(input) => setSalary(input.target.value)}
                required="requred"
              />
            </div>
            <button type="submit" className={styles.button} onClick={handleSubmit()}>
              Add Member
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
