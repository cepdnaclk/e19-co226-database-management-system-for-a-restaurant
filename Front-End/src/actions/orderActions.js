export const setOrders = (orders) => {
    return {
      type: 'SET_ORDERS',
      payload: orders,
    };
  };
  
  export const placeOrder = (order) => {
    return {
      type: 'PLACE_ORDER',
      payload: order,
    };
  };
  
  // Add more order-related actions as needed
  