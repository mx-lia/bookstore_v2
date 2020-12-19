const CustomerReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SIGNOUT_USER_SUCCESS":
      return { ...state, user: null, loading: false };
    case "SET_USER_SUCCESS":
      return { ...state, user: action.payload, loading: false };
    case "SET_USER_FAILURE":
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

export default CustomerReducer;
