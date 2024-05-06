import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IoChevronBackSharp } from "react-icons/io5";
import { motion, useAnimation } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogInSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useAuth } from "../../../context";
import Header from "../../../components/layout/header";

const SignUp = () => {
      const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    birth_of_date: "",
    phone_number: "",
    address: "",
    email: "",
  });
 const { isLoggedIn } = useAuth();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5020/v1/api/admin/register", formData);
      toast.success("Đăng ký thành công !");
      navigate("/confirm");
    } catch (error) {
      if (error.response && error.response.status === 400) {
         toast.error("Tên đăng nhập hoặc email đã tồn tại.");
        setError("Tên đăng nhập hoặc email đã tồn tại.");
        
      } else {
        console.error("Đăng ký không thành công:", error);
        toast.error("Đăng ký không thành công. Vui lòng thử lại sau.");
      
      }
    }
  };
  useEffect(() => {
    if (isLoggedIn === true) {
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
        <Container className="mt-5 mx-auto  pt-lg-5 pt-3">
          <div className="mt-5">
            <Row>
              <Col></Col>
              <Col className="col-10 ">
                <h1 className="text-center text-break fw-bold font-family">
                  ĐĂNG KÝ
                </h1>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </Container>
        <br />
        <Container className="mb-5 pb-md-5">
          <form
            className="col-md-4 mt-3 col-12 mx-auto"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="font-family">
                Họ và tên <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Họ tên"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="font-family">
                UserName <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                required
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="font-family">
                Password <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="font-family">
                Email <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="font-family">
                Ngày sinh <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Ngày sinh"
                required
                name="birth_of_date"
                max="2008-12-31"
                value={formData.birth_of_date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="font-family">
                Số điện thoại (Nhập đủ 10 số)
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Số điện thoại"
                required
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="font-family">
                Địa chỉ <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Địa chỉ"
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button variant="warning" className="col-12 mt-4" type="submit">
              <span className="font-family">
                Đăng Ký <IoLogInSharp />
              </span>
            </Button>
          </form>
          <br />
          <div>
            <Row>
              <Col></Col>
              <Col className="col-12">
                <h6 className="text-center text-break font-family ">
                  <NavLink to="/" className=" link-dark text-danger decorate ">
                    <IoChevronBackSharp />
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
                    Bạn đã có tài khoản?
                    <NavLink
                      to="/Login"
                      className=" link-dark text-danger decorate "
                    >
                      {" "}
                      Đăng nhập
                    </NavLink>
                  </h6>
                </Col>
              </Col>
              <Col></Col>
            </Row>
          </div>{" "}
        </Container>
      </motion.div>
    </>
  );
};

export default SignUp;
