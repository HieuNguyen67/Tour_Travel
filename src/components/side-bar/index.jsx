import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./side-bar.scss";
import { ADMIN, BUSINESS, GUIDE } from "../../constants/common";
import { useAuth } from "../../context";

const SidebarLayout = ({ children }) => {
  const { role } = useAuth();

  const renderNavItems = (items) => {
    return items.map((item) => (
      <Nav.Item key={item.id}>
        <NavLink
          className="nav-link"
          to={item.link}
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "",
            borderBottom: isActive ? "3px solid #f3c324" : "",
            background: isActive ? "#ffc107" : "",
          })}
        >
          <span className="text-dark">{item.name}</span>
        </NavLink>
      </Nav.Item>
    ));
  };

  return (
    <Container className="my-5 pt-5">
      <Row className="mt-lg-3">
        <Col className="col-lg-3 col-12">
          <Nav fill className="flex-lg-column sidebarrr">
            {role == 2 && renderNavItems(ADMIN)}
            {role == 3 && renderNavItems(BUSINESS)}
            {role == 4 && renderNavItems(GUIDE)}
          </Nav>
        </Col>
        <Col className="col-9">{children}</Col>
      </Row>
    </Container>
  );
};

export default SidebarLayout;
