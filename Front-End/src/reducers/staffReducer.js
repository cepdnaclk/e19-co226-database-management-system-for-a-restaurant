const initialState = [];

const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STAFF_MEMBERS':
      return action.payload;
    case 'ADD_STAFF_MEMBER':
      return [...state, action.payload];
    // Handle other staff-related actions
    default:
      return state;
  }
};

export default staffReducer;
