import React, { useContext } from "react";
import { Route } from "react-router-dom";

import { Context as CustomerContext } from "../../context/customerContext";
import ForbiddenPage from "../ForbiddenPage";

const UserPrivateRoute = ({ component: Component, ...rest }) => {
  const {
    state: { user },
  } = useContext(CustomerContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user && Number(user.role) === 2 ? (
          <Component {...props} />
        ) : (
          <ForbiddenPage/>
        )
      }
    />
  );
};

export default UserPrivateRoute;
