import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.scss";
import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Logo from "@/assets/image/tải_xuống-removebg-preview.png";
import defaultImage from "@/assets/image/6945124.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BASE_URL, HEADER } from "@/constants";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context";
import ScrollIndicator from "@/components/ScrollIndicator";

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
        if (isLoggedIn) {
          const response = await axios.get(
            `${BASE_URL}/account/image/${accountId}`,
            {
              responseType: "blob",
            }
          );
          const imageURL = URL.createObjectURL(response.data);
          setImageSrc(imageURL);
        }
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
            <div className=" decorate">
              <Navbar.Brand>
                <span>
                  {role != 2 &&
                  role != 3 &&
                  role != 4 &&
                  role != 5 &&
                  role != 6 ? (
                    <>
                      <img
                        alt=""
                        src={Logo}
                        className="d-inline-block justify-content-center  align-items-center logoo mb-2"
                      />
                      <Link
                        to="/"
                        className="text-dark  fs-3 fw-bold   text-decoration-none"
                      
                      >
                        Travel
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                </span>
              </Navbar.Brand>
            </div>
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
                    {role == 2 ||
                    role == 3 ||
                    role == 4 ||
                    role == 5 ||
                    role == 6 ? (
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
                                className="text-dark"
                              >
                                {item.name}
                              </span>
                            </NavLink>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </Nav>
                  <div className=" mt-5 mt-lg-0 pt-5 pt-lg-0">
                    <div className="d-flex flex-grow mx-1 mt-5 mt-lg-0 pt-5 pt-lg-0">
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
                              <div>
                                {" "}
                                <img
                                  src={imageSrc || defaultImage}
                                  alt="Hình ảnh của tài khoản"
                                  className="sizeimggg rounded-circle shadow me-2"
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
                              <span>Login</span>
                            </Button>{" "}
                          </NavLink>

                          <NavLink className="sidebar decorate " to="/signup">
                            <Button className="shadow" variant="secondary">
                              <span>SignUp</span>
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
