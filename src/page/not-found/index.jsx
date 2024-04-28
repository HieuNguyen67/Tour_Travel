import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Container>
    <div className="not-found">
      <Row className="d-flex flex-column mt-5 pt-5">
        <Col className="col-12 ">
          <p className="text-center">
            {" "}
            <img
              src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
              alt="not-found"
              className="w-100"
            />
          </p>{" "}
        </Col>
        <Col>
          <p className="text-center">
            <Button variant="dark">
              <Link to="/" className="link-home text-decoration-none text-light">
                Go Home
              </Link>
            </Button>
          </p>
        </Col>
      </Row>
    </div>
  </Container>
);

export default NotFound;
