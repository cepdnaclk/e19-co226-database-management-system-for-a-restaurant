const initialState = [];

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INGREDIENTS':
      return action.payload;
    default:
      return state;
  }
};

export default ingredientsReducer;
