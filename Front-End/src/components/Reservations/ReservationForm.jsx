import { useState } from "react";
import { handleForm } from "../../services/Reservations.service";
import styles from "../../styles/Reservation/ReservationForm.module.scss";



export const ReservationForm = ({ areas, onClose }) => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [selectedAreas, setSelectedAreas] = useState([]);

  const handleSubmit = (event) => {
    // event.preventDefault();

    const data = {
      listofAreas: selectedAreas,
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

  const handleAreaAdd = (selectedAreatId) => {
    const selectedArea = areas.find((area) => area.id === selectedAreatId);
    setSelectedAreas([...selectedAreas, selectedArea]);
  };


  const handleAreaRemove = (selectedAreaId) => {
    setSelectedAreas(selectedAreas.filter((area) => area.id !== selectedAreaId));
  };

  return (
    <div className={styles.card}>
        {/* <button className={styles.close_button}>X</button> */}
      <form onSubmit={onClose}>
        <fieldset>
          <legend className={styles.legend}>
            <strong>Make a New Reservation</strong>
          </legend>
          <div className={styles.card_content}>
            <div className={styles.select}>
              {/* <p>Select Area :</p> */}
              <select
                defaultValue=""
                onChange={(input) => handleAreaAdd(parseInt(input.target.value, 10))}
                id="area"
                name="area"
              >
                <option disabled value="">
                  Select Area
                </option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.selectAreas}>
            {selectedAreas.map((area) => (
              <div key={area.id} className={styles.showItems}>
                <p>{area.name}</p>
                <button type="button" onClick={() => handleAreaRemove(area.id)}>
                  X
                </button>
              </div>
            ))}
          </div>
          <div className={styles.select}>
              {/* <p>Customer Name :</p> */}
              <input
                type="text"
                value={name}
                onChange={(input) => setName(input.target.value)}
                placeholder="Customer Name"
              />
            </div>
            <div className={styles.select}>
              {/* <p>Address &ensp;&ensp;:</p> */}
              <input
                type="text"
                value={address}
                onChange={(input) => setAddress(input.target.value)}
                placeholder="Home Address"
              />
            </div>
            <div className={styles.select}>
              {/* <p>Telephone :</p> */}
              <input
                type="text"
                value={number}
                onChange={(input) => setNumber(input.target.value)}
                placeholder="Telephone Number"
              />
            </div>
            <button type="submit" className={styles.button} onClick={handleSubmit()}>
              Make Reservation
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};