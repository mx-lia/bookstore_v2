import serverCall from "./serverCall";

export const getOrders = async (addAlert) => {
  try {
    const res = await serverCall("https://localhost:44341/api/orders");
    return res;
  } catch (err) {
    addAlert({ type: "danger", 
 message: err.message});
  }
};

export const createOrder = async (customer, books, addAlert) => {
  try {
    const res = await serverCall("https://localhost:44341/api/orders", {
      body: {
        customer,
        books: books?.map((element) => {
          return { isbn: element.book.isbn, amount: element.quantity };
        }),
      },
    });
    return res;
  } catch (err) {
    addAlert({ type: "danger", 
 message: err.message});
  }
};
