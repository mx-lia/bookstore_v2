import React, { useReducer } from 'react';
import { createPortal } from 'react-dom';
import Alert from "../components/Alert";
import AlertReducer from "../reducers/alertReducer";
import {
  addAlert,
  removeAlert
} from "../actions/alertActions.js";

export const Context = React.createContext();

const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, []);

  return (
    <Context.Provider value={{
      state,
      addAlert: addAlert(dispatch),
      removeAlert: removeAlert(dispatch)
    }}>
      {children}

      {createPortal(<Alert alerts={state} />, document.body)}
    </Context.Provider>
  );
};

export default AlertProvider;