import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carrito from "../usuario/Carrito";
const NavbarElement = ({ carritoLS, setCarritoLS, respuesta }) => {
  const [isLogin, setIsLogin] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [modalShow, setModalShow] = React.useState(false);
  const onHide = () => {
    setModalShow(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);
  const salir = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">GooglePlay-2</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto px-5">
            {!respuesta.isDeveloper ? (
              <Navbar.Brand onClick={() => setModalShow(true)}>
                {" "}
                <i className="fas fa-cart-plus fa-1x" />
                <span>{carritoLS}</span>
              </Navbar.Brand>
            ) : (
              <>
                <Nav.Link href="/me/app/alta">Alta Apps</Nav.Link>
                <Nav.Link href="/me/app/form">Listado Apps</Nav.Link>
                <Nav.Link href="/me/categoria/alta">Alta Categoria</Nav.Link>
                <Nav.Link href="/me/categoria/form">Listado Categoria</Nav.Link>


              </>
            )}

            {usuario ? (
              <NavDropdown
                title={usuario.nombre}
                id="basic-nav-dropdown"
                className="mx-5 font-weight-bold"
              >
                <NavDropdown.Item onClick={() => salir()}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login">
                <Button variant="primary">Sign In</Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Carrito
        modalShow={modalShow}
        setModalShow={setModalShow}
        onHide={onHide}
        setCarritoLS={setCarritoLS}
        carritoLS={carritoLS}
        isLogin={isLogin}
      />
    </div>
  );
};

export default NavbarElement;
