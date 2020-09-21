import React from 'react';
import {Redirect,Route} from 'react-router-dom'

const ProtectedRoute = ({ component: Component,redirect,user, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component user={user} {...props} />
        ) : (
          <Redirect to={redirect} />
        )
      }
    />
  );
};

export default ProtectedRoute;
