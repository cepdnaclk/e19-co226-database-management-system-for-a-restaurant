import { fetchMenu } from '../services/Menu.service'; // Import the fetchMenu function

// Fetch menu items from the backend
export const fetchMenuItems = () => {
  return async (dispatch) => {
    try {
      const menuItems = await fetchMenu(); // Use fetchMenu function
      dispatch(setMenuItems(menuItems)); // Call setMenuItems action after fetching
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };
};

export const setMenuItems = (menuItems) => {
    return {
      type: 'SET_MENU_ITEMS',
      payload: menuItems,
    };
  };
  
  export const addMenuItem = (menuItem) => {
    return {
      type: 'ADD_MENU_ITEM',
      payload: menuItem,
    };
  };
  
  export const updateMenuItem = (menuItem) => {
    return {
      type: 'UPDATE_MENU_ITEM',
      payload: menuItem,
    };
  };
  
  export const deleteMenuItem = (itemId) => {
    return {
      type: 'DELETE_MENU_ITEM',
      payload: itemId,
    };
  };
  