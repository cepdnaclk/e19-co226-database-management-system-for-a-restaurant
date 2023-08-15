const initialState = [];

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return action.payload;
    case "CREATE_ORDER":
      return [action.payload, ...state];
    case "UPGRADE_ORDER":
      // Update an order's orderStatus based on the orderId and newStatus
      return state.map((order) =>
        order.id === action.payload.orderId
          ? { ...order, orderStatus: action.payload.newStatus }
          : order
      );
    case "MARK_ORDER_AS_PAID":
      // Mark an order as paid based on the orderId
      return state.map((order) =>
        order.id === action.payload
          ? { ...order, paymentStatus: "Paid" }
          : order
      );
    // Handle other order-related actions
    default:
      return state;
  }
};

export default orderReducer;
