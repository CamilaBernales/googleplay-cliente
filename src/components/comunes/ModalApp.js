import React, { useState } from "react";
import { Modal, Col, Row, Button, Alert } from "react-bootstrap";

export default function ModalApp(props) {
  const { modalShow, aplicacion, setCarritoLS, onHide } = props;
  const [appRepetida, setAppRepetida] = useState(false);
  console.log(setCarritoLS);
  const guardarProducto = (aplicacion) => {
    const compras = JSON.parse(localStorage.getItem("compras")) || [];
    let buscada = compras.find((app) => app._id === aplicacion._id);
    if (buscada) {
      setAppRepetida(true);
    } else {
      compras.push(aplicacion);
      localStorage.setItem("compras", JSON.stringify(compras));
      window.alert("Producto agregado al carrito");
      setCarritoLS(compras.length);
    }
  };
  return (
    <Modal
      show={modalShow}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-color">
          {aplicacion.nombre}- ${aplicacion.precio}
        </Modal.Title>
      </Modal.Header>
      {appRepetida ? (
        <Alert variant="warning">
          Esta aplicaciónn ya se encuentra agregado a su carrito de compras. No
          puede volver a agregarlo
        </Alert>
      ) : null}
      <Modal.Body>
        <Row>
          <Col lg={6}>
            <img className="img-fluid" alt="alimento" src={aplicacion.imagen} />
          </Col>
          <Col lg={6}>
            <Row className="text-color px-3">
              <h6>Detalles de la aplicacion</h6>
            </Row>
            <Row className="text-color px-3">
              <p>{aplicacion.detalle}</p>
            </Row>
          </Col>
        </Row>
        <Row className="d-flex justify-content-end my-4 mx-2">
          <Button
            disabled={appRepetida == true}
            onClick={() => guardarProducto(aplicacion)}
            className="btn btn-info"
          >
            Añadir al carrito
          </Button>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} className="btn btn-info">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
