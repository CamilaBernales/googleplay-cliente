import React from "react";
import ListadoCompras from "./ListadoCompras";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Carrito = (props) => {
  const {
    modalShow,
    onHide,
    carritoLS,
    setCarritoLS,
    isLogin
  } = props;
  return (
    <Modal id="Carrito" show={modalShow} onHide={onHide}>
      <Modal.Header closeButton className="text-align-center">
        <Modal.Title className="text-align-center">
          Tu carrito de compras
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListadoCompras
          setCarritoLS={setCarritoLS}
          carritoLS={carritoLS}
        />{" "}
        {isLogin ? (
          <Link className="text-white" to="/me/comprar">
            <Button variant="info" className="w-100 text-center my-3">
              Iniciar compra
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button variant="info" className="w-100 text-center my-3">
              Iniciar compra
            </Button>
          </Link>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Carrito;
