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
import {
  RED1_COLOR,
} from "@/constants";
import registerimg from "@/assets/image/register.png";

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

  const validateUsername = (username) => {
    return username.length >= 3;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUsernameValid = validateUsername(formData.username);
    const isPasswordValid = validatePassword(formData.password);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneNumberValid = validatePhoneNumber(formData.phone_number);

    if (
      !isUsernameValid ||
      !isPasswordValid ||
      !isEmailValid ||
      !isPhoneNumberValid
    ) {
      let errorMessage = "";
      if (!isUsernameValid)
        errorMessage += "Tên đăng nhập phải có ít nhất 3 ký tự.\n";
      if (!isPasswordValid)
        errorMessage += "Mật khẩu phải có ít nhất 6 ký tự.\n";
      if (!isEmailValid) errorMessage += "Địa chỉ email không hợp lệ.\n";
      if (!isPhoneNumberValid)
        errorMessage += "Số điện thoại phải gồm chính xác 10 chữ số.\n";

      alert(errorMessage);
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL_CUSTOMER}/register`, formData);
      toast.success("Đăng ký thành công !");
      navigate("/confirm");
    } catch (error) {
      error.response.data.errors.forEach((errorMsg) => toast.error(errorMsg));
      toast.error(error.response.data.message);
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
            <h1 className="text-center fw-bold ">
              <img
                src={registerimg}
                className="mb-2"
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  objectFit: "cover",
                }}
              />{" "}
              ĐĂNG KÝ
            </h1>
          </div>
        </Container>
        <br />
        <Container className="mb-5 pb-md-5">
          <form
            className="col-lg-4 mt-3 col-12 mx-auto px-2 px-lg-0"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className=" ">
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
              <Form.Label className=" ">
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
              <Form.Label className=" ">
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
              <Form.Label className=" ">
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
              <Form.Label className=" ">
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
              <Form.Label className=" ">
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
              <Form.Label className=" ">
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
            <Button
              style={{ background: RED1_COLOR, border: "0px" }}
              className="col-12 py-2 mt-4"
              type="submit"
            >
              <span className=" ">
                Đăng Ký <IoLogInSharp className="fs-4" />
              </span>
            </Button>
          </form>
          <br />
          <div>
            <Row>
              <Col></Col>
              <Col className="col-12">
                <h6 className="text-center text-break   ">
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
                  <h6 className="text-secondary  text-center text-break fw-bold  ">
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
