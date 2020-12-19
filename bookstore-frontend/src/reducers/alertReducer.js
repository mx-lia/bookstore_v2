const AlertReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      {
        if (state.length === 3) {
          state = [];
        }
        return [
          ...state,
          {
            id: +new Date(),
            message: action.payload.message,
            type: action.payload.type
          }
        ];
      }
    case "REMOVE":
      return state.filter(t => t.id !== action.payload.id);
    default:
      return state;
  }
};

export default AlertReducer;