import serverCall from "./serverCall";

export const signUp = (dispatch, addAlert) => async (user) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await serverCall("https://localhost:44341/api/authentication/signup", { body: user });
    dispatch({ type: "SET_USER_SUCCESS", payload: res.customer });
    sessionStorage.setItem("token", res.token);
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const signIn = (dispatch, addAlert) => async (user) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await serverCall("https://localhost:44341/api/authentication/signin", { body: user });
    dispatch({ type: "SET_USER_SUCCESS", payload: res.customer });
    sessionStorage.setItem("token", res.token);
    return res;
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const signOut = (dispatch, addAlert) => async (history) => {
  try {
    dispatch({ type: "LOADING" });
    sessionStorage.clear("token");
    dispatch({ type: "SIGNOUT_USER_SUCCESS" });
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const setCurrentCustomer = (dispatch, addAlert) => async () => {
  try {
    dispatch({ type: "LOADING" });
    const res = await serverCall("https://localhost:44341/api/customers");
    dispatch({ type: "SET_USER_SUCCESS", payload: res });
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};

export const updateCustomer = (dispatch, addAlert) => async (customer) => {
  try {
    dispatch({ type: "LOADING" });
    const res = await serverCall("https://localhost:44341/api/customers", {
      method: "PUT",
      body: customer,
    });
    dispatch({ type: "SET_USER_SUCCESS", payload: res });
  } catch (err) {
    addAlert({
      type: "danger",
      message: err.message
    });
  }
};
