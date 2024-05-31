import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IoChevronBackSharp } from "react-icons/io5";
import { motion, useAnimation } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogInSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useAuth } from "@/context";
import Header from "@/components/layout/header";
import { IoPersonAdd } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import { BASE_URL } from "@/constants";

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
      await axios.post(`${BASE_URL}/register`, formData);
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
                  <IoPersonAdd className="fs-1 mb-lg-3 mb-1" /> ĐĂNG KÝ
                </h1>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </Container>
        <br />
        <Container className="mb-5 pb-md-5">
          <form
            className="col-md-4 mt-3 col-12 mx-auto px-2 px-lg-0"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className="font-family">
                <ImProfile className="fs-4" /> Họ và tên{" "}
                <span className="text-danger">*</span>
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
            <Form.Group className="mb-4">
              <Form.Label className="font-family">
                <MdAccountBox className="fs-4" /> UserName{" "}
                <span className="text-danger">*</span>
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

            <Form.Group className="mb-4">
              <Form.Label className="font-family">
                <MdOutlinePassword className="fs-4" /> Password{" "}
                <span className="text-danger">*</span>
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
            <Form.Group className="mb-4">
              <Form.Label className="font-family">
                <HiOutlineMail className="fs-4" /> Email{" "}
                <span className="text-danger">*</span>
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
            <Form.Group className="mb-4">
              <Form.Label className="font-family">
                <LiaBirthdayCakeSolid className="fs-4" /> Ngày sinh{" "}
                <span className="text-danger">*</span>
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
            <Form.Group className="mb-4">
              <Form.Label className="font-family">
                <FaPhoneSquareAlt className="fs-4" /> Số điện thoại (Nhập đủ 10
                số)
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
           
            <Form.Group className="mb-4">
              <Form.Label className="font-family">
                <TiLocation className="fs-4" /> Địa chỉ{" "}
                <span className="text-danger">*</span>
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
                Đăng Ký <IoLogInSharp className="fs-4" />
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
