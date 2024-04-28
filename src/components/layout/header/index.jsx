import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.scss";
import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Logo from "../../../assets/image/tải_xuống-removebg-preview.png";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ScrollIndicator from "../../ScrollIndicator";
import { motion } from "framer-motion";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../../../context";
import { HEADER } from "../../../constants/common";
const Header = (props) => {
  const { isLoggedIn, logout, username } = useAuth();

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  const navigate = useNavigate();

  
 const location = useLocation();
 const isHomePage =
   location.pathname === "/";
   
  return (
    <>
      {" "}
      <div>
        {" "}
        <ScrollIndicator />
        <Navbar
          expand="lg"
          className={colorChange ? "navbar colorChange" : "navbar "}
          fixed="top"
        >
          {" "}
          {/* #f8f9fa */}
          <Container className="my-2">
            <NavLink to="/" className=" decorate">
              <Navbar.Brand to="/">
                <img
                  alt=""
                  src={Logo}
                  width="60"
                  height="60"
                  className="d-inline-block justify-content-center  align-items-center mb-2"
                />{" "}
                <span
                  className={
                    isHomePage
                      ? "white  fs-3 fw-bold font-family"
                      : "black  fs-3 fw-bold font-family"
                  }
                >
                  Travel Tour
                </span>
              </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Navbar.Offcanvas placement="end" className="offcanvas-size-sm">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title className="text-light">
                    Travel Tour
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex justify-content-center  align-items-center sidebar">
                  <Nav className="d-flex   align-items-center align-items-center  mx-auto  ">
                    {HEADER.map((item) => (
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        key={item.id}
                      >
                        <NavLink
                          className="nav-link "
                          to={item.link}
                          style={({ isActive }) => {
                            return {
                              fontWeight: isActive ? "bold" : "",
                              borderBottom: isActive ? "3px solid #f3c324" : "",
                            };
                          }}
                        >
                          {" "}
                          <span
                            className={
                              isHomePage
                                ? "white font-family"
                                : "black font-family"
                            }
                          >
                            {item.name}
                          </span>
                        </NavLink>
                      </motion.div>
                    ))}

                  </Nav>
                  <div className=" mt-5 mt-md-0 pt-5 pt-md-0">
                    <div className="d-flex flex-grow mx-1 mt-5 mt-md-0 pt-5 pt-md-0">
                      {isLoggedIn ? (
                        <>
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            {" "}
                            <NavLink
                             to="/information/profile"
                              style={{ cursor: "pointer" }}
                              className="text-decoration-none"
                            >
                            <h5
                           
                              className={
                                isHomePage
                                  ? "white font-family  me-3 mt-1"
                                  : "black font-family  me-3 mt-1"
                              }
                            >
                              Hi, {username}
                            </h5>{" "}
                            </NavLink>
                          </motion.div>
                          <Button
                            className="mx-2 shadow"
                            variant="warning"
                            onClick={logout}
                          >
                            Logout
                          </Button>{" "}
                        </>
                      ) : (
                        <div>
                          <NavLink to="/login" className="sidebar decorate">
                            <Button
                              className="mx-lg-2 mb-lg-0 mb-2 shadow"
                              variant="warning"
                            >
                              <span className="font-family">Login</span>
                            </Button>{" "}
                          </NavLink>

                          <NavLink className="sidebar decorate " to="/signup">
                            <Button className="shadow" variant="secondary">
                              <span className="font-family">SignUp</span>
                            </Button>{" "}
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </div>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};
export default Header;
