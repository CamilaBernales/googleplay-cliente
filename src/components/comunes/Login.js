import React, { Fragment, useState, useEffect } from "react";
import { Container, Form, Button, Col, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosConfig from "../../config/axios";

export default function Login() {
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = usuario;
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
    if (email.trim() === "" || password.trim() === "") {
      setError(true);
      setMsgError("Por favor llenar todos los campos");
      window.scrollTo(0, 200);
      return;
    }
    axiosConfig
      .post("/api/auth/login", usuario)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err)
        setError(true);
        setMsgError(err.response.data.msg);
        window.scrollTo(0, 200);
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
        <Row className="px-5 d-flex justify-content-center align-items-center ">
          {/* <Col sm={12} md={8} xl={6} className="col-12 mx-3 my-2">
           // <img src={imgLogin} className="img-fluid" alt="imagen login" />
          </Col> */}
          <Col sm={12} md={8} xl={4}>
            <div className="formulario">
              <Form onSubmit={onSubmitForm}>
                <h3 className="text-center ">LOGIN</h3>
                <Form.Group controlId="formEmail">
                  <Form.Label className=" d-flex justify-content-start">
                    Email:
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email"
                    className="formulariosMensaje rounded-left"
                    name="email"
                    value={email}
                    onChange={onChangeForm}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label className="d-flex justify-content-start">
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
                <Row>
                  <Col className="justify-content-center mb-3">
                    <Button
                      variant="info"
                      className="text-white btnauth  btn btn-button w-100"
                      type="submit"
                    >
                      Ingresar
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Link
                    className="justify-content-start p-2 text-info"
                    to={"/registro"}
                  >
                    No tienes una cuenta? Registrate!
                  </Link>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
