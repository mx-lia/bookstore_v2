export const addItem = (dispatch, addAlert) => (book) => {
  try {
    dispatch({ type: "ADD_ITEM_LOADING" });
    let booksInCart = [];
    if (localStorage.getItem("shoppingCart") != null) {
      booksInCart = JSON.parse(localStorage.getItem("shoppingCart"));
      booksInCart.push({
        book: book,
        quantity: 1,
      });
      localStorage.setItem("shoppingCart", JSON.stringify(booksInCart));
    } else {
      localStorage.setItem(
        "shoppingCart",
        JSON.stringify([{ book: book, quantity: 1 }])
      );
    }
    dispatch({
      type: "ADD_ITEM_SUCCESS",
      payload: booksInCart,
      price: book.price,
    });
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const removeItem = (dispatch, addAlert) => (book) => {
  try {
    dispatch({ type: "REMOVE_ITEM_LOADING" });
    let booksInCart = JSON.parse(localStorage.getItem("shoppingCart"));
    let deletedAmount;
    booksInCart = booksInCart
      ? booksInCart.filter((value) => {
        if (value.book.isbn === book.isbn) deletedAmount = value.quantity;
        return value.book.isbn !== book.isbn;
      })
      : booksInCart;
    localStorage.setItem("shoppingCart", JSON.stringify(booksInCart));
    dispatch({
      type: "REMOVE_ITEM_SUCCESS",
      payload: booksInCart,
      amount: deletedAmount,
      price: book.price * deletedAmount,
    });
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const incrementItem = (dispatch, addAlert) => (book) => {
  try {
    dispatch({ type: "INCREMENT_ITEM_LOADING" });
    let booksInCart = JSON.parse(localStorage.getItem("shoppingCart"));
    booksInCart = booksInCart?.map((value) => {
      let object;
      if (value.book.isbn === book.isbn)
        object = {
          ...value,
          quantity: value.quantity + 1,
        };
      else {
        object = value;
      }
      return object;
    });
    localStorage.setItem("shoppingCart", JSON.stringify(booksInCart));
    dispatch({
      type: "INCREMENT_ITEM_SUCCESS",
      payload: booksInCart,
      price: book.price,
    });
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const decrementItem = (dispatch, addAlert) => (book) => {
  try {
    dispatch({ type: "DECREMENT_ITEM_LOADING" });
    let booksInCart = JSON.parse(localStorage.getItem("shoppingCart"));
    booksInCart = booksInCart?.map((value) => {
      let object;
      if (value.book.isbn === book.isbn)
        object = {
          ...value,
          quantity: value.quantity - 1,
        };
      else {
        object = value;
      }
      return object;
    });
    localStorage.setItem("shoppingCart", JSON.stringify(booksInCart));
    dispatch({
      type: "DECREMENT_ITEM_SUCCESS",
      payload: booksInCart,
      price: book.price,
    });
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const isInCart = (addAlert) => (isbn) => {
  try {
    let booksInCart = JSON.parse(localStorage.getItem("shoppingCart"));
    booksInCart = booksInCart
      ? booksInCart.filter((value) => value.book.isbn === isbn)
      : booksInCart;
    if (booksInCart && booksInCart.length !== 0) return true;
    else return false;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};
