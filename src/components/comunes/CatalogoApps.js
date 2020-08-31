import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Container,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import Aplicacion from "./Aplicacion";
import axiosConfig from "../../config/axios";

const CatalogoApps = (props) => {
  const { setCarritoLS } = props;
  console.log(setCarritoLS);
  const [aplicaciones, setApps] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtrar, setFiltrar] = useState(false);
  const [filtrarNombre, setFiltrarNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 200);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      obtenerApps();
      obtenerCategorias();
    }, 2000);
    // eslint-disable-next-line
  }, [currentPage]);

  const onChangeFiltroNombre = (e) => {
    setFiltrarNombre(e.target.value);
  };
  const onChangeFiltroCategoria = (e) => {
    setFiltroCategoria(e.target.value);
  };

  const obtenerCategorias = () => {
    axiosConfig
      .get("/api/categoria/list")
      .then((res) => setCategorias(res.data.categorias))
      .catch((err) => {
        console.log(err.reponse);
        setError(true);
        setErrorMsg("Hubo un error.");
      });
  };

  const obtenerApps = () => {
    axiosConfig
      .get(`/api/app/list?pagina=${currentPage}`)
      .then((res) => {
        console.log(res);
        setApps(res.data.aplicaciones.docs);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => {
        setError(true);
        setErrorMsg("Hubo un error.");
      });
  };
  const filtrarApps = (e) => {
    e.preventDefault();
    setFiltrar(true);
    if (
      (filtrarNombre === "" && filtroCategoria !== "") ||
      (filtrarNombre !== "" && filtroCategoria === "") ||
      (filtrarNombre !== "" && filtroCategoria !== "")
    ) {
      axiosConfig
        .get(
          `/api/app/filtro?nombre=${filtrarNombre}&&categoria=${filtroCategoria}`
        )
        .then((res) => {
          console.log(res);
          setApps(res.data);
        })
        .catch((e) => {
          console.log(e);
          setError(true);
          setErrorMsg("Hubo un error.");
        });
    } else {
      obtenerApps();
      setCurrentPage(1);
    }
  };
  const verMas = () =>
    totalPages > currentPage &&
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

  return (
    <div>
      <Fragment>
        <Container className="my-5 py-3">
          <Row className="px-5 my-3 d-flex justify-content-center align-items-center ">
            {error ? (
              <Alert variant="danger">
                <h6>{errorMsg}</h6>
              </Alert>
            ) : null}
          </Row>
          <Form onSubmit={filtrarApps}>
            <Row className="d-flex ml-3 justify-content-around align-items-center">
              <Col sm={12} md={6} xl={4} lg={6} className="my-2">
                <Form.Group>
                  <Form.Control
                    onChange={onChangeFiltroNombre}
                    type="search"
                    placeholder="Nombre de aplicación"
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6} xl={4} lg={6} className="my-2">
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Control
                    as="select"
                    name="categoria"
                    className="w-100"
                    onChange={onChangeFiltroCategoria}
                    custom
                  >
                    <option value="">Todos</option>
                    {categorias.map((categoria) => (
                      <option value={categoria._id}>{categoria.titulo}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col sm={12} md={4} className="mt-2 mb-4 d-flex">
                <Button onClick={filtrarApps} className="btn-info">
                  Buscar
                </Button>
              </Col>
            </Row>
          </Form>
          <Row className="mt-4 mb-4 d-flex justify-content-center align-items-center">
            {loading ? (
              <>
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="info" />
              </>
            ) : null}
          </Row>
          <Row className="col-12 m-auto">
            {aplicaciones.length === 0 && !loading && filtrar ? (
              <Row className="m-auto my-4">
                <Alert className="text-center" variant="warning">
                  <h6>
                    {" "}
                    No hay resultados para mostrate{" "}
                    <span role="img" aria-label="cara triste">
                      &#128546;
                    </span>{" "}
                  </h6>
                </Alert>
              </Row>
            ) : (
              <>
                {aplicaciones.map((aplicacion) => (
                  <Aplicacion
                    key={aplicacion._id}
                    aplicacion={aplicacion}
                    setCarritoLS={setCarritoLS}
                  />
                ))}
              </>
            )}
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <div className="text-center my-4 mx-1">{volver()}</div>
            <div className="text-center my-4 mx-1">{verMas()}</div>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
};

export default CatalogoApps;
