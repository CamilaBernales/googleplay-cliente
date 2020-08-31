import React, { useState } from "react";
import { Container, Form, Col, Row, Button, Alert } from "react-bootstrap";
import axiosConfig from "../../config/axios";
import Swal from "sweetalert2";
const AltaCategoria = () => {
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState({ titulo: "" });

  const onChangeCategoria = (e) => {
    setError(false);
    setNuevaCategoria({ [e.target.name]: e.target.value });
  };
  const guardarCategoria = () => {
    if (nuevaCategoria.titulo !== "") {
      axiosConfig
        .post("/api/categoria/alta", nuevaCategoria)
        .then(() =>
          Swal.fire({
            position: "center",
            icon: "success",
            title: "La categoria fue creada con éxito.",
            showConfirmButton: false,
            timer: 1500,
          })
        )
        .catch(() => {
          setError(true);
          setMsgError("Hubo un error.");
        });
    } else {
      setError(true);
      setMsgError("El campo no puede estar vacío");
    }
  };
  return (
    <div>
      <Container className="my-5">
        <Row className="d-flex justify-content-center align-items-center">
          <h3 className="h3-admin">Carga una nueva categoria</h3>
        </Row>
        <Row className="d-flex justify-content-center align-items-center">
          <Col sm={12} md={8} xl={6}>
            {error ? (
              <Row className="mt-4 mb-4 my-4 d-flex justify-content-center align-items-center">
                <Alert className="text-center" variant="danger">
                  <h6> {msgError} </h6>
                </Alert>
              </Row>
            ) : null}
            <Form onSubmit={guardarCategoria}>
              <Row>
                <Col className="my-3">
                  <Form.Label>Nombre Categoria:</Form.Label>
                  <Form.Control
                    required
                    placeholder="Categoria"
                    name="titulo"
                    type="text"
                    onChange={onChangeCategoria}
                    maxLength="200"
                  />
                </Col>
              </Row>
            </Form>
            <Button
              onClick={guardarCategoria}
              disabled={error === true}
              className="w-100 btn-info"
            >
              Guardar
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AltaCategoria;
