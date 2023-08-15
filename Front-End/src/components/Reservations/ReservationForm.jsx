import { useState, useEffect } from "react";
import { handleForm } from "../../services/Reservations.service";
import styles from "../../styles/Reservation/ReservationForm.module.scss";
import { fetchStaff } from "../../services/Staff.service";
import { fetchCustomers } from "../../services/Customers.service";


export const ReservationForm = ({ areas, onClose, refresher }) => {
  const [address, setAddress] = useState("");
  const [customerId, setCustomerId] = useState(0);
  const [staffId, setStaffId] = useState(0);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [date, setDate] = useState("2023-08-08");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("10:00");
  const [customers, setCustomers] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCustomers = await fetchCustomers();
      const fetchedStaff = await fetchStaff();
      setCustomers(fetchedCustomers);
      setStaff(fetchedStaff);
    };

    fetchData();
  }, []);
  
  
  const handleSubmit = (event) => {
    // event.preventDefault();

    const data = {
      listofAreas: selectedAreas,
      customerId: customerId,
      staffId: staffId,
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
                required="requred"
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
              {/* <p>Select Customer:</p> */}
              <select
                value={customerId}
                onChange={(event) => setCustomerId(event.target.value)}
                required="requred"
              >
                <option value={0}>Select a Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.firstName} | {customer.phone[0]}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.select}>
              {/* <p>Select Staff:</p> */}
              <select
                value={staffId}
                onChange={(event) => setStaffId(event.target.value)}
                required="requred"
              >
                <option value={0}>Select a Staff Member</option>
                {staff.map((staffMember) => (
                  <option key={staffMember.id} value={staffMember.id}>
                    {staffMember.firstName}{" "}
                    {staffMember.lastName} | Position: {staffMember.position}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.select}>
              <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Reserving Date"
              />
            </div>

            <div className={styles.select}>
              <input 
                type="time"
                value={startTime}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Strating Time"
              />
              <p> to </p>
              <input 
                type="time"
                value={endTime}
                onChange={(e) => setDate(e.target.value)}
                EndingTime
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