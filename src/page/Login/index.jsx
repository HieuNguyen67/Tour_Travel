import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {  toast } from "react-toastify";
import { motion, useAnimation } from "framer-motion";
import { IoLogInSharp } from "react-icons/io5";
import { IoChevronBackSharp } from "react-icons/io5";
import "./Login.scss";
const Login = () => {
    const navigate = useNavigate();
  const { login } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 const { isLoggedIn } = useAuth();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5020/v1/api/admin/login",
        { usernameOrEmail, password }
      );
      const { token, role, account_id ,username} = response.data;
      console.log(username);
      login(token, role, username, account_id);
      toast.success("Đăng nhập thành công !");
      navigate("/");
    } catch (error) {
            toast.error("Đăng nhập thất bại !");

      console.error("Đăng nhập không thành công:", error.response.data.message);
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
 


  return (
    <>
      
      <motion.div
        initial={{ opacity: 0, y: 98 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Container className="mt-5 mx-auto pt-lg-5 pt-3 ">
          <div className="mt-5">
            <Row>
              <Col></Col>
              <Col className="col-10 ">
                <h1 className="text-center text-break fw-bold font-family">
                  ĐĂNG NHẬP
                </h1>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </Container>
        <br />
        <Container className="mb-5 pb-md-5 ">
          <div className="col-md-4 mt-3 col-12 mx-auto " noValidate>
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font-family">
                  Username or Email<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username or Email"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="font-family">
                  Password <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button
                variant="warning"
                type="submit"
                className="col-12 mt-4 font-family"
              >
                <span className="font-family">
                  Đăng Nhập <IoLogInSharp />
                </span>
              </Button>
            </form>
          </div>

          <br />
          <div>
            <Row>
              <Col></Col>
              <Col className="col-12">
                <h6 className="text-center text-break  ">
                  <NavLink
                    to="/"
                    className=" link-dark text-danger decorate font-family"
                  >
                    <IoChevronBackSharp sx={{ fontSize: 20 }} />
                    Go back
                  </NavLink>
                </h6>
              </Col>
              <Col></Col>
            </Row>
          </div>
          <hr></hr>
          <div>
            <Row>
              <Col></Col>
              <Col className="col-12 col-md-12 mt-3">
                <Col>
                  <h6 className="text-secondary  text-center text-break fw-bold font-family">
                    Bạn không có tài khoản?
                    <NavLink
                      to="/SignUp"
                      className=" link-dark text-danger decorate "
                    >
                      {" "}
                      Đăng ký
                    </NavLink>
                  </h6>
                </Col>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </Container>
      </motion.div>
    </>
  );
};
export default Login;
