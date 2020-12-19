import React from "react";
import jwt from "jwt-decode";
import CustomerReducer from "../reducers/customerReducer";
import { Context as AlertContext } from "./alertContext";
import {
  signUp,
  signIn,
  signOut,
  setCurrentCustomer,
  updateCustomer,
} from "../actions/customerActions";

export const Context = React.createContext();

const CustomerProvider = ({ children }) => {
  const { addAlert } = React.useContext(AlertContext);
  const [state, dispatch] = React.useReducer(CustomerReducer, {
    error: null,
    user: sessionStorage.getItem("token")
      ? jwt(sessionStorage.getItem("token"))
      : null,
    loading: false,
  });

  return (
    <Context.Provider
      value={{
        state,
        signIn: signIn(dispatch, addAlert),
        signUp: signUp(dispatch, addAlert),
        signOut: signOut(dispatch, addAlert),
        setCurrentCustomer: setCurrentCustomer(dispatch, addAlert),
        updateCustomer: updateCustomer(dispatch, addAlert),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default CustomerProvider;
