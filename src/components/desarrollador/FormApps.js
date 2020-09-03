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

const FormApps = () => {
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const [editar, setEditar] = useState(false);
  const [appEditada, setAppEditada] = useState({});
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const obtenerApps = () => {
    axiosConfig
      .get(`/api/app/list?pagina=${currentPage}`)
      .then((res) => {
        setApps(res.data.aplicaciones.docs);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => {
        setError(true);
        setMsgError("Hubo un error.");
      });
  };
  const obtenerUnaApp = (id) => {
    axiosConfig
      .get(`/api/app/searchapp/${id}`)
      .then((res) => {
        console.log(res);
        setEditar(true);
        setAppEditada(res.data.app);
      })
      .catch(() => {
        setError(true);
      });
  };
  const onChangeApp = (e) => {
    setError(false);
    setAppEditada({
      ...appEditada,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeImagen = async (e) => {
    setError(false);
    if (e.target.files[0]) {
      if (e.target.files[0].size > 4194304) {
        setError(true);
        setMsgError("La imagen es demasiado grande.");
        e.target.value = null;
        setAppEditada({
          ...appEditada,
          imagen: null,
        });
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setAppEditada({
          ...appEditada,
          imagen: reader.result,
        });
      };
    } else {
      setAppEditada({
        ...appEditada,
        imagen: null,
      });
    }
  };
  const actualizarProducto = () => {
    if (
      appEditada.categoria !== "" &&
      appEditada.detalle !== "" &&
      appEditada.precio !== "" &&
      appEditada.imagen !== ""
    ) {
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
            .put(`/api/app/update/${appEditada._id}`, appEditada)
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
      setMsgError("Todos los campos deben ser completados.");
      return;
    }
  };

  // elimino la app
  const eliminarApp = (id) => {
    Swal.fire({
      title: "¿Estas seguro de que quieres elminar esta aplicacion ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.value) {
        axiosConfig
          .delete(`api/app/delete/${id}`)
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "La aplicacion fue eliminada con éxito.",
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
  const verMas = () =>
    totalPages > currentPage &&
    !error &&
    !loading && (
      <button
        className="btn btn-info"
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
      >
        Ver más
      </button>
    );
  const volver = () =>
    totalPages >= currentPage &&
    !error &&
    currentPage !== 1 &&
    !loading && (
      <button
        className="btn btn-info"
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
      >
        Volver
      </button>
    );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditar(false);
      obtenerApps();
    }, 2000);
    // eslint-disable-next-line
  }, [currentPage]);
  return (
    <>
      <Container className="mb-auto">
        <Row className="d-flex justify-content-center align-items-center">
          <h3 className="my-5">Listado de Apps</h3>
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
                      Detalle
                    </Form.Label>
                    <Form.Control
                      placeholder="Detalle"
                      name="detalle"
                      onChange={onChangeApp}
                      defaultValue={appEditada.detalle}
                      maxLength="200"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="my-3">
                    <Form.Label className=" d-flex justify-content-start">
                      Precio
                    </Form.Label>
                    <Form.Control
                      name="precio"
                      defaultValue={appEditada.precio}
                      onChange={onChangeApp}
                      type="number"
                      min="100"
                    />
                  </Col>
                </Row>
                <Row className="d-flex justify-content-around align-items-center m-auto ">
                  <Col sm={12} xs={6} md={6}>
                    <Image
                      fluid
                      className="img-fluid my-4"
                      src={appEditada.imagen}
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
                        onChange={onChangeImagen}
                        className="w-100"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              <Row className="d-flex justify-content-end align-items-end">
                <Button
                  className="btn btn-info"
                  onClick={actualizarProducto}
                  disabled={error === true}
                >
                  Guardar
                </Button>
              </Row>
            </Col>
          </Row>
        ) : null}
        {!loading && apps.length !== 0 ? (
          <Row className="d-flex justify-content-center align-items-center text-start my-5">
            <Col sm={12} md={8} lg={10}>
              <Table striped bordered hover responsive="sm">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Detalles de la app</th>
                    <th>Precio</th>
                    <th>Categoria</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((app) => {
                    return (
                      <tr key={app._id}>
                        <td>{app.nombre}</td>
                        <td>{app.detalle}</td>
                        <td>{app.precio}</td>
                        <td>{app.categoria}</td>
                        <td className="text-center">
                          <Button
                            className="btn btn-info"
                            onClick={() => obtenerUnaApp(app._id)}
                          >
                            <i className="fas fa-edit" />
                          </Button>
                        </td>
                        <td className="text-center">
                          <Button
                            className="btn btn-info"
                            onClick={() => eliminarApp(app._id)}
                          >
                            <i className="fas fa-trash" />
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
        <Row className="d-flex justify-content-center align-items-center">
          <div className="text-center my-4 mx-1">{volver()}</div>
          <div className="text-center my-4 mx-1">{verMas()}</div>
        </Row>
      </Container>
    </>
  );
};

export default FormApps;
