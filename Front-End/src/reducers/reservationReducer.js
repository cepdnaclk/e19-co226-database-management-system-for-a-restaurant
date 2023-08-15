const initialState = [];

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RESERVATIONS':
      return action.payload;
    case 'MAKE_RESERVATION':
      return [...state, action.payload];
    // Handle other reservation-related actions
    default:
      return state;
  }
};

export default reservationReducer;
