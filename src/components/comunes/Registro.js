import React, { Fragment, useState, useEffect } from "react";
import { Container, Form, Button, Col, Row, Alert } from "react-bootstrap";
import axiosConfig from "../../config/axios";

export default function Registro() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const { nombre, email, password } = usuario;
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const onChangeForm = (e) => {
    setError(false);
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      passwordConfirm.trim() === ""
    ) {
      setError(true);
      setMsgError("Los campos deben estar completos.");
      return;
    } else if (password !== passwordConfirm) {
      setError(true);
      setMsgError("Las contraseñas ingresadas no coinciden");
      return;
    }
    axiosConfig
      .post("/api/usuario/signup", usuario)
      .then(() => {
        window.location.href = "/login";
      })
      .catch(() => {
        setError(true);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 200);
  }, []);
  return (
    <Fragment>
      <Container className="my-5 py-3">
        {error ? (
          <Alert
            className="p-3 text-center text-uppercase font-weight-bold"
            variant="danger"
          >
            {msgError}
          </Alert>
        ) : null}
        <Row className="px-5 d-flex text-left justify-content-center align-items-end ">
          <Col sm={12} md={8} xl={4}>
            <Form className="formulario" onSubmit={onSubmitForm}>
              <h3 className="text-center my-3">Crear una cuenta</h3>
              <Form.Group controlId="formName">
                <Form.Label>
                  Nombre y Apellido:
                </Form.Label>
                <Form.Control
                  className="formulariosMensaje rounded-left"
                  type="text"
                  placeholder="Ingrese su nombre y apellido"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeForm}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>
                  Email:
                </Form.Label>
                <Form.Control
                  className="formulariosMensaje rounded-left"
                  type="email"
                  placeholder="Ingrese su email"
                  name="email"
                  value={email}
                  onChange={onChangeForm}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>
                  Contraseña:
                </Form.Label>
                <Form.Control
                  className="formulariosMensaje rounded-left"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  name="password"
                  value={password}
                  onChange={onChangeForm}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>
                  Confirmar contraseña:
                </Form.Label>
                <Form.Control
                  className="formulariosMensaje rounded-left"
                  type="password"
                  placeholder="Ingrese su contraseña nuevamente"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </Form.Group>

              <Row>
                <Col className="justify-content-between">
                  <Button
                    variant="info"
                    className="text-white mt-3 btn btn-button w-100"
                    type="submit"
                  >
                    Enviar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
