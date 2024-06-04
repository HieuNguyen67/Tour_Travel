import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { IoLogInSharp, IoChevronBackSharp } from "react-icons/io5";
import "./Login.scss";
import {
  MdAccountBox,
  MdOutlinePassword,
  MdReportProblem,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Header from "@/components/layout/header";
import { BASE_URL } from "@/constants";
import { useAuth } from "@/context";
import {
  FormControl,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import profile1img from "@/assets/image/profile1.png";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClose = () => setShow(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        usernameOrEmail,
        password,
      });
      const { token, role, account_id, username, business_id, customer_id } =
        response.data;
      login(token, role, username, account_id, business_id, customer_id);
      toast.success("Đăng nhập thành công !");
      if (role === 1) navigate("/");
      else if (role === 2) navigate("/admin/list-customer");
      else if (role === 3) navigate("/business/home");
    } catch (error: any) {
      toast.error("Đăng nhập thất bại !");
      console.error("Đăng nhập không thành công:", error.response.data.message);
      setError(error.response.data.message);
      setShow(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 98 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Container className="mt-5 mx-auto pt-lg-5 pt-3 ">
          <div className="mt-5">
            <h1 className="text-center fw-bold ">
              <img
                src={profile1img}
                className="mb-2"
                style={{
                  width: "4rem",
                  height: "4rem",
                  objectFit: "cover",
                }}
              />{" "}
              ĐĂNG NHẬP
            </h1>
          </div>
        </Container>
        <br />
        <Container className="mb-5 pb-md-5 ">
          <div className="col-lg-4 mt-3 col-12 mx-auto px-2 px-lg-0">
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label className=" ">
                  <CgProfile className="fs-4" /> Username or Email
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username or Email"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Label className=" ">
                <MdOutlinePassword className="fs-4" /> Password{" "}
                <span className="text-danger">*</span>
              </Form.Label>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  size="small"
                  placeholder="Password"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  sx={{ background: "white" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleShowPassword} edge="end">
                        {showPassword ? (
                          <MdOutlineVisibilityOff />
                        ) : (
                          <MdOutlineVisibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button variant="warning" type="submit" className="col-12 mt-4  ">
                <span className=" ">
                  Đăng Nhập <IoLogInSharp className="fs-4" />
                </span>
              </Button>
            </Form>
          </div>
          <br />
          <div>
            <Row>
              <Col></Col>
              <Col className="col-12">
                <h6 className="text-center text-break  ">
                  <NavLink to="/" className=" link-dark text-danger decorate  ">
                    <IoChevronBackSharp style={{ fontSize: 20 }} />
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
                  <h6 className="text-secondary  text-center text-break fw-bold  ">
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
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                <MdReportProblem className="fs-1 text-danger" />
                <span>&nbsp;Thông báo</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{error && <p className="fs-5">{error}</p>}</Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleClose}>
                Đóng
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </motion.div>
    </>
  );
};

export default Login;
