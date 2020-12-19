const ShoppingCartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_SUCCESS":
      return {
        ...state,
        books: action.payload,
        totalCount: state.totalCount + 1,
        totalSum:
          Number.parseFloat(state.totalSum.toPrecision(4)) +
          Number.parseFloat(action.price.toPrecision(4)),
      };
    case "REMOVE_ITEM_SUCCESS":
      return {
        ...state,
        books: action.payload,
        totalCount: state.totalCount - action.amount,
        totalSum:
          Number.parseFloat(state.totalSum.toPrecision(4)) -
          Number.parseFloat(action.price.toPrecision(4)),
      };
    case "INCREMENT_ITEM_SUCCESS":
      return {
        ...state,
        books: action.payload,
        totalCount: state.totalCount + 1,
        totalSum:
          Number.parseFloat(state.totalSum.toPrecision(4)) +
          Number.parseFloat(action.price.toPrecision(4)),
      };
    case "DECREMENT_ITEM_SUCCESS":
      return {
        ...state,
        books: action.payload,
        totalCount: state.totalCount - 1,
        totalSum:
          Number.parseFloat(state.totalSum.toPrecision(4)) -
          Number.parseFloat(action.price.toPrecision(4)),
      };
    default:
      return state;
  }
};

export default ShoppingCartReducer;
