import { useState,useEffect} from "react";
import { handleForm } from "../../services/Orders.service";
import styles from "../../styles/Orders/OrderForm.module.scss";
import { calPrice } from "../../utils";
import { fetchStaff } from "../../services/Staff.service";
import { fetchCustomers } from "../../services/Customers.service";
import { fetchMenu } from "../../services/Menu.service";

export const OrderForm = ({ onClose,refresher}) => {
  const [customerId, setCustomerId] = useState(0);
  const [staffId, setStaffId] = useState(0);
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});

  const [ customers,setCustomers] = useState([]);
  const [ staff,setStaff] = useState([]);

  const[menuItems,setMenuItems] = useState([]);

  useEffect(()=>{
    

    const fetchData = async () => {
      const fetchedCustomers = await fetchCustomers();
      const fetchedStaff =  await fetchStaff();
      const fetchedMenu = await fetchMenu();
      setCustomers(fetchedCustomers);
      setStaff(fetchedStaff);
      setMenuItems(fetchedMenu);
    };
  
    fetchData();
  },[])

  console.log(customers);
  console.log(staff);


  
  if (!Array.isArray(customers)) {
    console.error("Customers prop is not an array:", customers);
    return null; // or handle the error appropriately
  }

  


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      customerId: customerId,
      staffId: staffId,
      menuItems: selectedItems.map((item) => ({
        menuItemId: item.id,
        quantity: parseInt(itemQuantities[item.id], 10),
      })),
      address: address,
      number: number,
      placementDate: null, // Format date as "YYYY-MM-DD"
      placementTime: null, // Format time as "HH:mm"
    };

    try {
      const response = await handleForm(data,refresher); // Await the API call
      console.log("Response:", response);
      onClose();
      // Handle successful response here, if needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error here, if needed
    }
  };

  const handleItemAdd = (selectedItemId) => {
    const selectedItem = menuItems.find((item) => item.id === selectedItemId);
    setSelectedItems([...selectedItems, selectedItem]);
  };

  const handleQuantityChange = (event, itemId) => {
    setItemQuantities({ ...itemQuantities, [itemId]: event.target.value });
  };

  const handleItemRemove = (selectedItemId) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== selectedItemId));
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className={styles.legend}>
            <strong>Make a New Order</strong>
          </legend>
          <div className={styles.card_content}>
            <div className={styles.select}>
              <p>Select Customer:</p>
              <select
                value={customerId}
                onChange={(event) => setCustomerId(event.target.value)}
              >
                <option value={0}>Select a Customer</option>
                {customers.map((customer) => 
                  
                  (
                  <option key={customer.id} value={customer.id}>
                    {customer.id} | {customer.firstName} | {customer.phone[0]}
                  </option>


                )
                )}
              </select>
            </div>
            <div className={styles.select}>
              <p>Select Staff:</p>
              <select
                value={staffId}
                onChange={(event) => setStaffId(event.target.value)}
              >
                <option value={0}>Select a Staff</option>
                {staff.map((staffMember) => (
                  <option key={staffMember.id} value={staffMember.id}>
                    {staffMember.id} | {staffMember.firstName}  {staffMember.lastName} | Position: {staffMember.position}
                  </option>
                ))}
              </select>
            </div>
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
                    {item.category} || {item.name} || {item.price}
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
              <p className={styles.price}>Rs. {calPrice(selectedItems, itemQuantities)}.00</p>
            </div>

            <button type="submit" className={styles.button}>
              Submit Order
            </button>
          
          </div>

          
        </fieldset>

      </form>
    </div>
  );
};
