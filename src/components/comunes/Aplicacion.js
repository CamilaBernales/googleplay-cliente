import React, { Fragment } from "react";
import { Col, Card, Button, Alert, Row } from "react-bootstrap";
import ModalApp from "./ModalApp";
export default function Aplicacion(props) {
  const { aplicacion, setCarritoLS } = props;
  console.log(setCarritoLS);
  const { _id, nombre, precio, imagen } = aplicacion;
  const [modalShow, setModalShow] = React.useState(false);

  const onHide = () => {
    setModalShow(false);
  };

  return (
    <Fragment>
      <Col sm={12} md={6} xl={4} className="d-flex justify-content-center p-3 ">
        <Card
          key={_id}
          border="info"
          style={{
            width: "18rem",
          }}
          className="card-custom"
        >
          <Card.Img
            variant="top"
            className="img-fluid imagentienda"
            src={imagen}
          />
          <Card.Body>
            <Card.Title
              className=" my-3 d-flex justify-content-center"
              align="center"
            >
              {nombre}
            </Card.Title>
            <Row>
              <h6
                className=" m-auto my-3 d-flex justify-content-center"
                align="center"
              >
                ${precio}
              </h6>
            </Row>
            <Row>
              <Button
                renderas="button"
                onClick={() => setModalShow(true)}
                className="mx-4 boton-card-tienda flecha"
                size="sm"
              >
                Ver aplicación
              </Button>
            </Row>
          </Card.Body>
          <ModalApp
            aplicacion={aplicacion}
            modalShow={modalShow}
            setModalShow={setModalShow}
            onHide={onHide}
            setCarritoLS={setCarritoLS}
          />
        </Card>
      </Col>
    </Fragment>
  );
}
