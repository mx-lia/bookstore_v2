import React from "react";
import { Switch, Route } from "react-router-dom";

import AdminPrivateRoute from "../components/PrivateRoutes/AdminPrivateRoute";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import DashboardBook from "../pages/Admin/DashboardBook";
import Footer from "../components/GeneralLayout/Footer";

const AdminApp = () => (
  <React.Fragment>
    <div className="flex-grow-1">
      <Switch>
        <Route exact path="/admin">
          <AdminLogin />
        </Route>
        <AdminPrivateRoute
          exact
          path="/admin/dashboard"
          component={AdminDashboard}
        />
        <AdminPrivateRoute
          exact
          path="/admin/dashboard/newbook"
          component={DashboardBook}
        />
        <AdminPrivateRoute
          exact
          path="/admin/dashboard/book/:isbn"
          component={DashboardBook}
        />
      </Switch>
    </div>
    <Footer />
  </React.Fragment>
);

export default AdminApp;
