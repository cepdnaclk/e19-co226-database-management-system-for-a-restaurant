const initialState = [];

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MENU_ITEMS':
      return action.payload;
    case 'ADD_MENU_ITEM':
      return [...state, action.payload];
    case 'UPDATE_MENU_ITEM':
      return state.map(item => (item.id === action.payload.id ? action.payload : item));
    case 'DELETE_MENU_ITEM':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

export default menuReducer;
