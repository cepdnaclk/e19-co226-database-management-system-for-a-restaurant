import { fetchStaff } from '../services/Staff.service'; // Adjust the path as needed


// Fetch staff members from the backend
export const fetchStaffMembers = () => {
  return async (dispatch) => {
    try {
      const staffMembers = await fetchStaff(); // Use fetchStaff function
      dispatch(setStaffMembers(staffMembers)); // Call setStaffMembers action after fetching
    } catch (error) {
      console.error('Error fetching staff members:', error);
    }
  };
};
export const setStaffMembers = (staffMembers) => {
    return {
      type: 'SET_STAFF_MEMBERS',
      payload: staffMembers,
    };
  };
  
  export const addStaffMember = (staffMember) => {
    return {
      type: 'ADD_STAFF_MEMBER',
      payload: staffMember,
    };
  };
  
  // Add more staff-related actions as needed
  