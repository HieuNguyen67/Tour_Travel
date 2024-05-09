import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.scss";
import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Logo from "../../../assets/image/tải_xuống-removebg-preview.png";
import defaultImage from "../../../assets/image/6945124.png"; 
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ScrollIndicator from "../../ScrollIndicator";
import { motion } from "framer-motion";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../../../context";
import { BASE_URL, HEADER } from "../../../constants/common";
import DisplayImage from "../../up-images/load-image";
import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";

const Header = (props) => {
  const { isLoggedIn, logout, username, role } = useAuth();

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
  const isHomePage = location.pathname === "/";
 const { accountId } = useAuth();

 const [imageSrc, setImageSrc] = useState("");
 const [error, setError] = useState("");

 useEffect(() => {
   const fetchImage = async () => {
     try {
       const response = await axios.get(
         `${BASE_URL}/account/image/${accountId}`,
         {
           responseType: "blob",
         }
       );
       const imageURL = URL.createObjectURL(response.data);
       setImageSrc(imageURL);
     } catch (error) {
       console.error("Lỗi khi lấy hình ảnh:", error);
       setImageSrc(defaultImage);
     }
   };

   fetchImage();
 }, [accountId]);
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
          <Container className="my-2">
            <NavLink className=" decorate">
              <Navbar.Brand>
                <img
                  alt=""
                  src={Logo}
                  className="d-inline-block justify-content-center  align-items-center logoo mb-2"
                />{" "}
                <span>
                  {role == 2 ? (
                    <Link
                      to="/admin/list-customer"
                      className="text-decoration-none text-dark fw-bold fs-3"
                    >
                      ADMIN
                    </Link>
                  ) : role == 3 ? (
                    <Link
                      to="/business/list-tour"
                      className="text-decoration-none  text-dark fw-bold fs-3"
                    >
                      DOANH NGHIỆP
                    </Link>
                  ) : role == 4 ? (
                    <Link
                      to="guide/tour-assigned"
                      className="text-decoration-none text-dark fw-bold fs-3"
                    >
                      HƯỚNG DẪN VIÊN
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/"
                        className={
                          isHomePage
                            ? "text-light  fs-3 fw-bold font-family text-decoration-none"
                            : "text-dark  fs-3 fw-bold font-family text-decoration-none"
                        }
                      >
                        Travel
                      </Link>
                    </>
                  )}
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
                    {role == 2 || role == 3 || role == 4 ? (
                      <>{""}</>
                    ) : (
                      <>
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
                                  borderBottom: isActive
                                    ? "3px solid #f3c324"
                                    : "",
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
                      </>
                    )}
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
                              <div className="d-flex">
                                {" "}
                                <img
                                  src={imageSrc || defaultImage} 
                                  alt="Hình ảnh của tài khoản"
                                  className="sizeimggg rounded-circle me-2 shadow"
                                />{" "}
                               
                              </div>
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
