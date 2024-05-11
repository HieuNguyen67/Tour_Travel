import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IoChevronBackSharp } from "react-icons/io5";
import { motion, useAnimation } from "framer-motion";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { IoLogInSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useAuth } from "../../../context";
import { IoArrowBackOutline } from "react-icons/io5";

const RegisterUser = () => {
  const {role_id}=useParams();
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
  const { isLoggedIn, token } = useAuth();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (role_id==3){ await axios.post(
        `http://localhost:5020/v1/api/admin/register-business`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     toast.success("Đăng ký thành công !");
     navigate("/admin/list-business");
    }else{
        await axios.post(
          `http://localhost:5020/v1/api/admin/register`,
          formData
        );
         toast.success("Đăng ký thành công !");
         navigate("/admin/list-customer");
      }
       
     
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
 

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 98 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Container className=" mx-auto">
          <div className="mt-2">
            {role_id == 3 ? (
              <>
                {" "}
                <Link to="/admin/list-business">
                  <IoArrowBackOutline className="fs-3 mb-3" />
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link to="/admin/list-customer">
                  <IoArrowBackOutline className="fs-3 mb-3" />
                </Link>
              </>
            )}

            <Row>
              <Col></Col>
              <Col className="col-10 ">
                {role_id == 3 ? (
                  <>
                    <h1 className="text-center text-break fw-bold font-family">
                      ĐĂNG KÝ DOANH NGHIỆP
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 className="text-center text-break fw-bold font-family">
                      ĐĂNG KÝ KHÁCH HÀNG
                    </h1>
                  </>
                )}
              </Col>
              <Col></Col>
            </Row>
          </div>
        </Container>
        <br />
        <Container className="mb-5 pb-md-5">
          <form className=" mt-3 col-12 mx-auto" onSubmit={handleSubmit}>
            <Row>
              <Col className="col-lg-6 col-12">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="font-family">
                    {role_id == 3 ? (
                      <>
                        Tên doanh nghiệp: <span className="text-danger">*</span>
                      </>
                    ) : (
                      <>
                        Họ và tên: <span className="text-danger">*</span>
                      </>
                    )}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={
                      role_id == 3 ? "Tên doanh nghiệp" : "Họ và tên"
                    }
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
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
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
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
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
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
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label className="font-family">
                    Ngày sinh <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Ngày sinh"
                    required
                    name="birth_of_date"
                    value={formData.birth_of_date}
                    onChange={handleChange}
                    max="2008-12-31"
                  />
                </Form.Group>
              </Col>
              <Col className="col-lg-6 col-12">
                {" "}
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
              </Col>
              <Col className="col-12">
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
              </Col>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button
                variant="warning"
                className="col-12 col-lg-3 py-3 mt-4"
                type="submit"
              >
                <span className="font-family">
                  Đăng Ký <IoLogInSharp />
                </span>
              </Button>
            </Row>
          </form>
        </Container>
      </motion.div>
    </>
  );
};

export default RegisterUser;
