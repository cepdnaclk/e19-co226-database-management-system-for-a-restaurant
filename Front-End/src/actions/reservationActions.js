export const setReservations = (reservations) => {
    return {
      type: 'SET_RESERVATIONS',
      payload: reservations,
    };
  };
  
  export const makeReservation = (reservation) => {
    return {
      type: 'MAKE_RESERVATION',
      payload: reservation,
    };
  };
  
  // Add more reservation-related actions as needed
  