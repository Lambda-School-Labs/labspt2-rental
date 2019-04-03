import * as actions from "./actions";

const initialState = {
  loading: true,
  error: false,
  reservations: [],
  properties: [],
  employees: []
};

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESERVATION_STARTED:
      return {
        ...state,
        loading: true
      };
    case actions.RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        reservations: action.reservations
      };
    case actions.PROPERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: action.properties
      };
    case actions.EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.employees
      };
    case actions.RESERVATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return { ...state };
  }
};

export default reservationsReducer;
