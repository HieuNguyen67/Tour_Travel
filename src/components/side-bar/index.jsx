import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "./side-bar.scss";
import { ADMIN, BUSINESS, GUIDE } from "../../constants/common";
import { useAuth } from "../../context";

const SidebarLayout = ({ children }) => {
  const { role } = useAuth();
  const location = useLocation();

  const isHomePage =
    location.pathname === "/admin/list-customer" ||
    location.pathname === "/admin/list-business" ||
    location.pathname === "/admin/news" ||
    location.pathname === "/admin/contact" ||
    location.pathname === "/business/list-tour" ||
    location.pathname === "/business/list-news" ||
    location.pathname === "/business/order-tour";

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
        {isHomePage ? (
          <>
            {" "}
            <Col className=" col-lg-12 col-12">
              <Nav fill className=" sidebarrr">
                {role == 2 && renderNavItems(ADMIN)}
                {role == 3 && renderNavItems(BUSINESS)}
              </Nav>
            </Col>
          </>
        ) : (
          <></>
        )}
        <Col className="col-lg-12 col-12 mt-3">
          <div className="col-12">{children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default SidebarLayout;
