import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CustomerApp from "./CustomerApp";
import AdminApp from "./AdminApp";

import CustomerProvider from "../context/customerContext";
import AlertProvider from "../context/alertContext";

import "./App.css";

export default () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <AlertProvider>
          <CustomerProvider>
            <Switch>
              <Route path="/admin">
                <AdminApp />
              </Route>
              <Route path="/">
                <CustomerApp />
              </Route>
            </Switch>
          </CustomerProvider>
        </AlertProvider>
      </Router>
    </div>
  );
};
