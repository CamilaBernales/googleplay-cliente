import React, { useState, useEffect } from "react";
import axiosConfig from "../../config/axios";
import { Container, Form, Button, Col, Row, Alert } from "react-bootstrap";
import Swal from "sweetalert2";

const Compra = ({ carritoLS }) => {
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario")) || []
  );
  const { nombre, email } = usuario;
  const [compra, setCompra] = useState({
    usuario: usuario,
    pedido: JSON.parse(localStorage.getItem("compras")),
    fecha_compra: "",
    total: 0,
  });

  const sumaTotal = () => {
    let compras = JSON.parse(localStorage.getItem("compras")) || [];
    let total = 0;
    for (let index = 0; index < compras.length; index++) {
      const element = compras[index];
      total += Number(element.precio);
    }
    setTotal(total);
  };
  useEffect(() => {
    sumaTotal();
  }, [carritoLS]);
  const onChangeDetalle = (e) => {
    setError(false);
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setCompra({
      ...compra,
      usuario: usuario,
      total: total,
      pedido: JSON.parse(localStorage.getItem("compras")),
      fecha_compra: Date.now(),
    });
  }, [total]);

  const crearCompra = () => {
    if (nombre.trim() !== "" && email.trim() !== "" && total !== 0) {
      axiosConfig
        .post("/api/compra/alta", compra)
        .then((res) => {
          console.log(res);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Tu compra fue exitosa",
            showConfirmButton: true,
            confirmButtonText: "Gracias!",
          });
        })
        .catch(() => {
          setError(true);
          setMsgError("Hubo un error.");
        });
    } else {
      setError(true);
      setMsgError(
        "Los campos deben estar completos y el total debe ser superior al 0."
      );
    }
  };
  return (
    <Container>
      {error ? (
        <Alert
          className="p-3 text-center text-uppercase font-weight-bold"
          variant="danger"
        >
          {msgError}
        </Alert>
      ) : null}
      <Row className="px-5 d-flex justify-content-center align-items-end ">
        <Col sm={12} md={8} xl={4}>
          <Form className="formulario">
            <h3 className="text-center my-5">Ingresa tus datos</h3>
            <Form.Group controlId="formName">
              <Form.Label className="d-flex justify-content-start">
                Nombre y Apellido:
              </Form.Label>
              <Form.Control
                className="formulariosMensaje rounded-left"
                type="text"
                placeholder="Ingrese su nombre y apellido"
                name="nombre"
                value={nombre}
                onChange={onChangeDetalle}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="d-flex justify-content-start">
                Email:
              </Form.Label>
              <Form.Control
                className="formulariosMensaje rounded-left"
                type="email"
                placeholder="Ingrese su email"
                name="email"
                value={email}
                onChange={onChangeDetalle}
              />
            </Form.Group>
            <div className="d-flex my-3 justify-content-center font-weight-bold">
              <h4 className="text-uppercase text-monospace my-4 text-lg-left">
                {" "}
                Total a pagar: {total}
              </h4>
            </div>
            <Row>
              <Col className="justify-content-between">
                <Button
                  variant="info"
                  className="text-white mt-3 btn btn-button w-100"
                  onClick={crearCompra}
                >
                  Comprar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Compra;
