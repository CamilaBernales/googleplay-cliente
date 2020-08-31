import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
const RutaPrivAdmin = ({ component: Component, ...props }) => {
  const [permisoValido, setPermisoValido] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const uservalidation = () => {
      if (
        props.respuesta.validToken === true &&
        props.respuesta.isDeveloper === true
      ) {
        setPermisoValido(true);
        setLoading(false);
      } else {
        setPermisoValido(false);
        setLoading(false);
      }
    };
    uservalidation();
    // eslint-disable-next-line
  }, []);
  return loading ? null : (
    <Route
      {...props}
      render={(routeProps) => {
        return !permisoValido ? (
          <Redirect to="/login" />
        ) : (
          <Component {...routeProps} {...props} />
        );
      }}
    />
  );
};
export default RutaPrivAdmin;
