import React, { useEffect, useState } from "react";
import { Spinner, Row } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RutaPrivadaDev from "./components/desarrollador/RutaPrivadaDev";
import RutaPrivada from "./components/usuario/RutaPrivada";
import axiosConfig from "./config/axios";
import tokenAuth from "./config/token";
import NavbarElement from "./components/comunes/Navbar";
import Login from "./components/comunes/Login";
import Registro from "./components/comunes/Registro";
import AltaApp from "./components/desarrollador/AltaApp";
import AltaCategoria from "./components/desarrollador/AltaCategoria";
import CatalogoApps from "./components/comunes/CatalogoApps";
import FormApps from "./components/desarrollador/FormApps";
import FormCategorias from './components/desarrollador/FormCategorias'
import Compra from "./components/usuario/Compra";
const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [respuesta, setRespuesta] = useState({});
  const [carritoLS, setCarritoLS] = useState(0);
  console.log(setCarritoLS);
  useEffect(() => {
    const uservalidation = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        tokenAuth(token);
        try {
          let res = await axiosConfig.get("/api/auth/uservalidation");
          setRespuesta(res.data);
        } catch (err) {
          console.log(err);
        }
      }
      setLoading(false);
    };
    uservalidation();
    let compras = JSON.parse(localStorage.getItem("compras"));
    if (compras !== null) {
      setCarritoLS(compras.length);
    }
  }, []);
  console.log(setCarritoLS);
  return (
    <div>
      {loading ? (
        <>
          <Row className="my-4 d-flex justify-content-center align-items-center">
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="info" />
          </Row>
        </>
      ) : (
        <Router>
          <NavbarElement
            carritoLS={carritoLS}
            setCarritoLS={setCarritoLS}
            respuesta={respuesta}
          />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/registro" component={Registro} />
            <RutaPrivada
              exact
              path="/me/comprar"
              respuesta={respuesta}
              component={Compra}
              carritoLS={carritoLS}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <CatalogoApps {...props} setCarritoLS={setCarritoLS} />
              )}
            />
            <RutaPrivadaDev
              exat
              path="/me/categoria/alta"
              respuesta={respuesta}
              component={AltaCategoria}
            />
            <RutaPrivadaDev
              exact
              path="/me/app/alta"
              respuesta={respuesta}
              component={AltaApp}
            />
            <RutaPrivadaDev
              exat
              path="/me/app/form"
              respuesta={respuesta}
              component={FormApps}
            />
             <RutaPrivadaDev
              exat
              path="/me/categoria/form"
              respuesta={respuesta}
              component={FormCategorias}
            />
          </Switch>
        </Router>
      )}
    </div>
  );
};

export default Routes;
