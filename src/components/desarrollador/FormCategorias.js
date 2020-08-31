import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Col,
  Row,
  Button,
  Alert,
  Table,
  Image,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";
import axiosConfig from "../../config/axios";

const FormCategorias = () => {
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [editar, setEditar] = useState(false);
  const [categoriaEditada, setCategoriaEditada] = useState({});
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState("");

  const obtenercategorias = () => {
    axiosConfig
      .get("/api/categoria/list")
      .then((res) => {
        setCategorias(res.data.categorias);
      })
      .catch(() => {
        setError(true);
        setMsgError("Hubo un error.");
      });
  };
  const obtenerUnaCategoria = (id) => {
    axiosConfig
      .get(`/api/categoria/search/${id}`)
      .then((res) => {
        setEditar(true);
        setCategoriaEditada(res.data.categoria);
      })
      .catch(() => {
        setError(true);
      });
  };
  const onChangeCategoria = (e) => {
    setError(false);
    setCategoriaEditada({
        ...categoriaEditada,
      [e.target.name]: e.target.value,
    });
  };

  const acutualizarCategoria = () => {
    if (categoriaEditada.titulo !== "") {
      Swal.fire({
        title: "Estas seguro de que quieres guardar esta edición?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, editar!",
      }).then((result) => {
        if (result.value) {
          axiosConfig
            .put(`/api/categoria/update/${categoriaEditada._id}`, categoriaEditada)
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Aplicacion actualizada con éxito.",
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
              return;
            });
        }
      });
    } else {
      setError(true);
      setMsgError("El campo no debe estar vacio.");
      return;
    }
  };

  const eliminarApp = (id) => {
    Swal.fire({
      title: "¿Estas seguro de que quieres elminar esta categoria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.value) {
        axiosConfig
          .delete(`api/categoria/delete/${id}`)
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "La categoria fue eliminada con éxito.",
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
            return;
          });
      }
    });
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditar(false);
      obtenercategorias();
    }, 2000);
  }, []);
  return (
    <>
      <Container className="mb-auto">
        <Row className="d-flex justify-content-center align-items-center">
          <h3 className="my-5">Listado de categorias</h3>
        </Row>
        {loading && !error ? (
          <Row className="my-4 d-flex justify-content-center align-items-center">
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="info" />
          </Row>
        ) : null}
        {error ? (
          <Row className="mt-4 mb-4 my-4 d-flex justify-content-center align-items-center">
            <Alert className="text-center" variant="danger">
              <h6> {msgError} </h6>
            </Alert>
          </Row>
        ) : null}
        {editar && !loading ? (
          <Row className="d-flex justify-content-center align-items-center text-start my-5">
            <Col sm={12} md={8} xl={6}>
              <Form>
                <Row>
                  <Col className="my-3">
                    <Form.Label className=" d-flex justify-content-start">
                      Titulo
                    </Form.Label>
                    <Form.Control
                      placeholder="Titulo"
                      name="titulo"
                      onChange={onChangeCategoria}
                      defaultValue={categoriaEditada.titulo}
                      maxLength="200"
                    />
                  </Col>
                </Row>
              </Form>
              <Row className="d-flex justify-content-end align-items-end">
                <Button onClick={acutualizarCategoria} disabled={error === true}>
                  Guardar
                </Button>
              </Row>
            </Col>
          </Row>
        ) : null}
        {!loading && categorias.length !== 0 ? (
          <Row className="d-flex justify-content-center align-items-center text-start my-5">
            <Col sm={12} md={8} lg={10}>
              <Table striped bordered hover responsive="sm">
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((categoria) => {
                    return (
                      <tr key={categoria._id}>
                        <td>{categoria.titulo}</td>
                        <td className="text-center">
                          <Button className="btn-info" onClick={() => obtenerUnaCategoria(categoria._id)}>
                            <i className="fas fa-edit " />
                          </Button>
                        </td>
                        <td className="text-center">
                          <Button className="btn-info" onClick={() => eliminarApp(categoria._id)}>
                            <i className="fas fa-trash " />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : null}
      </Container>
    </>
  );
};

export default FormCategorias;
