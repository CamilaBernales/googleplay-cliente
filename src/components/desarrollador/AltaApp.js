import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Col,
  Row,
  Button,
  Alert,
  Image,
} from "react-bootstrap";
import Swal from "sweetalert2";
import axiosConfig from "../../config/axios";

function AltaApp() {
  const [nuevaApp, setNuevaApp] = useState({
    nombre: "",
    detalle: "",
    precio: "",
    imagen: "",
    categoria: "",
  });
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = () => {
    axiosConfig
      .get("/api/categoria/list")
      .then((res) => setCategorias(res.data.categorias))
      .catch(() => {
        setError(true);
        setMsgError("Hubo un error.");
      });
  };
  const onChangeApp = (e) => {
    setError(false);
    setNuevaApp({
      ...nuevaApp,
      [e.target.name]: e.target.value,
    });
  };
  const guardarApp = () => {
    if (
      nuevaApp.nombre.trim() !== "" &&
      nuevaApp.detalle.trim() !== "" &&
      nuevaApp.precio !== null &&
      nuevaApp.imagen !== null &&
      nuevaApp.categoria.trim() !== ""
    ) {
      axiosConfig
        .post("/api/app/alta", nuevaApp)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "La aplicacióon fue creada con éxito.",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        })
        .catch((err) => {
          setError(true);
          setMsgError(err.response.data.msg);
        });
    } else {
      window.scrollTo(0, 200);
      setError(true);
      setMsgError("Los campos deben estar completos.");
    }
  };
  const onChangeImagenApp = async (e) => {
    setError(false);
    if (e.target.files[0]) {
      if (e.target.files[0].size > 4194304) {
        // 5242880 = 5MB
        // 4194304 = 4MB
        setError(true);
        setMsgError("La imágen es demasiado grande.");
        window.scrollTo(0, 200);

        e.target.value = null;
        setNuevaApp({
          ...nuevaApp,
          imagen: null,
        });

        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setNuevaApp({
          ...nuevaApp,
          imagen: reader.result,
        });
      };
    } else {
      setNuevaApp({
        ...nuevaApp,
        imagen: null,
      });
    }
  };

  return (
    <div>
      <Container className="my-5">
        <Row className=" d-flex justify-content-center align-items-center">
          <h3 className="h3-admin">Carga un nueva app</h3>
        </Row>
        <Row className="d-flex text-left justify-content-center align-items-center">
          <Col sm={12} md={8} xl={6}>
            {error ? (
              <Alert
                className="p-3 text-center w-100 text-uppercase font-weight-bold my-3"
                variant="danger"
              >
                {msgError}
              </Alert>
            ) : null}
            <Form onSubmit={guardarApp}>
              <Row>
                <Col className="my-3">
                  <Form.Label>Titulo de la aplicacion</Form.Label>
                  <Form.Control
                    required
                    placeholder="Titulo de la aplicacion"
                    name="nombre"
                    maxLength="40"
                    type="text"
                    onChange={onChangeApp}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="my-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    required
                    placeholder="Detalle"
                    name="detalle"
                    type="text"
                    onChange={onChangeApp}
                    maxLength="200"
                  />
                </Col>
              </Row>
              <Row>
                <Col className="my-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    required
                    placeholder="Precio"
                    name="precio"
                    type="number"
                    onChange={onChangeApp}
                    min="100"
                    defaultValue={nuevaApp.precio}
                  />
                </Col>
              </Row>
              <Row className="d-flex justify-content-around align-items-center m-auto ">
                <Col sm={12} xs={6} md={6}>
                  <Image
                    fluid
                    className="img-fluid my-4"
                    src={nuevaApp.imagen}
                    thumbnail
                  />
                </Col>
              </Row>
              <Row>
                <Col className="my-3">
                  <Form.Group controlId="imagen">
                    <Form.Label>Imagen</Form.Label>
                    <Form.File
                      id="imagen"
                      name="imagen"
                      accept="image/*"
                      onChange={onChangeImagenApp}
                      className="w-100"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="my-3">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Group>
                    <Form.Control
                      as="select"
                      name="categoria"
                      className="w-100"
                      custom
                      onChange={onChangeApp}
                    >
                      {
                        categorias.map((categoria) => (
                        <option value={categoria._id}>{categoria.titulo}</option>
                        ))
                      }
                     
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Button
              onClick={guardarApp}
              disabled={error === true}
              className="w-100 btn btn-info"
            >
              Guardar
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AltaApp;
