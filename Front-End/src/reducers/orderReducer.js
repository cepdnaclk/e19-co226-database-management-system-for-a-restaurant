const initialState = [];

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return action.payload;
    case 'PLACE_ORDER':
      return [...state, action.payload];
    // Handle other order-related actions
    default:
      return state;
  }
};

export default orderReducer;
